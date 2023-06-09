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

            const getOffset = (offset: number, unit: ManipulateType) => {
                if (offset < 0) return dateFormat(dayjs(today()).subtract(-offset, unit))
                else return dateFormat(dayjs(today()).add(offset, unit))
            }
            const today = () => {
                return dateFormat(dayjs())
            }

            let latestMin = itm.minDate ?? undefined
            let earliestMax = itm.maxDate ?? undefined

            let offsets = {
                minDateOffsetDays: "d",
                minDateOffsetMonths: "M",
                minDateOffsetYears: "y",
                maxDateOffsetDays: "d",
                maxDateOffsetMonths: "M",
                maxDateOffsetYears: "y"
            }

            for (let key in offsets) {
                let unit = offsets[key] as ManipulateType
                let isMin = key.startsWith("min")
                let offsetDate = getOffset(itm[key], unit)

                if (itm[key] && isMin && (!latestMin || dateCmp(offsetDate, latestMin, "isAfter")))
                    latestMin = offsetDate
                else if (itm[key] && !isMin && (!earliestMax || dateCmp(offsetDate, earliestMax, "isBefore")))
                    earliestMax = offsetDate
            }

            itm.minDate = latestMin
            itm.maxDate = earliestMax

            options.SetItem(itm)
        }
    }, [item])

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
