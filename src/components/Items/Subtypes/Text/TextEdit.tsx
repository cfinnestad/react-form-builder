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

    const checkMinRows = (item: TextSubtype) => {
        if (item.minRows !== undefined) {
            if (item.minRows < 0) {
                errorHandler.setError('minRows', 'Min Rows must be a positive number')
            } else if (item.maxRows && (item.minRows > item.maxRows)) {
                errorHandler.setError('minRows', 'Min Rows must not be greater than Max Rows')
            } else {
                errorHandler.setError('minRows')
            }
        } else {
            errorHandler.setError('minRows')
        }
    }

    const checkMaxRows = (item: TextSubtype) => {
        if (item.maxRows !== undefined) {
            if (item.maxRows < 1) {
                errorHandler.setError('maxRows', 'Max Rows must be greater the 0')
            } else if (item.minRows && (item.maxRows < (item.minRows || 0))) {
                errorHandler.setError('maxRows', 'Max Rows must not be less than Min Rows')
            } else {
                errorHandler.setError('maxRows')
            }
        } else {
            errorHandler.setError('maxRows')
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
        checkMinRows(item)
        checkMaxRows(item)
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

    const onClickMultiline = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const itm = {...item}
        if (value === undefined) {
            delete itm.multiline
            delete itm.minRows
            delete itm.maxRows
        } else {
            itm.multiline = true
        }
        options.SetItem(itm)
    }

    const onChangeMinRows = (event: ChangeEvent<HTMLInputElement>) => {
        const min = event.target.value === '' ? undefined : parseInt(event.target.value)
        const itm = {...item, minRows: min}

        validate(itm)

        if (!itm.minRows) {
            delete itm.minRows
        }

        options.SetItem(itm)
    }

    const onChangeMaxRows = (event: ChangeEvent<HTMLInputElement>) => {
        const max = event.target.value === '' ? undefined : parseInt(event.target.value)
        const itm = {...item, maxRows: max}

        validate(itm)

        if (!itm.maxRows) {
            delete itm.maxRows
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
                multiline={item.multiline}
                minRows={item.minRows}
                maxRows={item.maxRows}
                error={errorHandler.hasError('value')}
                defaultValue={item.value}
                onChange={onChangeValue}
            />
            <ShowErrors errors={errorHandler.getError('value')}/>
        </FormGroup>

        <FormGroup>
            <FormControlLabel
                control={<Checkbox defaultChecked={item.multiline || false} onChange={onClickMultiline}/>}
                label="Multiline"
            />
            <FormHelperText sx={{marginTop: -1}}>Allow newlines in value.</FormHelperText>
        </FormGroup>

        {
            item.multiline ?
                <>
                    <FormGroup>
                        <TextField
                            size='small'
                            label="Min Rows"
                            type="number"
                            error={errorHandler.hasError('minRows')}
                            value={item.minRows}
                            onChange={onChangeMinRows}
                            helperText={'Minimum number of rows to show'}

                            />
                        <ShowErrors errors={errorHandler.getError('minRows')}/>
                    </FormGroup>

                    <FormGroup>
                        <TextField
                            size='small'
                            label="Max Rows"
                            type="number"
                            error={errorHandler.hasError('maxRows')}
                            value={item.maxRows}
                            onChange={onChangeMaxRows}
                            helperText={'Maximum number of rows to show before scrolling'}
                        />
                        <ShowErrors errors={errorHandler.getError('maxRows')}/>
                    </FormGroup>
                </> : undefined
        }

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