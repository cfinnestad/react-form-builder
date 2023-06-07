import React, {useEffect, useState} from "react";
import {
    BooleanSubtype,
    FieldProps, isBoolean,
    isField,
} from "../../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";
import {BooleanValidate} from "./index";

const BooleanST = ({item, options}: FieldProps ) => {

    if (!isBoolean(item) ) {
        return <></>
    }

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
            <FormControlLabel required={item.required ?? false} control=
                {<Checkbox
                    checked={item.value ?? false}
                    onChange={onChange}
                />} label={item.label}
            />
            <FormHelperText error={item.errorText !== undefined} sx = {{marginTop: -1}}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </FormGroup>
    </>
}

export default BooleanST
