import React, {ChangeEvent} from 'react'
import {TextField} from "@mui/material";
import {toInteger} from "lodash";

type FilterInputProps = {
    value: string|number|boolean|undefined
    setValue: (value: string|number|boolean|undefined, index: number|undefined) => void
    type: string
    label?: string
    index?: number
}

const FilterInput = ({value,index,setValue,type,label}:FilterInputProps) => {
    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        let val: string|number|boolean|undefined = event.target.value || undefined
        if (type === 'checkbox') {
            val = event.target.checked || undefined
        } else if(type==='number' && val !== undefined) {
            val = toInteger(val)
        }

        setValue(val, index)
    }

    return <>
        <TextField value={value} label={label} onChange={changeValue} type={type} placeholder='<undefined>'/>
    </>
}

export default FilterInput