import React, {ChangeEvent} from "react";
import {FormGroup, TextField} from "@mui/material";
import ShowErrors from "../ShowErrors";
import {EmailProps} from "../../Items";

const EmailEdit = ({item, options, errorHandler}: EmailProps) => {

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)
        if (value !== undefined) {
            if (value < 1) {
                errorHandler.setError('maxLength', 'Max Length must be greater than 0')
                return
            }
        }

        options.SetItem({...item, maxLength: value})
        errorHandler.setError('maxLength')
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item}

        if (value) {
            if (item.maxLength !== undefined && value.length > item.maxLength ) {
                errorHandler.setError('value', `${item.label} cannot exceed ${item.maxLength} characters`)
                return
            }
            itm.value = value
        } else {
            delete itm.value
        }
        options.SetItem(itm)
        errorHandler.setError('value')
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
            <TextField
                size='small'
                fullWidth={true}
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

export default EmailEdit