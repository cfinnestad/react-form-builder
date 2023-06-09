import React, {ChangeEvent} from "react";
import {FieldProps, isText, TextSubtype} from "../../Items";
import {FormHelperText, TextField, Stack, InputLabel} from "@mui/material";
import {TextValidate} from "./index";

const TextST = ({item, options}: FieldProps ) => {

    if (!isText(item) ) {
        return <></>
    }

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...item} as TextSubtype

        itm.value = val
        if(itm.value === undefined) {
            delete itm.value
        }
        TextValidate(itm, options)
        
        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={.5}>
            <InputLabel
                required={item.required ?? false}
                error={item.errorText != null}
            >
                {item.label}
            </InputLabel>
            <TextField
                id={item.id}
                error={item.errorText !== undefined}
                required={item.required ?? false}
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
