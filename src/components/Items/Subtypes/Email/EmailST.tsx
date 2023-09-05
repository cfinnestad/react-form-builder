import React, {ChangeEvent} from "react";
import {EmailProps, EmailSubtype} from "../../Items";
import {FormHelperText, InputLabel, Stack, TextField} from "@mui/material";
import {EmailValidate} from "./index";

const EmailST = ({item, options}: EmailProps ) => {
    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...item} as EmailSubtype

        itm.value = val
        if (itm.value === undefined) {
            delete itm.value
        }

        EmailValidate(itm, options)
        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={.5}>
            <InputLabel
                required = {item.required ?? false}
                error={item.errorText != null}
            >
                {item.label}
            </InputLabel>
            <TextField
                id={item.id}
                error={item.errorText !== undefined}
                required={item.required ?? false}
                name={item.name}
                type="text"
                defaultValue={item.value ?? ''}
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
