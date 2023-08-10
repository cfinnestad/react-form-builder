import React, {ChangeEvent} from 'react'
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {toInteger} from "lodash";
import MuiPhoneNumber from "mui-phone-number";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {dateFormat, defaultFormat} from "../Items/Subtypes/Date";
import dayjs from "dayjs";

type FilterInputProps = {
    value: string|number|boolean|undefined
    setValue: (value: string|number|boolean|undefined, index: number|undefined) => void
    type: string
    label?: string
    index?: number
}

const FilterInput = ({value,index,setValue,type,label}:FilterInputProps) => {
    const changeValue = (event: string | boolean | undefined | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let val:string|number|boolean|undefined = (typeof event === 'string' || typeof event === 'boolean' || event === undefined) ? event : event.target.value
        if (type === 'date') {
            val = (val) ? dateFormat(dayjs(val as string)) : undefined
        } else if(type==='number' && val !== undefined) {
            val = toInteger(val)
        } else if (!val) {
            val = undefined
        }
        setValue(val, index)
    }
    if (type === 'phone') {
        return <>
            <MuiPhoneNumber
                defaultCountry={'us'}
                onChange={changeValue}
                label={label ?? 'Value'}
                disableCountryCode = {true}
                disableDropdown = {true}
                onlyCountries = {['us']}
            />
        </>
    }

    if (type === 'date') {
        return <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={value ?? undefined as string|undefined}
                    onChange={(value) => changeValue(value?.toString() ?? undefined)}
                    disableMaskedInput={true}
                    inputFormat={defaultFormat}
                    renderInput={(params) => <TextField
                        {...params}
                        name='date-filter'
                        multiline={false}
                        fullWidth={true}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
        </>
    }

    if (type === 'checkbox') {
        return <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value as boolean|undefined}
                        onClick={() => changeValue(!value)}
                    />
                }
                label={label ?? 'Checked'}
            />
        </>
    }

    return <>
        <TextField size='small' value={value} label={label ?? 'Value'} onChange={changeValue} type={type} placeholder='<undefined>'/>
    </>
}

export default FilterInput