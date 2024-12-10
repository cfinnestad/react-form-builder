import React, {ChangeEvent, useState} from "react";
import {
    AnyItem, BaseItem,
    FieldItem,
    HiddenItem,
    isField,
    isGroup,
    isHidden, isList,
    isNamed,
    ItemProps,
    NamedItem, NumberSubtype
} from "./Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
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

const EditFC = (itemProps: ItemProps) => {
    const [itemId, setItemId] = useState(itemProps.item.id);

    const setFilter = (...[filter]: Parameters<FilterEditProps["setFilter"]>) => {
        itemProps.options.SetItem({ ...itemProps.item, filter: filter } )
    }

    const onChangeNamedItem = (value: string) => {
        const index = itemId.lastIndexOf('-');
        const prefix = itemId.substring(0, index+1);
    }

    const onChangeList = (event: ChangeEvent<HTMLInputElement>) => {
        const itm = { ...itemProps.item }
        const { target: { checked } } = event;
        itm.isList = checked

        if(!itm.isList) {
            itm.isList = undefined
            delete itm.isList
        }

        itemProps.options.SetItem(itm)
    }

    const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (isNaN(val)) {
            itemProps.errorHandler.setError('maxListSize', 'Max Value must be an integer!')
        }
        else if (val <= 0) {
            itemProps.errorHandler.setError('maxListSize', 'Max Value must be greater than zero!')
        }
        else if (itemProps.item.minListSize && (val < itemProps.item.minListSize)) {
            itemProps.errorHandler.setError('maxListSize', 'Max Value must not be less than Min Value!')
        }
        else {
            itemProps.errorHandler.setError('maxListSize')

            const itm = { ...itemProps.item, maxListSize: val } as NumberSubtype;

            itemProps.options.SetItem(itm);
        }
    };

    const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (isNaN(val)) {
            itemProps.errorHandler.setError('minListSize', 'Min Value must be an integer!')
        } else if (val < 0) {
            itemProps.errorHandler.setError('minListSize', 'Min Value must be positive!')
        } else if (itemProps.item.maxListSize && (val > itemProps.item.maxListSize)) {
            itemProps.errorHandler.setError('minListSize', 'Min Value must not be greater than Max Value!')
        } else {
            itemProps.errorHandler.setError('minListSize')

            // Make sure the Value field still complies with the new Min Value setting
            if (itemProps.item.minListSize && parseFloat(itemProps.item.minListSize.toString()) < val) {
                itemProps.errorHandler.setError('value', 'Value cannot be less than the Min Value setting!')
            } else {
                itemProps.errorHandler.setError('value')
            }

            const itm = { ...itemProps.item, min: val } as NumberSubtype;

            itemProps.options.SetItem(itm);
        }
    };

    const onMinList = (min: number) => {
        itemProps.options.SetItem({...itemProps.item, minListSize:min})
    }

    const onMaxList = (max: number) => {
        itemProps.options.SetItem({...itemProps.item, maxListSize:max})
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
                    item: itemProps.item,
                    items: itemProps.items,
                    options: itemProps.options,
                    errorHandler: itemProps.errorHandler,
                }}
                onChange={onChangeNamedItem}
            />
            { isList(itemProps.item) ? <>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  checked={itemProps.item.isList ?? false} onChange={onChangeList}/> } label="Backend Only"/>
                    <FormHelperText sx = {{marginTop: -1}}>
                        Will return a variable sized array of this item type as data.
                    </FormHelperText>
                </FormGroup>
                { itemProps.item.isList ? <>
                    <FormGroup>
                        <TextField
                            error={itemProps.errorHandler.hasError('minListSize')}
                            id={`${itemProps.item.id}-min-list-size`}
                            inputProps={{ min: 1, shrink: true }}
                            label="Min List Size"
                            onChange={handleMinValueChange}
                            size="small"
                            type="number"
                            defaultValue={itemProps.item.minListSize}
                        />
                        <ShowErrors errors={itemProps.errorHandler.getError('minListSize')} />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            error={itemProps.errorHandler.hasError('maxListSize')}
                            id={`${itemProps.item.id}-max-list-size`}
                            inputProps={{ min: 1, shrink: true }}
                            label="Max List Size"
                            onChange={handleMaxValueChange}
                            size="small"
                            type="number"
                            defaultValue={itemProps.item.maxListSize}
                        />
                        <ShowErrors errors={itemProps.errorHandler.getError('maxListSize')} />
                    </FormGroup>
                </> : undefined}
            </> : undefined}
            {
                //@ts-ignore
                itemProps.options.AllowedItems[itemProps.item.type].EditFC(itemProps)
            }
        </Stack>
    </>
}

export default EditFC