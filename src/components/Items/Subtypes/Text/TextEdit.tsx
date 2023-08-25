import React, {ChangeEvent} from "react";
import {TextProps, TextSubtype} from "../../Items";
import {TextField, Checkbox, FormGroup, FormControlLabel, FormHelperText} from "@mui/material";
import ShowErrors from "../ShowErrors";

export const TextEdit = ({item, options, errorHandler}: TextProps ) => {

    const checkMin = (item: TextSubtype) => {
        if (item.minLength !== undefined) {
            if (item.minLength < 0) {
                errorHandler.setError('minLength', 'Min Length must be a positive number')
            } else if (item.maxLength && (item.minLength > item.maxLength)) {
                errorHandler.setError('minLength', 'Min Length must not be greater than Max Length')
            } else {
                errorHandler.setError('minLength')
            }
        } else {
            errorHandler.setError('minLength')
        }
    }
    const checkMax = (item: TextSubtype) => {
        if (item.maxLength !== undefined) {
            if (item.maxLength < 1) {
                errorHandler.setError('maxLength', 'Max Length must be greater the 0')
            } else if (item.minLength && (item.maxLength < (item.minLength || 0))) {
                errorHandler.setError('maxLength', 'Max Length must not be less than Min Length')
            } else {
                errorHandler.setError('maxLength')
            }
        } else {
            errorHandler.setError('maxLength')
        }

    }
    const checkValue = (item: TextSubtype) => {
        if (item.value) {
            if (item.minLength !== undefined && item.value.length < (item.minLength || 0)) {
                errorHandler.setError('value', `${item.label} must be at least ${item.minLength} characters long`)
            } else if (item.maxLength !== undefined && item.value.length > (item.maxLength || 0)) {
                errorHandler.setError('value', `${item.label} cannot exceed ${item.maxLength} characters`)
            } else {
                errorHandler.setError('value')
            }
        } else {
            errorHandler.setError('value')
        }
    }
    const validate = (item: TextSubtype) => {
        checkMin(item)
        checkMax(item)
        checkValue(item)
    }

    const onChangeMinLength = (event: ChangeEvent<HTMLInputElement>) => {
        const min = event.target.value === '' ? undefined : parseInt(event.target.value)
        const itm = {...item, minLength: min}

        validate(itm)

        if (!itm.minLength) {
            delete itm.minLength
        }

        options.SetItem(itm)
    }

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const max = event.target.value === '' ? undefined : parseInt(event.target.value)
        const itm = {...item, maxLength: max}

        validate(itm)

        if (!itm.maxLength) {
            delete itm.maxLength
        }

        options.SetItem(itm)
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item, value: value}

        checkValue(itm)

        if (!value) {
            delete itm.value
        }

        options.SetItem(itm)
    }

    const onClickEditable = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const itm = {...item}
        if (value === undefined) {
            delete itm.editable
        } else {
            itm.editable = true
        }
        options.SetItem(itm)
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
                error={errorHandler.hasError('value')}
                defaultValue={item.value}
                onChange={onChangeValue}
            />
            <ShowErrors errors={errorHandler.getError('value')}/>
        </FormGroup>

        <FormGroup>
            <FormControlLabel
                control={<Checkbox defaultChecked={item.editable || false} onChange={onClickEditable}/>}
                label="Editable"
            />
            <FormHelperText sx={{marginTop: -1}}>Enable editing in backend.</FormHelperText>
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
                error={errorHandler.hasError('minLength')}
                defaultValue={item.minLength}
                onChange={onChangeMinLength}
            />
            <ShowErrors errors={errorHandler.getError('minLength')}/>
        </FormGroup>

        <FormGroup>
            <TextField
                size='small'
                label='Max Length'
                type="number"
                error={errorHandler.hasError('maxLength')}
                defaultValue={item.maxLength}
                onChange={onChangeMaxLength}
            />
            <ShowErrors errors={errorHandler.getError('maxLength')}/>
        </FormGroup>
    </>

}

export default TextEdit