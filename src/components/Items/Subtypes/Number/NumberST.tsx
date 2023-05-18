import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState, JSX} from "react";
import {AnyItem, FieldProps, isNumber, NumberSubtype} from "../../Items";
import {TextField} from "@mui/material";

const NumberST = ({item, items, options}: FieldProps ) => {
    // console.log('Number ..', props)

    if (!isNumber(item) ) {
        return <></>
    }

    const [errorText, setErrorText] = useState<JSX.Element | null>(null)
    const [value, setValue] = useState(item.value)

    console.log('STATE...', {
        errorText: errorText,
        value: value
    })

    useEffect(() => {
        if(!options.IsBuild) {
            item.value = value
            options.SetItem(item)
        }
    }, [value])

    const validate = (value?: string): number | undefined => {
        console.log('validate...', value)

        const parsed = value != null && value !== '' && !isNaN(+value)
            ? Number(value)
            : undefined

        if (parsed != null) {   // input is a number
            if (item?.min != null && parsed < item?.min) {
                setErrorText(<>{item.label + ' must be greater than ' + item.min}<br/></>)
                return undefined
            }
            if (item.max != null && parsed > item.max) {
                setErrorText(<>{item.label + ' must be less than ' + item.max}<br/></>)
                return undefined
            }
        } else if (value != null && value !== '') {     // input is not a number
            setErrorText(<>{item.label + ' must be a valid number.'}<br/></>)
            return undefined
        }
        else {    // input is missing
            if (item.required) {
                setErrorText(<>{item.name + ' is required'}<br/></>)
                return undefined
            }
        }
        setErrorText(null)
        return parsed
    }

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: NumberSubtype, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value ?? undefined
        console.log('onChange...', value)



        // if (value != null) {
        //     if (isValidNumber(value)) {
        //         if (value < (subtype.min ?? 0)) {
        //             setErrors([...errors, item.label + ' must be greater than ' + subtype.min])
        //         }
        //         if (value > (subtype.max ?? 0)) {
        //             setErrors([...errors, item.label + ' cannot exceed ' + subtype.min + 'charters'])
        //         }
        //     } else {
        //         setErrors([...errors, item.label + ' must be a valid number.'])
        //     }
        // } else {
        //     if (item.required) {
        //         setErrors([...errors, Item.name + ' is required'])
        //     }
        // }
        // if (item.required && value === undefined) {
        //     console.log('NUMBER IS REQUIRED')
        //     setErrors([...errors, Item.name + ' is required'])
        // }
        //
        // console.log('errors...', errors)
        // if(errors.length > 0) {
        //     console.log('ERRORS...', errors)
        //     setError(true)
        //     return
        // }

        // If rendering, make a copy of the item, and use that.
        // if(!fieldoptions.IsBuild) {
        //     const itm = {...item}
        //     itm.subtype = {...itm.subtype}
        //     itm.subtype.value = value
        //     fieldoptions.SetItem(itm)
        // }

        setValue(validate(value))
        // setError(false)
        // setErrors([])
        // if (!fieldoptions.IsBuild) {
        //     Item.subtype.value = value
        //     SetItems(SetItem(Item,Items))
        // }
    }

    return <>
        <TextField
            id={item.id}
            error={errorText != null}
            helperText={<>TEST TEXT<br/>{errorText}</>}
            size='small'
            fullWidth={true}
            name={item.name}
            label={item.label}
            multiline={false}
            type="text"
            inputProps={{pattern: '\d*'}}
            required={item.required ?? false}
            value={value}
            onChange={(event) => onChange(event, item, items, options.setItems) }
        />
    </>
}

export default NumberST
