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
            <FormControlLabel control=
                {<Checkbox
                    value={item.value ?? false}
                    checked={item.value ?? false}
                    required={item.required ?? false}
                    onChange={onChange}
                />} label={item.label}
            />
            <FormHelperText sx = {{marginTop: -1}}>
                {item.helperText}
            </FormHelperText>
        </FormGroup>
    </>
}

export default BooleanST
