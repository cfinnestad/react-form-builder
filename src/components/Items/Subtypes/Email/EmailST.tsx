import React, {ChangeEvent, useEffect, useState} from "react";
import {EmailSubtype, FieldProps, isEmail} from "../../Items";
import {FormHelperText, Stack, TextField} from "@mui/material";
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
        <Stack spacing={2}>
            <div>{item.label} {item.required && <span>*</span>}</div>
            <TextField
                id={item.id}
                error={item.errorText !== undefined}
                required={item.required ?? false}
                size='small'
                fullWidth={true}
                name={item.name}
                type="text"
                defaultValue={item.value}
                onChange={onChange}
            />
            <FormHelperText error={item.errorText !== undefined}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </Stack>
    </>
}

export default EmailST
