import React, {Dispatch, SetStateAction} from 'react'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

type SelectOptionProps = {
    id: string,
    option: string|undefined,
    setOption: Dispatch<SetStateAction<string|undefined>>,
    options: string[],
    label: string,
    none?: string,
}

const SelectOption = ({id, option, setOption, options, label, none}:SelectOptionProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setOption(value === '' ? undefined : value)
    };
    return <>
        <FormControl fullWidth>
            <InputLabel id={id+"-label"}>{label}</InputLabel>
            <Select
                labelId={id+"-label"}
                id={id}
                value={option}
                label={label}
                onChange={handleChange}
            >
                { none === undefined ? '' : <MenuItem value=''>{none}</MenuItem>}
                { options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    </>
}

export default SelectOption