import React, {ChangeEvent, useState} from "react";
import {TextProps} from "../../Items";
import {TextField, Checkbox, FormGroup, FormControlLabel, FormHelperText} from "@mui/material";
import ShowErrors from "../ShowErrors";

export const TextEdit = ({item, items, options}: TextProps ) => {
    const [valueError, setValueError] = useState<string | undefined>(undefined)
    const [minLengthError, setMinLengthError] = useState<string | undefined>(undefined)
    const [maxLengthError, setMaxLengthError] = useState<string | undefined>(undefined)

    const onChangeMinLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)

        if (value !== undefined) {
            if (value < 0) {
                setMinLengthError('minLength must be a positive number')
                return
            }
            if (item.maxLength && (value > item.maxLength)) {
                setMinLengthError('Min Length must not be greater than Max Length')
                return
            }
        }

        options.SetItem({ ...item, minLength: value })
        setMinLengthError(undefined)
    }

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)

        if (value !== undefined) {
            if (value < 1) {
                setMaxLengthError('Max Length must be greater the 0')
                return
            }
            if (item.minLength && (value < item.minLength)) {
                setMaxLengthError('Max Length must not be less than Min Length')
                return
            }
        }

        options.SetItem({ ...item, maxLength: value })
        setMaxLengthError(undefined)
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item}

        if (value) {
            if (item.minLength !== undefined && value.length < (item.minLength || 0)) {
                setValueError(item.label + ' must be at least ' + item.minLength + ' characters long')
                return
            }
            if (item.maxLength !== undefined && value.length > (item.maxLength || 0)) {
                setValueError(item.label + ' cannot exceed ' + item.maxLength + ' characters')
                return
            }
            itm.value = value
        } else {
            delete itm.value
        }

        options.SetItem(itm)
        setValueError(undefined)
    }

    const onClickMultiline = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const itm = {...item}
        if (value === undefined) {
            delete itm.multiline
        } else {
            itm.multiline = true
        }
        options.SetItem(itm)
    }

    return <>
        <FormGroup>
            <TextField
                size='small'
                fullWidth={true}
                label='Value'
                type="text"
                error={valueError !== undefined}
                defaultValue={item.value}
                onChange={onChangeValue}
            />
            <ShowErrors errors={valueError ? [valueError] : []}/>
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
                label='Min Length'
                type="number"
                error={minLengthError !== undefined}
                defaultValue={item.minLength}
                onChange={onChangeMinLength}
            />
            <ShowErrors errors={minLengthError ? [minLengthError] : []}/>
        </FormGroup>

        <FormGroup>
            <TextField
                size='small'
                label='Max Length'
                type="number"
                error={maxLengthError !== undefined}
                defaultValue={item.maxLength}
                onChange={onChangeMaxLength}
            />
            <ShowErrors errors={maxLengthError ? [maxLengthError] : []}/>
        </FormGroup>
    </>

}

export default TextEdit