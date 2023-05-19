import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState, JSX} from "react";
import {AnyItem, FieldProps, isNumber, NumberSubtype} from "../../Items";
import {TextField} from "@mui/material";

const NumberST = ({item, items, options}: FieldProps ) => {
    console.log('Number ..', item)

    // const [value, setValue] = useState(item.value)

    if (!isNumber(item) ) {
        return <></>
    }

    const validate = (value?: string): void => {
        console.log('validate...', value)

        const itm = {...item}
        itm.errorText = undefined

        const parsed = (value != null && value !== '' && !isNaN(+value))
            ? Number(value)
            : undefined

        if (parsed != undefined && item?.min != null && parsed < item?.min) {
            itm.errorText = item.label + ' must be greater than ' + item.min
        } else if (parsed != undefined && item.max != null && parsed > item.max) {
            itm.errorText = item.label + ' must be less than ' + item.max
        } else if (parsed === undefined && value !== undefined && isNaN(+value)) {     // input is not a number
            console.log('value != null && value !== \'\'')
            itm.errorText = item.label + ' must be a valid number.'
            itm.value = undefined
        } else if (item.required && parsed === undefined) {
            console.log('item.required')
            itm.errorText = item.label + ' is required'
            itm.value = undefined
        } else {
            console.log('itm.value = parsed')
            itm.value = parsed
        }
        options.SetItem(itm)
    }

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: NumberSubtype, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value ?? undefined

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

        validate(value)

        // setValue(validate(value))
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
            error={item.errorText != null}
            helperText={<>{item.helperText ? <>{item.helperText}<br/></> : ''}{item.errorText}</>}
            size='small'
            fullWidth={true}
            name={item.name}
            label={item.label}
            multiline={false}
            type="text"
            inputProps={{pattern: '\d*'}}
            required={item.required ?? false}
            value={item.value}
            onChange={(event) => onChange(event, item, items, options.setItems) }
        />
    </>
}

export default NumberST
