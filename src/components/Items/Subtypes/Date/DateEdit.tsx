import React, {ChangeEvent} from "react";
import {DateProps, DateSubtype} from "../../Items";
import {dateCmp, dateFormat, defaultFormat, getComputed} from "./index";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, TextField} from "@mui/material";
import ShowErrors from "../ShowErrors";
import dayjs from 'dayjs'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export const DateEdit = ({item, options, errorHandler}: DateProps ) => {
    if (!item.dateFormat) item.dateFormat = defaultFormat

    // all fields that can have errors, used in combo function
    const fields = [
        "value",
        "minDate",
        "maxDate",
        "minDateOffsetDays",
        "minDateOffsetMonths",
        "minDateOffsetYears",
        "maxDateOffsetDays",
        "maxDateOffsetMonths",
        "maxDateOffsetYears",
        "sharedMin",
        "sharedMax",
        "sharedMinOffset",
        "sharedMaxOffset"
    ]

    // associate fields with their shared error groups
    const groups = {
        "sharedMin": ["minDate"],
        "sharedMax": ["maxDate"],
        "sharedMinOffset": ["minDateOffsetDays", "minDateOffsetMonths", "minDateOffsetYears"],
        "sharedMaxOffset": ["maxDateOffsetDays", "maxDateOffsetMonths", "maxDateOffsetYears"]
    }

    // deal with errors caused by multiple incompatible field values
    const handleCombo = (itm: DateSubtype) => {
        const calcItm = getComputed(itm)

        const comboError = 'This combination of settings excludes all dates.'

        // use a computed item to see if the possible date range would be empty
        const badRange = (calcItm.minDateComputed && calcItm.maxDateComputed
            && dateCmp(calcItm.minDateComputed, calcItm.maxDateComputed, "isAfter"))

        // loop through fields and toggle errors for populated and shared
        for (let f in fields) {
            let field = fields[f]

            if (badRange) {
                // set shared error if applicable
                if (field.startsWith("shared")) {

                    // toggle it based on which fields are populated
                    let allEmpty = true
                    for (let g in groups[field as keyof typeof groups]) {
                        const thisField = groups[field as keyof typeof groups][g]
                        if (getVal(itm, thisField)) allEmpty = false
                    }

                    if (allEmpty) errorHandler.setError(field)
                    else errorHandler.setError(field, comboError)

                } else if (getVal(itm, field) && field !== "value" && !errorHandler.hasError(field))
                    errorHandler.setError(field, "") // flag the field with no message

            } else if (field.startsWith("shared") || !errorHandler.hasError(field) || errorHandler.hasSharedError(field))
                errorHandler.setError(field) // clear it if there's not another error
        }
    }

    const invalidMsg = (which: string) : string => {
        return errorHandler.fieldToTitle(which) + " is not valid."
    }

    const getVal = (itm: DateSubtype, which: string) : string | number | undefined => {
        return (itm as any)[which as any]
    }

    const setVal = (itm: DateSubtype, which: string, val: string | number | undefined = undefined) => {
        if (val === undefined) delete (itm as any)[which as any]
        else (itm as any)[which as any] = val
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

        options.SetItem(itm)
    }

    const onChangeDate = (value: string | null, which: string) => {
        const itm = {...item} as DateSubtype

        if (value) {
            const dateVal = dateFormat(dayjs(value))

            if (dateVal === "Invalid Date") {
                errorHandler.setError(which, invalidMsg(which))

            } else {
                setVal(itm, which, dateVal)
                errorHandler.setError(which)
            }

        } else {
            setVal(itm, which)
            errorHandler.setError(which)
        }

        handleCombo(itm)

        const newItm = getComputed(itm)
        options.SetItem(newItm)
    }

    const onChangeOffset = (event: ChangeEvent<HTMLInputElement>, which: string) => {
        const value = event.target.value || undefined
        const itm = {...item} as DateSubtype

        if (value || value === "0") {

            // integers only
            if (Number.isNaN(value)
                || value.startsWith("0")
                || value.indexOf(".") > -1
                || parseInt(value).toString().trim().length !== value.trim().length) {

                errorHandler.setError(which, invalidMsg(which))

            } else {
                setVal(itm, which, parseInt(value))
                errorHandler.setError(which)
            }

        } else {
            setVal(itm, which)
            errorHandler.setError(which)
        }

        handleCombo(itm)

        const newItm = getComputed(itm)
        options.SetItem(newItm)
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
                        error={errorHandler.hasError('value')}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={errorHandler.getError('value')} />
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
                        error={errorHandler.hasError('minDate')}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={errorHandler.getError('minDate')} />
            <ShowErrors errors={errorHandler.getError('sharedMin')} />
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
                        error={errorHandler.hasError('maxDate')}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={errorHandler.getError('maxDate')} />
            <ShowErrors errors={errorHandler.getError('sharedMax')} />
        </FormGroup>

        <FormHelperText sx={{marginTop: -1}}>
            Enter a positive or negative integer in any of the below fields.
            This will set the date limits relative to today.
            If both offsets and min/max dates are set, the narrowest range will apply.
        </FormHelperText>

        <FormGroup>
            <div>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Min Offset Days'
                            type="text"
                            defaultValue={item.minDateOffsetDays || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetDays')}
                            error={errorHandler.hasError('minDateOffsetDays')}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errorHandler.getError('minDateOffsetDays')} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Min Offset Months'
                            type="text"
                            defaultValue={item.minDateOffsetMonths || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetMonths')}
                            error={errorHandler.hasError('minDateOffsetMonths')}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errorHandler.getError('minDateOffsetMonths')} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Min Offset Years'
                            type="text"
                            defaultValue={item.minDateOffsetYears || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetYears')}
                            error={errorHandler.hasError('minDateOffsetYears')}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errorHandler.getError('minDateOffsetYears')} />
                    </Grid>
                </Grid>
                <ShowErrors errors={errorHandler.getError('sharedMinOffset')} />
            </div>
        </FormGroup>

        <FormGroup>
            <div>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Max Offset Days'
                            type="text"
                            defaultValue={item.maxDateOffsetDays || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetDays')}
                            error={errorHandler.hasError('maxDateOffsetDays')}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errorHandler.getError('maxDateOffsetDays')} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Max Offset Months'
                            type="text"
                            defaultValue={item.maxDateOffsetMonths || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetMonths')}
                            error={errorHandler.hasError('maxDateOffsetMonths')}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errorHandler.getError('maxDateOffsetMonths')} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Max Offset Years'
                            type="text"
                            defaultValue={item.maxDateOffsetYears || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetYears')}
                            error={errorHandler.hasError('maxDateOffsetYears')}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errorHandler.getError('maxDateOffsetYears')} />
                    </Grid>
                </Grid>
                <ShowErrors errors={errorHandler.getError('sharedMaxOffset')} />
            </div>
        </FormGroup>

        <FormHelperText sx={{marginTop: -1}}>
            Tip: To allow future dates only, enter the Min Offset Days as 1. For past only, enter the Max Offset Days as -1.
        </FormHelperText>
    </>
}

export default DateEdit