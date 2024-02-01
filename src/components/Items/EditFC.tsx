import React, {ChangeEvent, useState} from "react";
import {
    AnyItem, BaseItem,
    FieldItem,
    HiddenItem,
    isField,
    isGroup,
    isHidden,
    isNamed,
    ItemProps,
    NamedItem
} from "./Items";
import {FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
import {ShowErrors} from "./Subtypes";
import FilterEdit, {FilterEditProps} from "../Filter/FilterEdit";

export type validateNameChangeResponse = {
    validName: string
    changeErrors: string[]
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
        if(item.id === activeItem?.id) return
        if(isField(item) || isHidden(item)) {
            filterItems.push(item)
        } else if (isGroup(item)) {
            GetFilterItems(item.items, activeItem).map(item => filterItems.push(item))
        }
    })
    return filterItems
}

export const validateNameChange = (item: AnyItem, items: AnyItem[], newName?: string): validateNameChangeResponse => {
    const errors = []
    let name = (newName ?? '').replace(/[\s_]+/g, '_')
    if (name === '') {
        errors.push('Name is required.')
    } else if (!isNamed(item)) {
        errors.push('Error validating non-named item.')
    } else if (name.match(/[^A-Za-z0-9_]/g)) {
        errors.push('Name can only include letters, numbers, and underscores.')
    } else {
        const existing = getItemsHavingProp(items, "name", name)
        if (existing.length > 0 && (existing.length > 1 || existing[0].id !== item.id)) {
            errors.push('Name already exists.')
        }
    }

    return { validName: name, changeErrors: errors }
}

interface NamedItemEditProps {
    itemProps: ItemProps;
    onChange: (value: string) => void;
}

const NamedItemEdit = ({itemProps, onChange}: NamedItemEditProps) => {
    const {item, items, options, errorHandler} = itemProps;

    if (!isNamed(item)) {
        return <></>
    }
    const [name, setName] = useState(item.name)

    const [validNameHint, setValidNameHint] = useState<string>()

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNamed(item)) return

        const {validName, changeErrors} = validateNameChange(item, items, event.target.value)

        if (changeErrors && changeErrors.length > 0) {
             errorHandler.setError("name", changeErrors[0])
        } else {
            setValidNameHint(undefined)
            options.SetItem({...item, name: validName || undefined} as NamedItem)
            errorHandler.setError("name")
        }
        setName(validName);
        onChange(validName);
    }

    return <>
        <FormGroup>
            <TextField
                size="small"
                label="Name"
                type="text"
                error={errorHandler.hasError('name')}
                value={name}
                onChange={onNameChange}
            />
            { validNameHint !== undefined ? <FormHelperText>{validNameHint}</FormHelperText> : <></> }
            <ShowErrors errors={errorHandler.getError('name')} />
        </FormGroup>
    </>
}

const ClassNameEdit = ({itemProps}: NamedItemEditProps) => {
    const {item, items, options, errorHandler} = itemProps;
    const [className, setClassName] = useState(item.ClassName)

    const onClassNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        options.SetItem({...item, ClassName:  event.target.value || undefined} as BaseItem)
        setClassName(event.target.value);
    }

    return <>
        <FormGroup>
            <TextField
                size="small"
                label="Classes To Apply"
                type="text"
                value={className}
            />
        </FormGroup>
    </>
}

const EditFC = (ItemProps: ItemProps) => {
    const [itemId, setItemId] = useState(ItemProps.item.id);

    const setFilter = (...[filter]: Parameters<FilterEditProps["setFilter"]>) => {
        ItemProps.options.SetItem({ ...ItemProps.item, filter: filter } )
    }

    const onChangeNamedItem = (value: string) => {
        const index = itemId.lastIndexOf('-');
        const prefix = itemId.substring(0, index+1);
    }

    const onChangeClassNameItem = (value: string) => {
        ItemProps.options.SetItem({ ...ItemProps.item, ClassName: value } )
    }

    return <>
        <Stack spacing={2} sx={{ marginTop: 1}}>
            <TextField
                size="small"
                label="ID"
                type="text"
                disabled={true}
                value={itemId}
            />
            <NamedItemEdit
                itemProps={{
                    item: ItemProps.item,
                    items: ItemProps.items,
                    options: ItemProps.options,
                    errorHandler: ItemProps.errorHandler,
                }}
                onChange={onChangeNamedItem}
            />
            <FilterEdit
                fieldItems={GetFilterItems(ItemProps.items,ItemProps.item)}
                filter={ItemProps.item.filter}
                setFilter={setFilter}
            ></FilterEdit>
            {
                //@ts-ignore
                ItemProps.options.AllowedItems[ItemProps.item.type].EditFC(ItemProps)
            }
            <ClassNameEdit
                itemProps={{
                    item: ItemProps.item,
                    items: ItemProps.items,
                    options: ItemProps.options,
                    errorHandler: ItemProps.errorHandler,
                }}
                onChange={onChangeClassNameItem}
            />
        </Stack>
    </>
}

export default EditFC