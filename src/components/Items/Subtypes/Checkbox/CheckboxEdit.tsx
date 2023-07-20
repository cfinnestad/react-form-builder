import React, {useEffect, useState} from "react";
import {CheckboxSubtype, FieldProps, isCheckbox, OptionSubtype} from "../../Items";
import Options, {SelectedType} from "../../../Options/Options";
import {Checkbox, FormControl, FormControlLabel} from "@mui/material";

const CheckboxEdit = ({item, options}: FieldProps) => {
    if (!isCheckbox(item)) return <></>
    const [itemOptions, setItemOptions] = useState(item.options)

    useEffect(()=>{
        options.SetItem({...item,options:itemOptions} as OptionSubtype)
    },[itemOptions])


    const onClickInline = () => {
        const st = {...item} as CheckboxSubtype
        console.log('item.inline',st.inLine)
        if (!st.inLine) {
            st.inLine = true
        } else {
            delete st.inLine
        }
        options.SetItem(st)
    }

    return <>
        <FormControl>
            <FormControlLabel control={<Checkbox checked={item.inLine ?? false} onClick={onClickInline}/>} label="Inline"/>
        </FormControl><br/>
        <Options options={itemOptions} setOptions={setItemOptions} selectedType={SelectedType.Multiple}/>
    </>
}

export default CheckboxEdit