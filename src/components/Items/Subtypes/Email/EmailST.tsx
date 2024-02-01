import React, {ChangeEvent} from "react";
import {EmailProps, EmailSubtype} from "../../Items";
import {FormHelperText, InputLabel, Stack, TextField} from "@mui/material";
import {EmailValidate} from "./index";

const EmailST = ({item, options}: EmailProps ) => {
    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...item} as EmailSubtype

        itm.value = val || undefined
        if (itm.value === undefined) {
            delete itm.value
        }
        console.log('onChange Email', itm)

        EmailValidate(itm, options)
        if (!(options.Mode === "build")) {
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
                className={item?.ClassName}
                id={item.id}
                error={item.errorText !== undefined}
                required={item.required ?? false}
                name={item.name}
                type="text"
                defaultValue={item.value ?? ''}
                onChange={onChange}
                disabled={(!item.editable && options.Mode==="edit")}
            />
            <FormHelperText error={item.errorText !== undefined}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </Stack>
    </>
}

export default EmailST
