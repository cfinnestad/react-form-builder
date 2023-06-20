import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import {Autocomplete, FormHelperText, InputLabel, Stack, TextField} from "@mui/material";
import {FieldProps, Option, isAutocomplete, AutocompleteSubtype} from "../../Items";
import AutocompleteValidate from "./AutocompleteValidate";


export type FilterOptionsFunc = (input?: string) => (Promise<Option[]> | Option[])

const AutocompleteST = ({item, options}: FieldProps) => {

    if (!isAutocomplete(item) ) {
        return <></>
    }
    const element = document.getElementById(item.id)
    if (element === undefined) {
        console.log('Could not find element by ID')
    }
    const [searchTerm, setSearchTerm] = useState<string|undefined>(item.value)
    const [choices, setChoices] = useState<Option[]>(item.value ? [{label: item.value, selected:true}] : [])

    const filterOptions = useRef<FilterOptionsFunc>((input?: string) => []) //

    // Initialize filterOptions to use passed-in searchableOptions function. Otherwise, fall back to static Option list from schema.
    useEffect(() => {
        if (item.searchableOptionsName != null) {
            const getChoicesUnsafe = options.searchableOptions?.[item.searchableOptionsName]
            if ( getChoicesUnsafe !== undefined && typeof getChoicesUnsafe === 'function') {
                filterOptions.current = getChoicesUnsafe
            } else {
                console.warn(`choices callback for ${item.id} not found. configured to use callback titled ${item.options}`)
                filterOptions.current = (input) => [] as Option[]
            }
        } else {
            filterOptions.current = (input) => {
                return (item.options ?? []).filter(option =>
                    input !== undefined
                        ? option.value?.toLowerCase().includes(input) || option.label.toLowerCase().includes(input)
                        : false
                )
            }
        }
    }, [])

    // Debounce call to getChoices
    useEffect( () => {
        const getData = setTimeout(async () => {
            const choices = await filterOptions.current(searchTerm?.toLowerCase() ?? '')
            setChoices(choices.sort((a, b) => a.label.localeCompare(b.label)))
            const itm = {...item}
            itm.options = choices.sort((a, b) => a.label.localeCompare(b.label))
            options.SetItem(itm)
        }, 500)

        return () => clearTimeout(getData)
    }, [searchTerm])

    const onInputChange = (event: SyntheticEvent<Element, Event>, value: string) => {
        const itm = {...item} as AutocompleteSubtype

        console.log('#value', value)
        itm.value = value || undefined
        if (itm.searchableOptionsName && itm.allowAnyInput && ((itm.options ?? [])[0]?.label ?? '') !== value) {
            if (value === undefined) {
                itm.options=[]
            } else {
                itm.options = [{label: value} as Option]
            }
            AutocompleteValidate(itm, options)
        }
        setSearchTerm(value || undefined)

        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    const onAutocompleteChange = (event: React.SyntheticEvent, value: any)=> {
        const itm = {...item} as AutocompleteSubtype

        // try using value.value, but fallback to value. If freeSolo + autoSelect are enabled, and user leaves free text in input.
        // itm.value = item.allowAnyInput ? (value as Option)?.value ?? value as string : (value as Option)?.value
        console.log('value', value)
        console.log('event', event)
        const val = value ? {selected: true, ...value} as Option : undefined
        if(itm.searchableOptionsName) {
            itm.options = val ? [val] : []
        }
        itm.value = val?.label ?? undefined
        // setSearchTerm(val?.label)
        // AutocompleteValidate(itm, options)
        if (!options.IsBuild) {
            console.log('Setting Item', itm)
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={.5}>
            <InputLabel
                required = {item.required ?? false}
                error={item.errorText != null}
            >
                {item.label}
            </InputLabel>
            <Autocomplete
                id={item.id}
                freeSolo={item.allowAnyInput ?? false}
                autoSelect={!(item.allowAnyInput ?? false)}
                onChange={onAutocompleteChange}
                onInputChange={onInputChange}
                defaultValue={item.value}
                options={choices}
                isOptionEqualToValue={(option: Option, value: any) => {
                    console.log('!option', option)
                    console.log('!value', value)
                    return option.label === value
                }}
                // filterOptions={ (options, state) => options }
                disablePortal={true}
                componentsProps={{
                    paper: {
                        sx: {
                            boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                        }
                    }
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        type="text"
                        name={item.name}
                        required={item.required}
                        error={item.errorText !== undefined}
                    />
                }
            />
            <FormHelperText error={item.errorText !== undefined}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </Stack>
    </>
}

export default AutocompleteST
