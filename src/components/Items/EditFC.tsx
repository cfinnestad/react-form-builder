import React, {ChangeEvent, useState} from "react";
import {AnyItem, FieldItem, HiddenItem, isGroup, ItemProps, NamedItem} from "./Items";
import {FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
import {ShowErrors} from "./Subtypes";
import FilterEdit, {FilterEditProps} from "../Filter/FilterEdit";

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

// return all items containing the given prop, which optionally has a specific value
export const getItemsHavingProp = (items: AnyItem[], prop: string, val: string | null = null): AnyItem[] => {
    // @ts-ignore
    return items.filter(itm  => itm.hasOwnProperty(prop) && (val === undefined || itm[prop].trim() === val.trim()))
}

export const validateNameChange = (props: ItemProps, newName?: string): validateNameChangeResponse => {
    const {item, items} = props

    if (newName === undefined || newName.trim() === '') {
        return { errors: ['Name is required']}
    }
    if (!isNamedItem(item)) {
        return { errors: ['Error validating non-named item'] }
    }

    let name = newName.trim().replace(/\s+/g, '_')

    if (name.match(/[^A-Za-z0-9_]/g)) {
        return { errors: ['Name can only include letters, numbers, and underscores'] }
    }
    if (getItemsHavingProp(items, "name", name).length > 0) {
        return { errors: ['Name already exists'] }
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


const EditFC = (ItemProps: ItemProps) => {
    const data = ItemProps.options.AllowedItems[ItemProps.item.type].EditFC(ItemProps)

    const setFilter = (...[filter]: Parameters<FilterEditProps["setFilter"]>) => {
        console.log('SetFilter...', filter)
        ItemProps.options.SetItem({ ...ItemProps.item, filter: filter } )
    }

    return <>
        <Stack spacing={2} sx={{ marginTop: 1}}>
            <TextField
                size="small"
                label="ID"
                type="text"
                disabled={true}
                value={ItemProps.item.id}
            />
            <NamedItemEdit {...ItemProps} />
            <FilterEdit
                fieldItems={ItemProps.items.filter(item => item.type === 'Field' || item.type === 'Hidden') as (FieldItem|HiddenItem)[]}
                filter={ItemProps.item.filter}
                setFilter={setFilter}
            ></FilterEdit>
            { data }
        </Stack>
    </>
}

export default EditFC