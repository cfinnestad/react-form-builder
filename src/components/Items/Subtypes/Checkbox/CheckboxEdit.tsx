import React, {useEffect, useState} from "react";
import {CheckboxSubtype, FieldProps, isCheckbox} from "../../Items";
import Options, {SelectedType} from "../../../Options/Options";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

const CheckboxEdit = ({item, options}: FieldProps) => {
    if (!isCheckbox(item)) return <></>
    const [inline, setInline] = useState(item.inLine || false)

    useEffect(()=>{

        const st = {...item} as CheckboxSubtype
        if (inline) {
            st.inLine = true
        } else {
            delete st.inLine
        }
        options.SetItem(st)
    },[inline])

    const onClickInline = () => {
        setInline(!inline)

    }

    return <>
        <FormGroup>
            <FormControlLabel sx={{justifyContent: 'left'}} control={<Checkbox checked={item.inLine} onClick={onClickInline}/>} label="Inline"/>
        </FormGroup>
        <Options item={item} options={options} selectedType={SelectedType.Multiple}/>
    </>
}

export default CheckboxEdit