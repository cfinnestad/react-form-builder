import React, {ChangeEvent, useState} from "react";
import {DateProps} from "../../Items";
import {dateFormat, defaultFormat, getComputed} from "./index";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, TextField} from "@mui/material";
import ShowErrors from "../ShowErrors";
import dayjs from 'dayjs'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export const DateEdit = ({item, options}: DateProps ) => {
    const [valueError, setValueError] = useState(false)
    const [valueErrors, setValueErrors] = useState([] as string[])

    const [minDateError, setMinDateError] = useState(false)
    const [minDateErrors, setMinDateErrors] = useState([] as string[])
    const [maxDateError, setMaxDateError] = useState(false)
    const [maxDateErrors, setMaxDateErrors] = useState([] as string[])

    const [minDateOffsetDaysError, setMinDateOffsetDaysError] = useState(false)
    const [minDateOffsetDaysErrors, setMinDateOffsetDaysErrors] = useState([] as string[])
    const [minDateOffsetMonthsError, setMinDateOffsetMonthsError] = useState(false)
    const [minDateOffsetMonthsErrors, setMinDateOffsetMonthsErrors] = useState([] as string[])
    const [minDateOffsetYearsError, setMinDateOffsetYearsError] = useState(false)
    const [minDateOffsetYearsErrors, setMinDateOffsetYearsErrors] = useState([] as string[])

    const [maxDateOffsetDaysError, setMaxDateOffsetDaysError] = useState(false)
    const [maxDateOffsetDaysErrors, setMaxDateOffsetDaysErrors] = useState([] as string[])
    const [maxDateOffsetMonthsError, setMaxDateOffsetMonthsError] = useState(false)
    const [maxDateOffsetMonthsErrors, setMaxDateOffsetMonthsErrors] = useState([] as string[])
    const [maxDateOffsetYearsError, setMaxDateOffsetYearsError] = useState(false)
    const [maxDateOffsetYearsErrors, setMaxDateOffsetYearsErrors] = useState([] as string[])

    const [sharedMinErrors, setSharedMinErrors] = useState([] as string[])
    const [sharedMaxErrors, setSharedMaxErrors] = useState([] as string[])

    const [sharedMinOffsetErrors, setSharedMinOffsetErrors] = useState([] as string[])
    const [sharedMaxOffsetErrors, setSharedMaxOffsetErrors] = useState([] as string[])

    if (!item.dateFormat) item.dateFormat = defaultFormat

    const comboError = 'This combination of settings excludes all dates'

    const clearErrors = (section: string[]) => {
        if (section.indexOf("default") !== -1) {
            setValueError(false)
            setValueErrors([])
        }

        if (section.indexOf("minmax") !== -1) {
            setMinDateError(false)
            setMinDateErrors([])

            setMaxDateError(false)
            setMaxDateErrors([])
        }

        if (section.indexOf("offsets") !== -1) {
            setMinDateOffsetDaysError(false)
            setMinDateOffsetDaysErrors([])
            setMinDateOffsetMonthsError(false)
            setMinDateOffsetMonthsErrors([])
            setMinDateOffsetYearsError(false)
            setMinDateOffsetYearsErrors([])

            setMaxDateOffsetDaysError(false)
            setMaxDateOffsetDaysErrors([])
            setMaxDateOffsetMonthsError(false)
            setMaxDateOffsetMonthsErrors([])
            setMaxDateOffsetYearsError(false)
            setMaxDateOffsetYearsErrors([])
        }

        if (section.indexOf("shared") !== -1) {
            setSharedMinErrors([])
            setSharedMaxErrors([])

            setSharedMinOffsetErrors([])
            setSharedMaxOffsetErrors([])
        }
    }

    const onClickToday = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const itm = {...item}

        if (value === undefined) {
            delete itm.defaultToday
        } else {
            itm.defaultToday = value
            delete itm.value
        }

        clearErrors(["default"])

        options.SetItem(itm)
    }

    const onChangeDate = (value: string | null, which: string) => {
        const itm = {...item}

        if (value) {
            itm[which] = dateFormat(dayjs(value))
            const tempitm = getComputed(itm)

            if (which === "value" && itm.value === "Invalid Date") {
                setValueError(true)
                setValueErrors(['Default Value is not valid'])
            } else if (which === "minDate" && itm.minDate === "Invalid Date") {
                setMinDateError(true)
                setMinDateErrors(['Min Date is not valid'])
            } else if (which === "maxDate" && itm.maxDate === "Invalid Date") {
                setMaxDateError(true)
                setMaxDateErrors(['Max Date is not valid'])
            } else if (which === "minDate" && itm.minDate && itm.maxDate && itm.minDate > itm.maxDate) {
                setMinDateError(true)
                setMinDateErrors(['Min Date must be before Max Date'])
            } else if (which === "maxDate" && itm.minDate && itm.maxDate && itm.minDate > itm.maxDate) {
                setMaxDateError(true)
                setMaxDateErrors(['Max Date must be after Min Date'])

            } else if (tempitm.minDateComputed && tempitm.maxDateComputed && tempitm.minDateComputed > tempitm.maxDateComputed) {
                if (which.startsWith("min")) {
                    setMinDateError(true)
                    setSharedMinErrors([comboError])
                } else {
                    setMaxDateError(true)
                    setSharedMaxErrors([comboError])
                }

            } else {

                if (which === "value") clearErrors(["default"])
                else clearErrors(["minmax", "offsets", "shared"])
            }

        } else {
            delete itm[which]

            if (which === "value") clearErrors(["default"])
            else clearErrors(["minmax", "offsets", "shared"])
        }

        const newitm = getComputed(itm)

        options.SetItem(newitm)
    }

    const onChangeOffset = (event: ChangeEvent<HTMLInputElement>, which: string) => {
        const value = event.target.value || undefined
        const itm = {...item}

        if (value || value === "0") {

            if (Number.isNaN(value)
                || value.startsWith("0")
                || parseInt(value).toString().length !== value.length
                || value.indexOf(".") > -1) {

                if (which === "minDateOffsetDays") {
                    setMinDateOffsetDaysError(true)
                    setMinDateOffsetDaysErrors(['Min Offset Days is not valid'])
                } else if (which === "minDateOffsetMonths") {
                    setMinDateOffsetMonthsError(true)
                    setMinDateOffsetMonthsErrors(['Min Offset Months is not valid'])
                } else if (which === "minDateOffsetYears") {
                    setMinDateOffsetYearsError(true)
                    setMinDateOffsetYearsErrors(['Min Offset Years is not valid'])
                } else if (which === "maxDateOffsetDays") {
                    setMaxDateOffsetDaysError(true)
                    setMaxDateOffsetDaysErrors(['Max Offset Days is not valid'])
                } else if (which === "maxDateOffsetMonths") {
                    setMaxDateOffsetMonthsError(true)
                    setMaxDateOffsetMonthsErrors(['Max Offset Months is not valid'])
                } else if (which === "maxDateOffsetYears") {
                    setMaxDateOffsetYearsError(true)
                    setMaxDateOffsetYearsErrors(['Max Offset Years is not valid'])
                }

            } else {
                itm[which] = parseInt(value)
                const tempitm = getComputed(itm)

                if (tempitm.minDateComputed && tempitm.maxDateComputed && tempitm.minDateComputed > tempitm.maxDateComputed) {
                    if (which === "minDateOffsetDays") setMinDateOffsetDaysError(true)
                    else if (which === "minDateOffsetMonths") setMinDateOffsetMonthsError(true)
                    else if (which === "minDateOffsetYears") setMinDateOffsetYearsError(true)
                    else if (which === "maxDateOffsetDays") setMaxDateOffsetDaysError(true)
                    else if (which === "maxDateOffsetMonths") setMaxDateOffsetMonthsError(true)
                    else if (which === "maxDateOffsetYears") setMaxDateOffsetYearsError(true)

                    if (which.startsWith("min")) setSharedMinOffsetErrors([comboError])
                    else setSharedMaxOffsetErrors([comboError])

                } else {

                    clearErrors(["minmax", "offsets", "shared"])
                }
            }

        } else {
            delete itm[which]

            clearErrors(["minmax", "offsets", "shared"])
        }

        const newitm = getComputed(itm)

        options.SetItem(newitm)
    }

    // offset entry fields below are intentionally of type text, not number, for better validation

    return <>
        <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={item.defaultToday || false} onChange={onClickToday}/>}
                label="Default to Today"
            />
            <FormHelperText sx={{marginTop: -1}}>Selecting this option will disable setting a default value below.</FormHelperText>
        </FormGroup>

        <FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={item.value ?? null as any}
                    onChange={(value: string | null) => onChangeDate(value, 'value')}
                    label='Default Value'
                    inputFormat={item.dateFormat}
                    disableMaskedInput={true}
                    disabled={item.defaultToday || false}
                    renderInput={(params) => <TextField
                        {...params}
                        name={item.name}
                        id={item.id}
                        multiline={false}
                        fullWidth={true}
                        error={valueError}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={valueErrors}/>
        </FormGroup>

        <FormHelperText sx={{marginTop: -1}}>Enter the earliest and/or latest date(s) that can be chosen.</FormHelperText>

        <FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={item.minDate ?? null as any}
                    onChange={(value: string | null) => onChangeDate(value, 'minDate')}
                    label='Min Date'
                    inputFormat={item.dateFormat}
                    disableMaskedInput={true}
                    renderInput={(params) => <TextField
                        {...params}
                        name={item.name}
                        id={item.id}
                        multiline={false}
                        fullWidth={true}
                        error={minDateError}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={sharedMinErrors}/>
            <ShowErrors errors={minDateErrors}/>
        </FormGroup>

        <FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={item.maxDate ?? null as any}
                    onChange={(value: string | null) => onChangeDate(value, 'maxDate')}
                    label='Max Date'
                    inputFormat={item.dateFormat}
                    disableMaskedInput={true}
                    renderInput={(params) => <TextField
                        {...params}
                        name={item.name}
                        id={item.id}
                        multiline={false}
                        fullWidth={true}
                        error={maxDateError}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={sharedMaxErrors}/>
            <ShowErrors errors={maxDateErrors}/>
        </FormGroup>

        <FormHelperText sx={{marginTop: -1}}>
            Enter a positive or negative integer in any of the below fields.
            This will set the date limits relative to today.
            If both offsets and Min/Max are set, the narrowest range will apply.
        </FormHelperText>

        <FormGroup>
            <div>
                <div className={"inline-block"} style={{ verticalAlign: 'top' }}>
                    <TextField
                        size='small'
                        fullWidth={false}
                        label='Min Offset Days'
                        type="text"
                        defaultValue={item.minDateOffsetDays || undefined}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetDays')}
                        error={minDateOffsetDaysError}
                        sx={{marginRight: "10px"}}
                    />
                    <ShowErrors errors={minDateOffsetDaysErrors}/>
                </div>
                <div className={"inline-block"} style={{ verticalAlign: 'top' }}>
                    <TextField
                        size='small'
                        fullWidth={false}
                        label='Min Offset Months'
                        type="text"
                        defaultValue={item.minDateOffsetMonths || undefined}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetMonths')}
                        error={minDateOffsetMonthsError}
                        sx={{marginRight: "10px"}}
                    />
                    <ShowErrors errors={minDateOffsetMonthsErrors}/>
                </div>
                <div className={"inline-block"} style={{ verticalAlign: 'top' }}>
                    <TextField
                        size='small'
                        fullWidth={false}
                        label='Min Offset Years'
                        type="text"
                        defaultValue={item.minDateOffsetYears || undefined}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetYears')}
                        error={minDateOffsetYearsError}
                        sx={{marginRight: "10px"}}
                    />
                    <ShowErrors errors={minDateOffsetYearsErrors}/>
                </div>
            </div>
            <ShowErrors errors={sharedMinOffsetErrors}/>
        </FormGroup>

        <FormGroup>
            <div>
                <div className={"inline-block"} style={{ verticalAlign: 'top' }}>
                    <TextField
                        size='small'
                        fullWidth={false}
                        label='Max Offset Days'
                        type="text"
                        defaultValue={item.maxDateOffsetDays || undefined}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetDays')}
                        error={maxDateOffsetDaysError}
                        sx={{marginRight: "10px"}}
                    />
                    <ShowErrors errors={maxDateOffsetDaysErrors}/>
                </div>
                <div className={"inline-block"} style={{ verticalAlign: 'top' }}>
                    <TextField
                        size='small'
                        fullWidth={false}
                        label='Max Offset Months'
                        type="text"
                        defaultValue={item.maxDateOffsetMonths || undefined}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetMonths')}
                        error={maxDateOffsetMonthsError}
                        sx={{marginRight: "10px"}}
                    />
                    <ShowErrors errors={maxDateOffsetMonthsErrors}/>
                </div>
                <div className={"inline-block"} style={{ verticalAlign: 'top' }}>
                    <TextField
                        size='small'
                        fullWidth={false}
                        label='Max Offset Years'
                        type="text"
                        defaultValue={item.maxDateOffsetYears || undefined}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetYears')}
                        error={maxDateOffsetYearsError}
                        sx={{marginRight: "10px"}}
                    />
                    <ShowErrors errors={maxDateOffsetYearsErrors}/>
                </div>
            </div>
            <ShowErrors errors={sharedMaxOffsetErrors}/>
        </FormGroup>

        <FormHelperText sx={{marginTop: -1}}>
            Tip: To allow future dates only, enter the Min Offset Days as 1. For past only, enter the Max Offset Days as -1.
        </FormHelperText>
    </>
}

export default DateEdit