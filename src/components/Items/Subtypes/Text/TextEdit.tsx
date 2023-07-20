import React, {ChangeEvent, useState} from "react";
import {FieldProps, isText} from "../../Items";
import {TextField, Checkbox, FormGroup, FormControlLabel, FormHelperText} from "@mui/material";
import ShowErrors from "../ShowErrors";

export const TextEdit = ({item, items, options}: FieldProps ) => {
    if (!isText(item)){
        return <></>
    }

    const [valueError, setValueError] = useState( false)
    const [valueErrors, setValueErrors] = useState( [] as string[])
    const [minLengthError, setMinLengthError] = useState({error: false})
    const [minLengthErrors, setMinLengthErrors] = useState( [] as string[])
    const [maxLengthError, setMaxLengthError] = useState( false)
    const [maxLengthErrors, setMaxLengthErrors] = useState( [] as string[])

    const onChangeMinLength = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value === '' ? undefined : parseInt(event.target.value)
        if (value !== undefined) {
            if (value < 0) {
                setMinLengthError({error: true})
                setMinLengthErrors(['minLength must be a positive number'])
                return
            }
            if (item.maxLength && (value > item.maxLength)) {
                setMinLengthError({error: true})
                setMinLengthErrors(['Min Length must not be greater than Max Length'])
                return
            }
        }

        options.SetItem({...item, minLength: value})
        setMinLengthError({error: false})
        setMinLengthErrors([]);
    }

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)
        if (value !== undefined) {
            if (value < 1) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must be greater the 0'])
                return
            }
            if (item.minLength && (value < item.minLength)) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must not be less than Min Length '])
                return
            }
        }

        options.SetItem({...item, maxLength: value})
        setMaxLengthError(false);
        setMaxLengthErrors([]);
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item}

        if (value) {
            if (item.minLength !== undefined && value.length < (item.minLength || 0)) {
                setValueError(true)
                setValueErrors([item.label + ' must be at least ' + item.minLength + ' charters long'])
                return
            }
            if (item.maxLength !== undefined && value.length > (item.maxLength || 0)) {
                setValueError(true)
                setValueErrors([item.label + ' cannot exceed ' + item.maxLength + ' charters'])
                return
            }
            itm.value = value
        } else {
            delete itm.value
        }
        setValueError(false)
        setValueErrors([])
        options.SetItem(itm)
    }

    const onClickMultiline = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const st = {...item}
        if (value === undefined) {
            delete st.multiline
        } else {
            st.multiline = true
        }
        options.SetItem(st)
    }

    return <>
        <FormGroup>
            <TextField
                size='small'
                fullWidth={true}
                label='Value'
                type="text"
                error={valueError}
                defaultValue={item.value}
                onChange={onChangeValue}
            />
            <ShowErrors errors={valueErrors}/>
        </FormGroup>

        <FormGroup>
            <FormControlLabel
                control={<Checkbox defaultChecked={item.multiline || false} onChange={onClickMultiline}/>}
                label="Multiline"
            />
            <FormHelperText sx={{marginTop: -1}}>Allow newlines in value.</FormHelperText>
        </FormGroup>

        <FormGroup>
            <TextField
                size='small'
                fullWidth={true}
                label='Min Length'
                type="number"
                inputProps={{"min": (item.maxLength || 0)}}
                error={minLengthError.error}
                defaultValue={item.minLength}
                onChange={onChangeMinLength}
            />
            <ShowErrors errors={minLengthErrors}/>
        </FormGroup>

        <FormGroup>
            <TextField
                size='small'
                fullWidth={true}
                label='Max Length'
                type="number"
                inputProps={{"min": (item.minLength || 1)}}
                error={maxLengthError}
                defaultValue={item.maxLength}
                onChange={onChangeMaxLength}
            />
            <ShowErrors errors={maxLengthErrors}/>
        </FormGroup>
    </>

}

export default TextEdit