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

    const onClickEditable = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const itm = {...item}
        if (value === undefined) {
            delete itm.editable
        } else {
            itm.editable = true
        }
        options.SetItem(itm)
    }

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
        <FormControl>
            <FormControlLabel
                control={<Checkbox defaultChecked={item.editable || false} onChange={onClickEditable}/>}
                label="Editable"
            />
            <FormHelperText sx={{marginTop: -1, marginLeft: 0}}>Enable editing in backend.</FormHelperText>
        </FormControl>
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