import React, {ChangeEvent, useState} from "react";
import {AnyItem, FieldItem, HiddenItem, isGroup, isNamed, ItemProps} from "./Items";
import {FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
import {ShowErrors} from "./Subtypes";
import FilterEdit, {FilterEditProps} from "../Filter/FilterEdit";

export type validateNameChangeResponse = {
    validName?: string
    changeErrors?: string[]
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
    return items.filter(itm => itm.hasOwnProperty(prop) && (val === null || itm[prop].trim() === val.trim()))
}

export const validateNameChange = (item: AnyItem, items: AnyItem[], newName?: string): validateNameChangeResponse => {
    if (newName === undefined || newName.trim() === '') {
        return { changeErrors: ['Name is required.']}
    }
    if (!isNamed(item)) {
        return { changeErrors: ['Error validating non-named item.'] }
    }

    let name = newName.trim().replace(/\s+/g, '_')

    if (name.match(/[^A-Za-z0-9_]/g)) {
        return { changeErrors: ['Name can only include letters, numbers, and underscores.'] }
    }
    const existing = getItemsHavingProp(items, "name", name)
    if (existing.length > 0 && (existing.length > 1 || existing[0].id !== item.id)) {
        return { changeErrors: ['Name already exists.'] }
    }

    return { validName: name }
}

const NamedItemEdit = ({item, items, options, errorHandler}: ItemProps) => {
    if (!isNamed(item)) {
        return <></>
    }

    const [validNameHint, setValidNameHint] = useState<string>()

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNamed(item)) return

        const { target: { value } } = event;
        const {validName, changeErrors} = validateNameChange(item, items, value)

        if (changeErrors && changeErrors.length > 0) {
             errorHandler.setError("name", changeErrors[0])

        } else if (validName !== undefined) {
            if (validName !== value) {
                setValidNameHint(validName)
            } else {
                setValidNameHint(undefined)
            }

            const itm = { ...item }
            itm.name = validName

            options.SetItem(itm)
            errorHandler.setError("name")
        }
    }

    return <>
        <FormGroup>
            <TextField
                size="small"
                label="Name"
                type="text"
                error={errorHandler.hasError('name')}
                defaultValue={item.name}
                onChange={onNameChange}
            />
            { validNameHint !== undefined ? <FormHelperText>{validNameHint}</FormHelperText> : <></> }
            <ShowErrors errors={errorHandler.getError('name')} />
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
                fieldItems={ItemProps.items.filter(item => (item.type === 'Field' || item.type === 'Hidden') && item.id !== ItemProps.item.id) as (FieldItem|HiddenItem)[]}
                filter={ItemProps.item.filter}
                setFilter={setFilter}
            ></FilterEdit>
            { data }
        </Stack>
    </>
}

export default EditFC