import React, {ChangeEvent} from "react";
import {itemCloneDeep, TextProps} from "../../Items";
import {FormHelperText, TextField, Stack, InputLabel} from "@mui/material";
import {TextValidate} from "./index";

const TextST = ({item, options}: TextProps ) => {
    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = itemCloneDeep(item)

        itm.value = val
        if(itm.value === undefined) {
            delete itm.value
        }
        TextValidate(itm, options)

        if (!(options.Mode === "build")) {
            options.SetItem(itm)
        }
    }

    //use mode to set readonly
    return <>
        <Stack spacing={.5}>
            {item.label ?
                <InputLabel
                    required = {item.required ?? false}
                    error={item.errorText != null}
                    role="label"
                >
                    {item.label}
                </InputLabel>
                : undefined}
            <TextField
                id={'render_'+item.id}
                error={item.errorText !== undefined}
                required={item.required ?? false}
                name={item.name}
                multiline={item.multiline ?? false}
                minRows={item.minRows}
                maxRows={item.maxRows}
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

export default TextST
