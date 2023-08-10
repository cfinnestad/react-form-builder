import React from "react";
import FilterInput from "./FilterInput";
import {Button} from "@mui/material";

type FilterMultipleInputsProps = {
    values: (string|number|boolean|undefined)[]
    setValues: (values:(string|number|boolean|undefined)[]) => void
    type: string
    label?: string
}

const FilterMultipleInputs = ({values,setValues,type,label}:FilterMultipleInputsProps) => {

    const setValue = (value: string|number|boolean|undefined, index:number|undefined) => {
        if(index===undefined) return
        const vals = [...values]
        vals[index] = value
        setValues(vals)
    }

    const addValue = () => {
        setValues([...values, undefined])
    }

    return <>
        <Button onClick={addValue}>Add</Button>
        {values.map((value,index) => <>
            <FilterInput value={value} setValue={setValue} type={type} label={label} index={index}/>

        </>)}
    </>
}

export default FilterMultipleInputs