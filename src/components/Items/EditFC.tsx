import React, {ChangeEvent, useState} from "react";
import {AnyItem, FieldItem, HiddenItem, isField, isGroup, isHidden, isNamed, ItemProps} from "./Items";
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

const GetFilterItems = (items: AnyItem[], activeItem: AnyItem|undefined = undefined) => {
    const filterItems = [] as (FieldItem|HiddenItem)[]
    items.map(item => {
        if(item.id === activeItem.id) return
        if(isField(item) || isHidden(item)) {
            filterItems.push(item)
        } else if (isGroup(item)) {
            GetFilterItems(item.items, activeItem).map(item => filterItems.push(item))
        }
    })
    return filterItems
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
                value={item.name}
                onChange={onNameChange}
            />
            { validNameHint !== undefined ? <FormHelperText>{validNameHint}</FormHelperText> : <></> }
            <ShowErrors errors={errorHandler.getError('name')} />
        </FormGroup>
    </>
}

const EditFC = (ItemProps: ItemProps) => {
    const setFilter = (...[filter]: Parameters<FilterEditProps["setFilter"]>) => {
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
            <NamedItemEdit
                item={ItemProps.item}
                items={ItemProps.items}
                options={ItemProps.options}
                errorHandler={ItemProps.errorHandler}
            />
            <FilterEdit
                fieldItems={GetFilterItems(ItemProps.items,ItemProps.item)}
                filter={ItemProps.item.filter}
                setFilter={setFilter}
            ></FilterEdit>
            {ItemProps.options.AllowedItems[ItemProps.item.type].EditFC(ItemProps)}
        </Stack>
    </>
}

export default EditFC