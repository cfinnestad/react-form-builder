import React, {ChangeEvent} from "react";
import {PhoneProps} from "../../Items";
import {FormGroup, FormHelperText, TextField} from "@mui/material";
import ShowErrors from "../ShowErrors";
import MuiPhoneNumber from "mui-phone-number";

export const PhoneEdit = ({item, options, errorHandler}: PhoneProps) => {

    const onChangeValue = (e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = ((typeof e === 'string') ? e.toString() : e.target.value) || undefined
        const itm = {...item}

        if (value) {
            const length = item.placeholder?.length || 14
            if (value.length !== length) {
                errorHandler.setError('value', `${item.label} must be ${length.toString()} characters`)
                return
            }
            itm.value = value
        } else {
            delete itm.value
        }
        errorHandler.setError('value')
        options.SetItem(itm)
    }

    const onChangePlaceholder = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item}

        if (value) {
            itm.value = value
        } else {
            delete itm.value
        }
        options.SetItem(itm)
    }

    return <>
        <FormGroup>
            <MuiPhoneNumber
                label='Value'
                defaultCountry={'us'}
                size='small'
                variant='outlined'
                value={item.value}
                onChange={onChangeValue}
                disableCountryCode = {true}
                disableDropdown = {true}
                onlyCountries = {['us']}
                placeholder = {item.placeholder ?? ''}
                InputProps = {{ id: item.id }}
                error={errorHandler.hasError('value')}
            />
            <FormHelperText
                sx = {{
                    paddingX: 2,
                    color: errorHandler.hasError('value') ? 'error.main' : undefined,
                    marginTop: -0.5,
                    paddingLeft: 0
                }}>
                <ShowErrors errors={errorHandler.getError('value')}/>
            </FormHelperText>
        </FormGroup>
        <FormGroup>
            <TextField
                size='small'
                fullWidth={true}
                label='Placeholder'
                type="text"
                defaultValue={item.placeholder}
                onChange={onChangePlaceholder}
            />
        </FormGroup>
    </>
}
export default PhoneEdit