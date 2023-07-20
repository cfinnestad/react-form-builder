import React from 'react';
import {FieldProps, isSelect, MultiplesSubtype} from "../../Items";
import Options, {SelectedType} from "../../../Options/Options";
import {Checkbox, FormControl, FormControlLabel} from "@mui/material";

const SelectEdit = ({item, options}: FieldProps) => {
    if (!isSelect(item)) return <></>

    const onClickMultiples = () => {
        const itm = {...item} as MultiplesSubtype
        if(!itm.multiples) {
            let firstSet = false
            const opts = itm.options.map(option => {
                const opt = {...option}
                if (!firstSet && opt.selected) {
                    firstSet = true
                } else {
                    opt.selected = false
                }
                return opt
            })
            itm.options = opts
        }
        options.SetItem(itm)
    }

    return <>
        <div><FormControl>
            <FormControlLabel control={<Checkbox checked={item.multiples} onClick={onClickMultiples}/>} label="Multiples"/>
        </FormControl><br/></div>
        <Options item={item} options={options} selectedType={item.multiples ? SelectedType.Multiple : SelectedType.Single}/>
    </>
}

export default SelectEdit;