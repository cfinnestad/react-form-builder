import React from 'react'
import {
    EqFilter,
    FieldItem,
    FilterType,
    isOption,
    ComparisonFilter,
    NotFilter,
    FieldFilter,
    isComparisonFilter,
    isFieldFilter,
    isInFilter, isNotFilter, GetItem, isAutocomplete, isNumber, isBoolean, HiddenItem, isText, isEmail
} from "../Items";
import {Box, Button, Chip, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {cloneDeep, isArray, isString} from "lodash";
import {getStyles, SelectValidate} from "../Items/Subtypes/Select";
import FilterMultipleInputs from "./FilterMultipleInputs";
import FilterInput from "./FilterInput";

export type FilterEditProps = {
    fieldItems: (FieldItem|HiddenItem)[]
    filter: FilterType|undefined
    setFilter: (newFilter:FilterType|undefined, index:number|undefined) => void
    index?: number
}

const getDefaultValue = (item:FieldItem|HiddenItem): string|number|boolean|string[]|undefined => {
    if (isOption(item)) {
        if (item.options.length === 0) {
            return undefined
        } else {
            return item.options[0].value || item.options[0].label
        }
    } else if (isNumber(item)) {
        return item.min ?? Math.min(0,item.max ?? 0)
    } else if (isBoolean(item)) {
        return true
    }
    return isString(item.value) ? item.value : 'undefined'
}

const FilterEdit = ({fieldItems,filter,setFilter,index}:FilterEditProps) => {

    const defaultFilter = {
        comparison: '=',
        fieldId: fieldItems[0].id,
        value: getDefaultValue(fieldItems[0])
    } as EqFilter

    const changeRelatedField = (event: SelectChangeEvent<string>) => {

        const { value } = event.target;
        let cureFilter = undefined
        if (filter !== undefined && isFieldFilter(filter)) {
            cureFilter = cloneDeep(filter)
            cureFilter.fieldId = value
            const item = GetItem(value, fieldItems)
            cureFilter.value = item === undefined ? undefined : getDefaultValue(item)
        }
    }

    const changeComparison = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        let curFilter = undefined
        if (filter === undefined) {
            switch (value) {
                case '':
                    return
                case 'and':
                case 'or':
                    curFilter = {
                        comparison: value,
                        filters: [{...defaultFilter}, {...defaultFilter}]
                    } as ComparisonFilter
                    break
                case 'not':
                    curFilter = {
                        comparison: value,
                        filter: {...defaultFilter}
                    } as NotFilter
                    break
                case 'in':
                    curFilter = {
                        comparison: 'in',
                        fieldId: fieldItems[0].id,
                        value: [getDefaultValue(fieldItems[0])]
                    } as FieldFilter
                    break
                default:
                    curFilter = {
                        comparison: value,
                        fieldId: fieldItems[0].id,
                        value: getDefaultValue(fieldItems[0])
                    } as FieldFilter
            }

        } else if (value !== '') {
            if (value === filter.comparison) {
                curFilter = undefined
            } else if (isComparisonFilter(filter) && ['and','or'].includes(value)) {
                curFilter = {...filter, comparison: value} as ComparisonFilter
            } else if (isFieldFilter(filter) && ['=','>','>=','<','<=','in'].includes(value)) {
                curFilter = {...filter, comparison: value} as FieldFilter
                if (value === 'in') {
                    if (isArray(filter.value)) {
                        curFilter.value = filter?.value[0]
                    }
                } else if(filter.value==='in') {
                    curFilter.value = [filter.value]
                }
            }
        }
        setFilter(curFilter as FilterType,index)
    };

    const setLocalFilter = (newFilter:FilterType|undefined, idx:number|undefined) => {

        if (filter !== undefined) {
            let curFilter: FilterType|undefined = cloneDeep(filter)
            if (isNotFilter(curFilter)) {
                if (newFilter === undefined) {
                   curFilter = undefined
                } else {
                   curFilter.filter = newFilter
                }
            } else if (idx !== undefined && isComparisonFilter(curFilter)) {
                if (newFilter === undefined) {
                   curFilter.filters.splice(idx, 1)
                } else {
                   curFilter.filters[idx] = newFilter
                }
            }
            setFilter(curFilter, index)
        }
    }

    const addFilter = ()=> {
        if (filter !== undefined && isComparisonFilter(filter)) {
            const fltr = cloneDeep(filter as ComparisonFilter)
            fltr.filters.push({...defaultFilter})
            setFilter(fltr, index)
        }
    }

    const setValue = (value: string|number|boolean|undefined|(string|number|boolean|undefined)[]) => {
        if(filter !== undefined && isFieldFilter(filter)) {
            setFilter({...filter, value: value} as FieldFilter, index)
        }
    }

    const changeOption = (event: SelectChangeEvent<string | string[]>) => {
        const { target: { value } } = event;

        if (filter !== undefined && isFieldFilter(filter)) {
            const curFilter = {...filter}
            if ((isArray(value) && value.length === 0) || value === '') {
                delete curFilter.value
            } else {
                curFilter.value = value
            }
        }

    };

    let fields = <></>
    if (filter !== undefined) {
        if (isComparisonFilter(filter)) {
            fields = <>
                <Button onClick={addFilter}>Add Filter</Button>
                {filter.filters.map((f,i) => <FilterEdit fieldItems={fieldItems} filter={f} setFilter={setLocalFilter} index={i}/>)}
            </>
        } else if(isNotFilter(filter)) {
            fields = <FilterEdit fieldItems={fieldItems} filter={filter.filter} setFilter={setLocalFilter}/>
        } else if(isFieldFilter(filter)) {
            let field = <></>
            const item = GetItem(filter.fieldId, fieldItems)
            const multiples = isInFilter(filter)
            if (item !== undefined) {
                //TODO make sure all types are handled
                if(isAutocomplete(item) || isText(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='text' label={item.name}/>
                    } else {
                        field = <FilterInput value={filter.value as string|undefined} setValue={setValue} type='text' label={item.name}/>
                    }
                } else if(isNumber(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='number' label={item.name}/>
                    } else {
                        field = <FilterInput value={filter.value as number|undefined} setValue={setValue} type='number' label={item.name}/>
                    }
                } else if(isEmail(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='email' label={item.name}/>
                    } else {
                        field = <FilterInput value={filter.value as string|undefined} setValue={setValue} type='email' label={item.name}/>
                    }
                } else if(isBoolean(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='checkbox' label={item.name}/>
                    } else {
                        field = <FilterInput value={filter.value as boolean|undefined} setValue={setValue} type='checkbox' label={item.name}/>
                    }
                } else if(isOption(item)) {
                    field = <>
                        <Select
                            id={item.id}
                            multiple={multiples}
                            value={filter.value ?? multiples ? [] : ''}
                            autoWidth
                            onChange={changeOption}
                            renderValue={multiples ? undefined : (selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {
                                item.options.map(option =>
                                    <MenuItem
                                        key={option.label}
                                        value={option.value ?? option.label}
                                        selected={item.value?.includes(option.value ?? option.label)}
                                        // style={multiples?undefined:getStyles(option.label, item.options.filter(option => option.selected).map(option => option.label), theme)}
                                    >
                                        {option.label}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </>
                }
            }
            fields = <>
                <Select value={filter.fieldId} label='Related Field' onChange={changeRelatedField}>
                    {fieldItems.map(item => <MenuItem value={item.id}>{item.id.split('_').join(' ')}</MenuItem>)}
                </Select>
                {field}
            </>
        }
    }

    return <>
        <Stack spacing={.5}>
            <Select
                value={filter?.comparison || ''}
                label='Comparison'
                onChange={changeComparison}
            >
                <MenuItem value=''>Remove Filter</MenuItem>
                { ['=','>','>=','<','<=','in','and','or','not'].map(option => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
            {fields}
        </Stack>
    </>
}

export default FilterEdit