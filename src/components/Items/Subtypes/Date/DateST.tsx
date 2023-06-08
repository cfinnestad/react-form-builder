import React from "react";
import {FieldProps, isDate, DateSubtype} from "../../Items";
import {FormHelperText, TextField, Stack} from "@mui/material";
import {DateValidate, dateFormat} from "./index";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs'

const DateST = ({item, options}: FieldProps ) => {

    if (!isDate(item) ) {
        return <></>
    }

    const onChange = (value: string | null) => {
        const itm = {...item} as DateSubtype

        itm.value = (value) ? dateFormat(dayjs(value)) : undefined

        if (itm.value === undefined) {
            delete itm.value
        }

        DateValidate(itm, options)

        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={2}>
            <div>{item.label} {item.required && <span>*</span>}</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    id={item.id}
                    error={item.errorText !== undefined}
                    required={item.required ?? false}
                    name={item.name}
                    value={item.value ?? null}
                    onChange={onChange}
                    minDate={item.minDate}
                    maxDate={item.maxDate}
                    renderInput={(params) => <TextField
                        {...params}
                        multiline={false}
                        fullWidth={true}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <FormHelperText error={item.errorText !== undefined}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </Stack>
    </>
}

export default DateST
