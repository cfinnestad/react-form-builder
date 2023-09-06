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
    isInFilter, isNotFilter, GetItem, isAutocomplete, isNumber, isBoolean, HiddenItem, isText, isEmail, isPhone, isDate
} from "../Items";
import {Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from "@mui/material";
import {cloneDeep, isArray, isString} from "lodash";
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
    return isString(item.value) ? item.value : undefined
}

const FilterEdit = ({fieldItems,filter,setFilter,index}:FilterEditProps) => {
    if (fieldItems.length === 0) return <></>

    const defaultFilter = {
        comparison: '=',
        fieldId: fieldItems[0].id,
        value: getDefaultValue(fieldItems[0])
    } as EqFilter

    const changeRelatedField = (event: SelectChangeEvent<string>) => {

        const { value } = event.target;
        let curFilter = undefined
        if (filter !== undefined && isFieldFilter(filter)) {
            curFilter = cloneDeep(filter)
            curFilter.fieldId = value
            const item = GetItem(value, fieldItems)
            curFilter.value = item === undefined ? undefined : getDefaultValue(item)
            setFilter(curFilter,index)
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
            const curFilter = {...filter} as FieldFilter
            if ((isArray(value) && value.length === 0) || value === '') {
                delete curFilter.value
            } else {
                curFilter.value = value
            }
            setFilter(curFilter, index)
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
                        field = <FilterMultipleInputs values={typeof filter.value === 'string' ? [filter.value] : (filter.value ?? [])} setValues={setValue} type='text'/>
                    } else {
                        field = <FilterInput value={filter.value as string|undefined} setValue={setValue} type='text'/>
                    }
                } else if(isNumber(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='number'/>
                    } else {
                        field = <FilterInput value={filter.value as number|undefined} setValue={setValue} type='number'/>
                    }
                } else if(isPhone(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='phone'/>
                    } else {
                        field = <FilterInput value={filter.value as string|undefined} setValue={setValue} type='phone'/>
                    }
                } else if(isEmail(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='email'/>
                    } else {
                        field = <FilterInput value={filter.value as string|undefined} setValue={setValue} type='email'/>
                    }
                } else if(isDate(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='date'/>
                    } else {
                        field = <FilterInput value={filter.value as string|undefined} setValue={setValue} type='date'/>
                    }
                } else if(isBoolean(item)) {
                    if (multiples) {
                        field = <FilterMultipleInputs values={filter.value ?? []} setValues={setValue} type='checkbox'/>
                    } else {
                        field = <FilterInput value={filter.value as boolean|undefined} setValue={setValue} type='checkbox'/>
                    }
                } else if(isOption(item)) {
                    const val = multiples
                        ? (typeof filter.value === 'string' ? [filter.value] : (filter.value === undefined ? [] : filter.value as string[]))
                        : filter.value as string
                    field = <>
                        <Select
                            id={item.id}
                            size='small'
                            multiple={multiples}
                            value={val}
                            autoWidth
                            onChange={changeOption}
                            renderValue={multiples ? (selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(typeof selected === 'string' ? [selected] : selected).map((value) => (
                                        <Chip key={value} label={item.options.find(option => value === (option.value ?? option.label))?.label} />
                                    ))}
                                </Box>
                            ) : undefined}
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
                <FormControl>
                    <InputLabel id="related-field-label">Related Field</InputLabel>
                    <Select
                        value={filter.fieldId}
                        labelId='related-field-label'
                        label='Related Field'
                        onChange={changeRelatedField}
                        size='small'>
                        {fieldItems.map(item => <MenuItem value={item.id}>{item.id.split('_').join(' ')}</MenuItem>)}
                    </Select>
                </FormControl>
                {field}
            </>
        }
    }

    return <>
        <Box sx={{ border: '1px solid grey', padding: '10px', borderRadius: '5px' }}>
            <Stack spacing={2}>
                <FormControl>
                    <InputLabel id="comparison-label">Comparison</InputLabel>
                    <Select
                        value={filter?.comparison || ''}
                        labelId='comparison-label'
                        label='Comparison'
                        size='small'
                        onChange={changeComparison}
                    >
                        <MenuItem value=''>Remove Filter</MenuItem>
                        { ['=','>','>=','<','<=','in','and','or','not'].map(option => <MenuItem value={option}>{option}</MenuItem>)}
                    </Select>
                </FormControl>
                {fields}
            </Stack>
        </Box>
    </>
}

export default FilterEdit