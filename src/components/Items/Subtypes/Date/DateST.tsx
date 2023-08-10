import React, {useEffect} from "react";
import {DateSubtype, DateProps} from "../../Items";
import {FormHelperText, TextField, Stack} from "@mui/material";
import {DateValidate, dateFormat, today, getComputed, defaultFormat} from "./index";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs'

const DateST = ({item, options}: DateProps ) => {

    if (item.defaultToday === true && !item.value) item.value = today()
    if (!item.dateFormat) item.dateFormat = defaultFormat

    const onChange = (value: string | null) => {
        const itm = {...item} as DateSubtype

        itm.value = (value) ? dateFormat(dayjs(value)) : undefined

        if (itm.value === undefined) {
            delete itm.value
        }

        DateValidate(itm, options)

        //if (!options.IsBuild) {
            options.SetItem(itm)
        //}
    }

    useEffect( () => {
        const itm = {...item} as DateSubtype

        const newitm = getComputed(itm)

        options.SetItem(newitm)
    }, [])

    return <>
        <Stack spacing={2}>
            <div>{item.label} {item.required && <span>*</span>}</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={item.value ?? null as any}
                    onChange={onChange}
                    minDate={item.minDateComputed ?? null as any}
                    maxDate={item.maxDateComputed ?? null as any}
                    inputFormat={item.dateFormat}
                    disableMaskedInput={true}
                    renderInput={(params) => <TextField
                        {...params}
                        name={item.name}
                        required={item.required ?? false}
                        error={item.errorText !== undefined}
                        id={item.id}
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
