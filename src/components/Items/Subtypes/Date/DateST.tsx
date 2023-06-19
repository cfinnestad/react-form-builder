import React, {useEffect} from "react";
import {FieldProps, isDate, DateSubtype} from "../../Items";
import {FormHelperText, TextField, Stack} from "@mui/material";
import {DateValidate, dateFormat, dateCmp} from "./index";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import dayjs, {ManipulateType} from 'dayjs'

const offsetUnits = {
    DateOffsetDays: "d",
    DateOffsetMonths: "M",
    DateOffsetYears: "y"
}
const offsets = [
    'min',
    'max',
]

const today = () => {
    return dateFormat(dayjs())
}

const DateST = ({item, options}: FieldProps ) => {

    if (!isDate(item) ) {
        return <></>
    }

    if (item.value === "today") item.value = today()

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

    useEffect( () => {
        if (!options.IsBuild) {
            const itm = {...item} as DateSubtype

            const getOffset = (offset: number, unit: ManipulateType, start?: string) => {
                if (!start) start = today()
                if (offset < 0) return dateFormat(dayjs(start).subtract(-offset, unit))
                else return dateFormat(dayjs(start).add(offset, unit))
            }

            for (const group in offsets) {
                let running = undefined

                // cumulatively apply all offsets from each group
                for (const type in offsetUnits) {
                    const key = offsets[group] + type as keyof DateSubtype
                    const value = itm[key]
                    if (typeof value === 'number') {
                        let unit = offsetUnits[type as keyof typeof offsetUnits] as ManipulateType
                        running = getOffset(value, unit, running)
                    }
                }

                // set min or max if the offsets are narrower
                if (running) {
                    if (offsets[group] === "min" && (!itm.minDate || dateCmp(running, itm.minDate, "isAfter")))
                        itm.minDate = running
                    else if (offsets[group] === "max" && (!itm.maxDate || dateCmp(running, itm.maxDate, "isBefore")))
                        itm.maxDate = running
                }
            }

            options.SetItem(itm)
        }
    }, [])

    return <>
        <Stack spacing={2}>
            <div>{item.label} {item.required && <span>*</span>}</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={item.value ?? null as any}
                    onChange={onChange}
                    minDate={item.minDate ?? null as any}
                    maxDate={item.maxDate ?? null as any}
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
