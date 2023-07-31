import React, {ChangeEvent, useState} from "react";
import {FormGroup, TextField} from "@mui/material";
import ShowErrors from "../ShowErrors";
import {EmailProps} from "../../Items";

const EmailEdit = ({item, options}: EmailProps) => {
    const [valueError, setValueError] = useState( false)
    const [valueErrors, setValueErrors] = useState( [] as string[])
    const [maxLengthError, setMaxLengthError] = useState( false)
    const [maxLengthErrors, setMaxLengthErrors] = useState( [] as string[])

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)
        if (value !== undefined) {
            if (value < 1) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must be greater the 0'])
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
            <TextField
                size='small'
                fullWidth={true}
                label='Max Length'
                type="number"
                error={maxLengthError}
                defaultValue={item.maxLength}
                onChange={onChangeMaxLength}
            />
            <ShowErrors errors={maxLengthErrors}/>
        </FormGroup>
    </>
}

export default EmailEdit