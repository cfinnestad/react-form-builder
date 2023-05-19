import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldProps, isNumber, NumberSubtype} from "../../Items";
import {TextField} from "@mui/material";

const NumberST = (fieldProps: FieldProps ) => {
    console.log('Number ..', fieldProps.item)

    if (!isNumber(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as NumberSubtype)

    useEffect(()=>{
        if (!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    },[item])

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value ?? undefined
        const itm = {...item}

        itm.value = undefined
        delete item.value
        itm.errorText = undefined
        delete itm.errorText

        const parsed = (val != null && val !== '' && !isNaN(+val))
            ? Number(val)
            : undefined

        if (item.required && !val) {
            itm.errorText = itm.label + ' is required'
        } else if (val && isNaN(+val)) {     // input is not a number
            itm.errorText = item.label + ' must be a valid number.'
        } else if (parsed !== undefined && item?.min !== undefined && parsed < item?.min  ) {
            itm.errorText = item.label + ' must be greater than ' + item.min
        } else if (parsed !== undefined && item.max !== undefined && parsed > item.max) {
            itm.errorText = item.label + ' must be less than ' + item.max
        } else {
            itm.value = parsed
        }
        setItem(itm)
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
            defaultValue={item.value}
            onChange={onChange}
        />
    </>
}

export default NumberST
