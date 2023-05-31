import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldProps, isText, TextSubtype} from "../../Items";
import {FormHelperText, TextField, Stack} from "@mui/material";
import {TextValidate} from "./index";

const TextST = (fieldProps: FieldProps ) => {

    if (!isText(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as TextSubtype)

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
        TextValidate(itm, fieldProps.options)
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
                multiline={item.multiline ?? false}
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

export default TextST
