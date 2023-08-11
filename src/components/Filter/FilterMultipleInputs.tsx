import React from "react";
import FilterInput from "./FilterInput";
import {Button} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

type FilterMultipleInputsProps = {
    values: (string|number|boolean|undefined)[]
    setValues: (values:(string|number|boolean|undefined)[]) => void
    type: string
    label?: string
}

const FilterMultipleInputs = ({values,setValues,type,label = 'Value'}:FilterMultipleInputsProps) => {

    console.log('Values', values)
    const setValue = (value: string|number|boolean|undefined, index:number|undefined) => {
        if(index===undefined) return
        const vals = [...values]
        vals[index] = value
        setValues(vals)
    }

    const addValue = () => {
        setValues([...values, undefined])
    }

    const deleteValue = (index: number) => {
        setValues(values.slice(index,1))
    }

    return <>
        <Button onClick={addValue}>Add</Button>
        {values.map((value,index) => <>
            <FilterInput value={value} setValue={setValue} type={type} label={label} index={index} inputProps={{endAdornment: <Button onClick={() => deleteValue(index)}><DeleteForeverRoundedIcon sx={{ fontSize: 'medium', verticalAlign:'center', m: 1 }} /></Button>}}/>
        </>)}
    </>
}

export default FilterMultipleInputs