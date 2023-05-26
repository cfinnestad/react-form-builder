import React, {ChangeEvent, useEffect, useState} from "react";
import {EmailSubtype, FieldProps, isEmail} from "../../Items";
import {FormHelperText, TextField} from "@mui/material";
import {EmailValidate} from "./index";

const EmailST = (fieldProps: FieldProps ) => {

    if (!isEmail(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as EmailSubtype)

    useEffect(()=>{
        if (!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    },[item])

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...item}

        itm.value = val
        if(itm.value === undefined) {
            delete itm.value
        }

        EmailValidate(itm, fieldProps.options)
        setItem(itm)
    }

    return <>
        <TextField
            id={item.id}
            error={item.errorText !== undefined}
            required={item.required ?? false}
            size='small'
            fullWidth={true}
            name={item.name}
            label={item.label}
            type="text"
            defaultValue={item.value}
            onChange={onChange}
        />
        <FormHelperText error={item.errorText !== undefined}>
            {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
            {item.errorText}
        </FormHelperText>
    </>
}

export default EmailST
