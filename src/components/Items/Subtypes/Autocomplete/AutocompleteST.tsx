import React, {useEffect, useRef, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {FieldProps, Option, isAutocomplete} from "../../Items";
import AutocompleteValidate from "./AutocompleteValidate";


export type FilterOptionsFunc = (input?: string) => (Promise<Option[]> | Option[])

const AutocompleteST = (fieldProps: FieldProps) => {

    if (!isAutocomplete(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item)
    const [searchTerm, setSearchTerm] = useState('')
    const [choices, setChoices] = useState<Option[]>([])

    const filterOptions = useRef<FilterOptionsFunc>((input?: string) => []) //

    // Initialize filterOptions to use passed-in searchableOptions function. Otherwise, fall back to static Option list from schema.
    useEffect(() => {
        if (item.searchableOptionsName != null) {
            const getChoicesUnsafe = fieldProps.options.searchableOptions?.[item.searchableOptionsName]
            if ( getChoicesUnsafe != null && typeof getChoicesUnsafe === 'function') {
                filterOptions.current = getChoicesUnsafe
            } else {
                console.warn(`choices callback for ${item.id} not found. configured to use callback titled ${item.options}`)
                filterOptions.current = (input) => [] as Option[]
            }
        } else {
            filterOptions.current = (input) => {
                return (item.options ?? []).filter(option =>
                    input != null
                        ? option.value?.toLowerCase().includes(input) || option.label.toLowerCase().includes(input)
                        : false
                )
            }
        }
    }, [])

    useEffect(()=>{
        if (!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    },[item])

    // Debounce call to getChoices
    useEffect( () => {
        const getData = setTimeout(async () => {
            const choices = await filterOptions.current(searchTerm)
            setChoices(choices.sort((a, b) => a.label.localeCompare(b.label)))
        }, 500)

        return () => clearTimeout(getData)
    }, [searchTerm])

    const onAutocompleteChange = (event: React.SyntheticEvent, value: unknown, reason: string)=> {
        const itm = {...item}

        // try using value.value, but fallback to value. If freeSolo + autoSelect are enabled, and user leaves free text in input.
        // itm.value = item.allowAnyInput ? (value as Option)?.value ?? value as string : (value as Option)?.value
        itm.value = (value as Option)?.value
        if (!itm.value) {
            itm.value = undefined;
            delete itm.value;
        }

        AutocompleteValidate(itm, fieldProps.options)
        setItem(itm)
    }

    return <>
        <Autocomplete
            id={item.id}
            // freeSolo={item.allowAnyInput ?? false}   // TODO: implement allowAnyInput
            // autoSelect={item.allowAnyInput ?? false}
            onChange={onAutocompleteChange}
            defaultValue={null}
            options={choices}
            // filterOptions={ (options, state) => options }
            disablePortal={true}
            componentsProps={{
                paper: {
                    sx: {
                        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                    }
                }
            }}
            onInputChange={(event, value) => {
                console.log('onInputChange', value)
                setSearchTerm(value)
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    type="text"
                    label={item.label}
                    name={item.name}
                    fullWidth={true}
                    required={item.required}
                    size='small'
                    error={item.errorText !== undefined}
                    helperText={<>
                        {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                        {item.errorText}
                    </>}
                />
            }
        />
    </>
}

export default AutocompleteST
