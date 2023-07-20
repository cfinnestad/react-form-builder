import React, {ChangeEvent, useState} from "react";
import {AnyItem, isGroup, ItemProps, NamedItem} from "./Items";
import {FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
import {ShowErrors} from "./Subtypes";


export type validateNameChangeResponse = {
    validName?: string
    errors?: string[]
}

// Find 'item' in 'items' and return the items array from the group it belongs to.
// Non-grouped items should return top-level 'items' array.
export const getSiblingItems = (item: AnyItem, items: AnyItem[]): AnyItem[] => {
    for(const i of items) {
        if (item.id === i.id) {
            return items
        } else if(isGroup(i)) {
            const result = getSiblingItems(item, i.items)
            if (result !== undefined) return result
        }
    }
    return []
}

export const validateNameChange = (props: ItemProps, newName?: string): validateNameChangeResponse => {
    const {item, items} = props

    if (newName === undefined || newName.trim() === '') {
        return { errors: ['Name is required']}
    }
    if (!isNamedItem(item)) {
        return { errors: ['Error validating non-named item'] }
    }

    const otherNames = getSiblingItems(item, items)
        .filter(itm => {
            if (!isNamedItem(itm)) return false
            return itm.id !== item.id;

        })
        .flatMap(itm => { if (isNamedItem(itm)) return itm.name })

    let name = newName.trim().replace(/\s+/g, '_')

    if (name.includes('-')) {
        return { errors: ['Name cannot include "-" character'] }
    }
    if (otherNames.includes(name)) {
        return { errors: ['Name already exists']}
    }

    return { validName: name }
}

function isNamedItem(item: AnyItem): item is NamedItem {
    return 'name' in item && item.name !== undefined
}

const NamedItemEdit = ({item, items, options}: ItemProps) => {
    if(!isNamedItem(item)) {
        return <></>
    }

    const [nameError, setNameError] = useState(false)
    const [nameErrors, setNameErrors] = useState([] as string[])
    const [validNameHint, setValidNameHint] = useState<string>()

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNamedItem(item)) return

        const { target: { value } } = event;
        const {validName, errors} = validateNameChange({item: item, items: items, options: options}, value)

        if (errors !== undefined) {
            setNameError(true)
            setNameErrors(errors)
            return
        }

        if (validName !== undefined) {
            if (validName !== value) {
                setValidNameHint(validName)
            } else {
                setValidNameHint(undefined)
            }

            const itm = { ...item }
            itm.name = validName

            setNameError(false)
            setNameErrors([])

            options.SetItem(itm)
        }
    }

    return <>
        <TextField
            size="small"
            label="ID"
            type="text"
            disabled={true}
            defaultValue={item.id}
        />
        <FormGroup>
            <TextField
                size="small"
                label="Name"
                type="text"
                error={nameError}
                defaultValue={item.name}
                onChange={onNameChange}
            />
            { validNameHint !== undefined ? <FormHelperText>{validNameHint}</FormHelperText> : <></> }
            <ShowErrors errors={nameErrors}/>
        </FormGroup>
    </>
}

const BaseItemEdit = (ItemProps: ItemProps) => {
    if(isNamedItem(ItemProps.item)) {
        return <></>
    }

    return <>
        <TextField
            size="small"
            label="ID"
            type="text"
            disabled={true}
            defaultValue={ItemProps.item.id}
        />
    </>
}


const EditFC = (ItemProps: ItemProps) => {
    const data = ItemProps.options.AllowedItems[ItemProps.item.type].EditFC(ItemProps)

    return <>
        <Stack spacing={2} sx={{ marginTop: 1}}>
            { isNamedItem(ItemProps.item) ? <NamedItemEdit {...ItemProps} /> : <BaseItemEdit {...ItemProps} />  }
            { data }
        </Stack>
    </>
}

export default EditFC