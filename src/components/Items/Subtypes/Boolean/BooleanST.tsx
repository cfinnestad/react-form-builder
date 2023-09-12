import React from "react";
import {BooleanProps, BooleanSubtype} from "../../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, InputLabel} from "@mui/material";
import {BooleanValidate} from "./index";

const BooleanST = ({item, options}: BooleanProps ) => {

    function onChange(){
        const itm = {...item} as BooleanSubtype;
        itm.value = !itm.value;

        if(!itm.value)
        {
            itm.value = undefined
            delete itm.value
        }

        BooleanValidate(itm, options)

        if(!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    return <>
        <FormGroup>
            {item.label ? <InputLabel
                required={item.required ?? false}
                error={item.errorText != null}
                sx={{marginBottom: -1}}
                role="label"
            >
                {item.label}
            </InputLabel> : undefined}
            <FormControlLabel required={item.required ?? false} control=
                {<Checkbox
                    checked={item.value ?? false}
                    onChange={onChange}
                />} label={item.description}
            />
            <FormHelperText error={item.errorText !== undefined} sx = {{marginTop: -1}}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </FormGroup>
    </>
}

export default BooleanST
