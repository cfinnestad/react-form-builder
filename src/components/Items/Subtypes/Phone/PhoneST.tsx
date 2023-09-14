import React, {ChangeEvent} from "react";
import {PhoneProps, PhoneSubtype} from "../../Items";
import MuiPhoneNumber from 'mui-phone-number';
import phoneValidate from "./PhoneValidate";
import {FormHelperText, InputLabel, Stack} from "@mui/material";

const PhoneST = ({item, options}: PhoneProps ) => {
    const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const itm = {...item} as PhoneSubtype
        
        itm.value = (typeof e === 'string') ? e.toString() : e.target.value
console.log('phone', itm.value)
        if(itm.value === undefined || itm.value === '') {
            delete itm.value
        }
        phoneValidate(itm, options)

        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={.5}>
            <InputLabel
                required = {item.required ?? false}
                error={item.errorText !== undefined}
            >
                {item.label}
            </InputLabel>
            <MuiPhoneNumber
                defaultCountry={'us'}
                onChange={onChange}
                variant='outlined'
                disableCountryCode = {true}
                disableDropdown = {true}
                onlyCountries = {['us']}
                placeholder = {item.placeholder ?? ''}
                InputProps = {{ id: item.id }}
                error={item.errorText !== undefined}
                value={item.value}
            />
            <FormHelperText
                sx = {{
                    paddingX: 2,
                    color: item.errorText !== undefined ? 'error.main' : undefined,
                    marginTop: -0.5,
                    paddingLeft: 0
                }}>
                {<>{item.helperText ? <>{item.helperText}<br/></> : ''}{item.errorText}</>}
            </FormHelperText>
        </Stack>
    </>
}

export default PhoneST
