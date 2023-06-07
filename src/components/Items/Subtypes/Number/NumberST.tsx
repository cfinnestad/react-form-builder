import React, {ChangeEvent} from "react";
import {FieldProps, isNumber, NumberSubtype} from "../../Items";
import {FormHelperText, InputLabel, Stack, TextField} from "@mui/material";
import {NumberValidate} from "./index";

const NumberST = ({item, options}: FieldProps ) => {
    if (!isNumber(item) ) {
        return <></>
    }

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value ?? undefined
        const itm = {...item} as NumberSubtype

        const parsed = (val != null && val !== '' && !isNaN(+val))
            ? Number(val)
            : undefined

        // @ts-ignore
        itm.value = val
        NumberValidate(itm, options)
        itm.value = parsed
        if(item.value === undefined) {
            delete item.value
        }

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
                error={item.errorText != null}
                name={item.name}
                multiline={false}
                type="text"
                inputProps={{pattern: '\d*'}}
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

export default NumberST
