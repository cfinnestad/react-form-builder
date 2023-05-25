import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldProps, isText, TextSubtype} from "../../Items";
import {TextField} from "@mui/material";

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

        itm.value = undefined
        delete itm.value
        itm.errorText = undefined
        delete itm.errorText

        if (itm.required && val === undefined) {
            itm.errorText = fieldProps.options.getError('required', itm)
        }
        if (val !== undefined) {
            if (val.length < (itm.minLength ?? 0)) {
                itm.errorText = fieldProps.options.getError('minLength', itm)
            }
            if (itm.maxLength !== undefined && val.length > itm.maxLength) {
                itm.errorText = fieldProps.options.getError('maxLength', itm)
            }
        }
        if (!itm.errorText) {
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
            multiline={item.multiline ?? false}
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

export default TextST
