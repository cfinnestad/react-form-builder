import React, {ChangeEvent} from "react";
import {NumberProps, NumberSubtype} from "../../Items";
import {FormHelperText, InputLabel, Stack, TextField} from "@mui/material";
import {NumberValidate} from "./index";

const NumberST = ({item, options}: NumberProps ) => {
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

        if (!(options.Mode === "build")) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={.5}>
            <InputLabel
                required={item.required ?? false}
                error={item.errorText != null}
                role="label"
            >
                {item.label}
            </InputLabel>
            <TextField
                id={item.id}
                error={item.errorText != null}
                name={item.name}
                multiline={false}
                required={item.required ?? false}
                type="text"
                inputProps={{pattern: '\d*'}}
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

export default NumberST