import React, {ChangeEvent, useState} from "react";
import {DateProps, DateSubtype} from "../../Items";
import {dateCmp, dateFormat, defaultFormat, getComputed} from "./index";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, TextField} from "@mui/material";
import ShowErrors from "../ShowErrors";
import dayjs from 'dayjs'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export const DateEdit = ({item, options}: DateProps ) => {
    if (!item.dateFormat) item.dateFormat = defaultFormat

    // declare master error object
    let errors = {}

    // populate errors by field with default state and function pointers
    const errorSetup = (errors: object, fields: string[]) => {
        for (let f in fields) {
            let which = fields[f]

            errors[which] = {}

            let [boolVal, boolFunc] = useState(false)
            errors[which]["status"] = boolVal
            errors[which]["setStatus"] = boolFunc

            let [strVal, strFunc] = useState([] as string[])
            errors[which]["message"] = strVal
            errors[which]["setMessage"] = strFunc

            //console.log("setup", which, JSON.stringify(errors[which]))
        }
    }

    // assign incoming data to master error store
    const errorHandler = (errors: object, which: string, msg: string | null = null) => {
        errors[which]["status"] = (msg !== null)
        errors[which]["setStatus"](errors[which]["status"])

        errors[which]["message"] = (msg) ? [msg] : []
        errors[which]["setMessage"](errors[which]["message"])

        //console.log("handle", which, JSON.stringify(errors[which]))
    }

    // initialize errors from corresponding fields
    errorSetup(errors, [
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
    ])

    // associate fields with their shared error groups
    const groups = {
        "sharedMin": ["minDate"],
        "sharedMax": ["maxDate"],
        "sharedMinOffset": ["minDateOffsetDays", "minDateOffsetMonths", "minDateOffsetYears"],
        "sharedMaxOffset": ["maxDateOffsetDays", "maxDateOffsetMonths", "maxDateOffsetYears"]
    }

    // deal with errors caused by multiple incompatible field values
    const handleCombo = (itm: DateSubtype, groups: object) => {
        const calcItm = getComputed(itm)

        const comboError = 'This combination of settings excludes all dates.'

        // use a computed item to see if the possible date range would be empty
        const badRange = (calcItm.minDateComputed && calcItm.maxDateComputed
            && dateCmp(calcItm.minDateComputed, calcItm.maxDateComputed, "isAfter"))

        // loop through fields and toggle errors for populated and shared
        for (let field in errors) {
            if (badRange) {

                // set shared error if applicable
                if (field.startsWith("shared")) {

                    // toggle it based on which fields are populated
                    let allEmpty = true
                    for (let f in groups[field]) {
                        if (itm[groups[field][f]]) allEmpty = false
                    }
                    if (allEmpty) errorHandler(errors, field)
                    else errorHandler(errors, field, comboError)

                } else if (itm[field] && errors[field]["message"].length === 0)
                    errorHandler(errors, field, "") // flag the field with no message

            } else if (field.startsWith("shared") || errors[field]["message"].length === 0)
                errorHandler(errors, field) // clear it if there's not another error
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

        options.SetItem(itm)
    }

    const onChangeDate = (value: string | null, which: string) => {
        const itm = {...item}

        if (value) {
            itm[which] = dateFormat(dayjs(value))

            if (itm[which] === "Invalid Date") {
                errorHandler(errors, which, which + " is not valid.")
            } else {
                errorHandler(errors, which)
            }

        } else {
            delete itm[which]
            errorHandler(errors, which)
        }

        // if it's not a specific field error, check the computed dates
        if (which !== "value") handleCombo(itm, groups)

        const newItm = getComputed(itm)
        options.SetItem(newItm)
    }

    const onChangeOffset = (event: ChangeEvent<HTMLInputElement>, which: string) => {
        const value = event.target.value || undefined
        const itm = {...item}

        if (value || value === "0") {

            // integers only
            if (Number.isNaN(value)
                || value.startsWith("0")
                || value.indexOf(".") > -1
                || parseInt(value).toString().length !== value.length) {

                errorHandler(errors, which, which + " is not valid.")

            } else {
                itm[which] = parseInt(value)
                errorHandler(errors, which)
            }

        } else {
            delete itm[which]
            errorHandler(errors, which)
        }

        // if it's not a specific field error, check the computed dates
        handleCombo(itm, groups)

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
                        error={errors['value']['status']}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={errors['value']['message']} />
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
                        error={errors['minDate']['status']}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={errors['minDate']['message']} />
            <ShowErrors errors={errors['sharedMin']['message']} />
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
                        error={errors['maxDate']['status']}
                        size='small'
                        type='text' />}
                />
            </LocalizationProvider>
            <ShowErrors errors={errors['maxDate']['message']} />
            <ShowErrors errors={errors['sharedMax']['message']} />
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
                            error={errors['minDateOffsetDays']['status']}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errors['minDateOffsetDays']['message']} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Min Offset Months'
                            type="text"
                            defaultValue={item.minDateOffsetMonths || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetMonths')}
                            error={errors['minDateOffsetMonths']['status']}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errors['minDateOffsetMonths']['message']} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Min Offset Years'
                            type="text"
                            defaultValue={item.minDateOffsetYears || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'minDateOffsetYears')}
                            error={errors['minDateOffsetYears']['status']}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errors['minDateOffsetYears']['message']} />
                    </Grid>
                </Grid>
                <ShowErrors errors={errors['sharedMinOffset']['message']} />
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
                            error={errors['maxDateOffsetDays']['status']}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errors['maxDateOffsetDays']['message']} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Max Offset Months'
                            type="text"
                            defaultValue={item.maxDateOffsetMonths || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetMonths')}
                            error={errors['maxDateOffsetMonths']['status']}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errors['maxDateOffsetMonths']['message']} />
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField
                            size='small'
                            fullWidth={true}
                            label='Max Offset Years'
                            type="text"
                            defaultValue={item.maxDateOffsetYears || undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOffset(e, 'maxDateOffsetYears')}
                            error={errors['maxDateOffsetYears']['status']}
                            sx={{marginRight: "10px"}}
                        />
                        <ShowErrors errors={errors['maxDateOffsetYears']['message']} />
                    </Grid>
                </Grid>
                <ShowErrors errors={errors['sharedMaxOffset']['message']} />
            </div>
        </FormGroup>

        <FormHelperText sx={{marginTop: -1}}>
            Tip: To allow future dates only, enter the Min Offset Days as 1. For past only, enter the Max Offset Days as -1.
        </FormHelperText>
    </>
}

export default DateEdit