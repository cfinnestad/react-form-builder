import React, {useEffect, useState} from "react";
import {
    BooleanSubtype,
    FieldProps, isBoolean,
    isField,
} from "../../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";
import {BooleanValidate} from "./index";

const BooleanST = (fieldProps: FieldProps ) => {

    if (!isField(fieldProps.item) || !isBoolean(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as BooleanSubtype)

    const itm = {...item};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    }, [item])

    function onChange(){
        itm.value = !itm.value;

        if(!itm.value)
        {
            itm.value = undefined
            delete itm.value
        }

        BooleanValidate(itm, fieldProps.options)

        setItem(itm);
    }

    return <>
        <FormGroup sx = {{ paddingX: 2}}>
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
