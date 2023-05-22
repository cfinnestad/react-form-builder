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

    const [item, setItem] = useState(fieldProps.item as CheckboxSubtype)

    const itm = {...item};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    }, [item])

    function onChange(index: number){
        itm.options[index].selected = !itm.options[index].selected;
        itm.value = itm.options.filter(i => {return i.selected ?? false}).map(i => {return i.value ?? i.label});
        setItem(itm);
    }

    let flex : string = '';
    if(item.inLine){
        flex = 'flex';
    }

    return <>
        <p>{item.name}</p>
        <div style = {{display: flex, flexDirection: 'row'}} >
            {item.options.map((option,index) =>
                <>
                    <FormGroup>
                        <FormControlLabel
                            control=
                                {<Checkbox
                                    value={option.value}
                                    checked={option.selected}
                                    onChange={() => onChange(index)} />}
                            label={option.label
                            }/>
                    </FormGroup>
                </>
            )}
        </div>

    </>
}

export default CheckboxField
