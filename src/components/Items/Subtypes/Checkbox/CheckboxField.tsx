import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {AnyItem, CheckboxSubtype, FieldItem, FieldProps, isCheckbox, isField, isText} from "../../Items";
import {Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import SetItem from "../../SetItem";
import ShowErrors from "../ShowErrors";
import {number} from "prop-types";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const CheckboxField = (fieldProps: FieldProps ) => {


    if (!isField(fieldProps.item) || !isCheckbox(fieldProps.item) ) {
        return <></>
    }

    const [value, setValue] = useState(fieldProps.item as CheckboxSubtype)

    const item = fieldProps.item

    const itm = {...value};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(value)
        }
    }, [value])

    function handleChange(index: number){
        itm.options[index].selected = !itm.options[index].selected;
        setValue(itm);
    }
    const inline = 'inline';
    return <>
        <p>{item.name}</p>
        {/*TODO: if inline do this else do that or some way to manage inline*/}
        {item.options.map((option,index) =>
            <>
                <FormGroup>
                    <FormControlLabel
                        control=
                            {<Checkbox
                                sx = {{display: 'inline'}}
                                value={option.value}
                                checked={option.selected}
                                onClick={() => handleChange(index)} />}
                        label={option.label
                    }/>
                </FormGroup>
            </>
        )}
    </>
}

export default CheckboxField
