import React, {ChangeEvent, useEffect, useState} from "react";
import {EmailSubtype, FieldProps, isEmail} from "../../Items";
import {TextField} from "@mui/material";

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

        itm.value = undefined
        delete itm.value
        itm.errorText = undefined
        delete itm.errorText

        if (itm.required && val === undefined) {
            itm.errorText = fieldProps.options.getError('required', itm)
        } else if (val !== undefined && itm.maxLength !== undefined && val.length > itm.maxLength) {
            itm.errorText = fieldProps.options.getError('maxLength', itm)
        } else if (val !== undefined && !val.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            itm.errorText = fieldProps.options.getError('email', itm)
        } else {
            itm.value = val
        }
        setItem(itm)
    }

    return <>
        <TextField
            id={item.id}
            error={item.errorText !== undefined}
            size='small'
            fullWidth={true}
            name={item.name}
            label={item.label}
            helperText={<>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </>}
            type="text"
            defaultValue={item.value}
            onChange={onChange}
        />
    </>
}

export default EmailST