import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {AnyItem, isGroup, ItemProps, NamedItem} from "./Items";
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
    let ret = [] as AnyItem[]
    for (let itm: AnyItem in items) {
        if (items[itm][prop] !== undefined) {
            if (val === null || items[itm][prop].trim() === val.trim())
                ret.push(items[itm])
        }
    }
    return ret
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

    if (name.match(/[^A-Za-z0-9\_]/g)) {
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

    // TODO move this?
    const setFilter = (...[filter, index]: Parameters<FilterEditProps["setFilter"]>) => {
        console.log('SetFilter...', filter)
        options.SetItem({ ...item, filter: filter } )
    }

    const constructIdFromName = (items: AnyItem[], name: string): string => {
        let validId = name
        const existingIds = getItemsHavingProp(items, "id", validId)
        if (existingIds.length === 0) return validId
        else return validId + (existingIds.length + 1) // simplest possible collision handling
    }

    // replace filter fieldId in each inner item where it exists, then commit the whole object at once
    const updateFilterIdsOnNameChange = (oldId: string, newId: string) => {
        let settableItems = items
        let madeChanges = false

        for (let i: AnyItem in settableItems) {
            if (settableItems[i].filter
                && settableItems[i].filter["fieldId"]
                && settableItems[i].filter["fieldId"].trim() === oldId.trim()) {

                settableItems[i].filter["fieldId"] = newId.trim()
                madeChanges = true
            }
        }

        if (madeChanges) options.setItems(settableItems)
    }

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

    // after the name prop changes, use this hook to update the id props
    const nameUpdated = useRef(false)
    useEffect(() => {
        if (!nameUpdated.current) {
            nameUpdated.current = true
            return
        }

        if (item.name && item.id && item.name !== item.id) {
            const itm = {...item}

            let validId = constructIdFromName(items, itm.name)
            itm.prevId = itm.id
            itm.id = validId

            options.SetItem(itm)
        }
    }, [item.name])

    // after the id changes above, update any filters pointed to the old id
    const idUpdated = useRef(false)
    useEffect(() => {
        if (idUpdated.current) {
            idUpdated.current = true
            return
        }

        if (item.id && item.prevId && item.id != item.prevId) {
            updateFilterIdsOnNameChange(item.prevId, item.id)
        }
    }, [item.prevId])

    return <>
        <TextField
            size="small"
            label="ID"
            type="text"
            disabled={true}
            value={item.id}
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

        // TODO move this?
        <FilterEdit
            fieldItems={items.filter(item => item.type === 'Field' || item.type === 'Hidden') as (FieldItem|HiddenItem)[]}
            filter={item.filter}
            setFilter={setFilter}
        ></FilterEdit>

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