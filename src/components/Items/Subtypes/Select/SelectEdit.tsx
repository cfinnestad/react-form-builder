import React, {ChangeEvent, useEffect, useState} from 'react';
import {MultiplesSubtype, OptionSubtype, SelectProps} from "../../Items";
import Options, {SelectedType} from "../../../Options/Options";
import {Checkbox, FormControl, FormControlLabel, FormHelperText} from "@mui/material";

const SelectEdit = ({item, options}: SelectProps) => {
    const [itemOptions, setItemOptions] = useState(item.options)

    useEffect(()=>{
        options.SetItem({...item,options:itemOptions} as OptionSubtype)
    },[itemOptions])

    useEffect(()=>{
        setItemOptions(item.options)
    },[item])

    const onClickMultiples = () => {
        const itm = {...item} as MultiplesSubtype
        itm.multiples = !itm.multiples
        if(!itm.multiples) {
            let firstSet = false
            itm.options = itm.options.map(option => {
                const opt = {...option}
                if (!firstSet && opt.selected) {
                    firstSet = true
                } else {
                    opt.selected = false
                }
                return opt
            })
        }
        options.SetItem(itm)
    }

    return <>
        <div><FormControl>
            <FormControlLabel control={<Checkbox defaultChecked={item.multiples??false} onClick={onClickMultiples}/>} label="Multiples"/>
        </FormControl></div>
        { item.multiples
            ? <Options options={itemOptions} setOptions={setItemOptions} selectedType={SelectedType.Multiple}/>
            : <Options options={itemOptions} setOptions={setItemOptions} selectedType={SelectedType.Single}/>
        }
    </>
}

export default SelectEdit;