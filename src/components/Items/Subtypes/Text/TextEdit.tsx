import React, {ChangeEvent, useState} from "react";
import {FieldProps, isText} from "../../Items";
import {TextField, Checkbox, FormGroup, FormControlLabel} from "@mui/material";
import ShowErrors from "../ShowErrors";

export const TextEdit = ({item, options}: FieldProps ) => {
    if (!isText(item)){
        return <></>
    }

    const [valueError, setValueError] = useState( false)
    const [valueErrors, setValueErrors] = useState( [] as string[])
    const [minLengthError, setMinLengthError] = useState( false)
    const [minLengthErrors, setMinLengthErrors] = useState( [] as string[])
    const [maxLengthError, setMaxLengthError] = useState( false)
    const [maxLengthErrors, setMaxLengthErrors] = useState( [] as string[])

    const onChangeMinLength = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value === '' ? undefined : parseInt(event.target.value)

        if (value !== undefined) {
            if (value < 0) {
                setMinLengthError(true)
                setMaxLengthErrors(['minLength must be a positive number'])
                return false
            }
            if (item.maxLength && (value > item.maxLength)) {
                setMinLengthError(true)
                setMaxLengthErrors(['Min Length must not be greater than Max Length'])
                return false
            }
        }
        setMinLengthError(false)
        setMinLengthErrors([]);
        item.minLength = value
        options.SetItem(item)
    }

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)
        if (value !== undefined) {
            if (value < 1) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must be greater the 0'])
                return false
            }
            if (item.minLength && (value < item.minLength)) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must not be less than Min Length '])
                return false
            }
        }
        setMaxLengthError(false);
        setMaxLengthErrors([]);
        item.maxLength = value
        options.SetItem(item)
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const st = {...item}
        if (value) {
            if (value.length < (item.minLength || 0)) {
                setValueError(true)
                setValueErrors([item.label + ' must be at least ' + item.minLength + 'charters long'])
                return
            }
            if (value.length > (item.maxLength || 0)) {
                setValueError(true)
                setValueErrors([item.label + ' cannot exceed ' + item.minLength + 'charters'])
                return
            }
            st.value = value
        } else {
            delete st.value
        }
        options.SetItem(st)
    }

    const onClickMultiline = () => {
        const st = {...item}
        if (item.multiline !== undefined) {
            delete st.multiline
        } else {
            st.multiline = true
        }
        options.SetItem(st)

    }

    return <>
        <TextField
            size='small'
            fullWidth={true}
            label='Value'
            type="text"
            error={valueError}
            value={item.value}
            onChange={onChangeValue}
        />
        <ShowErrors errors={valueErrors}/>
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={item.multiline || false} onClick={onClickMultiline}/>} label="Multiline" labelPlacement="start"/>
        </FormGroup>
        <TextField
            size='small'
            fullWidth={true}
            label='Min Length'
            type="number"
            inputProps={{"min": (item.maxLength || 0)}}
            error={minLengthError}
            value={item.minLength}
            onChange={onChangeMinLength}
        />
        <ShowErrors errors={minLengthErrors}/>
        <TextField
            size='small'
            fullWidth={true}
            label='Max Length'
            type="number"
            inputProps={{"min": (item.minLength || 1)}}
            error={maxLengthError}
            value={item.maxLength}
            onChange={onChangeMaxLength}
        />
        <ShowErrors errors={maxLengthErrors}/>
    </>

}

export default TextEdit