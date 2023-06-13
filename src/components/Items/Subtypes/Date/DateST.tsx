import React, {useEffect} from "react";
import {FieldProps, isDate, DateSubtype} from "../../Items";
import {FormHelperText, TextField, Stack} from "@mui/material";
import {DateValidate, dateFormat, dateCmp} from "./index";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import dayjs, {ManipulateType} from 'dayjs'

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

    useEffect( () => {
        if (!options.IsBuild) {
            const itm = {...item} as DateSubtype

            const getOffset = (offset: number, unit: ManipulateType, start?: string) => {
                if (!start) start = today()
                if (offset < 0) return dateFormat(dayjs(start).subtract(-offset, unit))
                else return dateFormat(dayjs(start).add(offset, unit))
            }
            const today = () => {
                return dateFormat(dayjs())
            }

            let offsets = {
                min: {
                    minDateOffsetDays: "d",
                    minDateOffsetMonths: "M",
                    minDateOffsetYears: "y"
                },
                max: {
                    maxDateOffsetDays: "d",
                    maxDateOffsetMonths: "M",
                    maxDateOffsetYears: "y"
                }
            }

            for (let group in offsets) {
                let running = null

                // cumulatively apply all offsets from each group
                for (let key in offsets[group]) {
                    if (itm[key]) {
                        let unit = offsets[group][key] as ManipulateType
                        running = getOffset(itm[key], unit, running)
                    }
                }

                // set min or max if the offsets are narrower
                if (running) {
                    if (group === "min" && (!itm.minDate || dateCmp(running, itm.minDate, "isAfter")))
                        itm.minDate = running
                    else if (group === "max" && (!itm.maxDate || dateCmp(running, itm.maxDate, "isBefore")))
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
                    id={item.id}
                    error={item.errorText !== undefined}
                    required={item.required ?? false}
                    name={item.name}
                    value={item.value ?? null as any}
                    onChange={onChange}
                    minDate={item.minDate ?? null as any}
                    maxDate={item.maxDate ?? null as any}
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
