import React, {useEffect, useState} from "react";
import {
    BooleanSubtype,
    FieldProps, isBoolean,
    isField,
} from "../../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";

const BooleanField = (fieldProps: FieldProps ) => {

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

        if(itm.value == undefined || itm.value == false)
        {
            itm.value = undefined
            delete item.value
        }

        setItem(itm);
    }

    return <>
        <p>{item.name}</p>
        <FormGroup>
            <FormControlLabel control=
                {<Checkbox
                    value={item.value}
                    checked={item.value}
                    required={item.required ?? false}
                    onChange={onChange}
                />} label={item.label}
            />
            <FormHelperText>
                {item.helperText}
            </FormHelperText>
        </FormGroup>
    </>
}

export default BooleanField
