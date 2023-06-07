import React, {ChangeEvent} from "react";
import {FieldProps, isPhone, PhoneSubtype} from "../../Items";
import MuiPhoneNumber from 'mui-phone-number';
import phoneValidate from "./PhoneValidate";
import {Box, FormHelperText, InputLabel, Stack} from "@mui/material";

const PhoneST = ({item, options}: FieldProps ) => {
    if (!isPhone(item) ) {
        return <></>
    }

    const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const itm = {...item} as PhoneSubtype
        
        itm.value = (typeof e === 'string') ? e.toString() : e.target.value

        if(item.value === undefined) {
            delete item.value
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
                error={item.errorText != null}
            >
                {item.label}
            </InputLabel>
            <Box
                sx = {{
                    paddingLeft: 2,
                    height: '3rem',
                    // paddingY: 1,
                    borderRadius: 1,
                    border: 1,
                    borderColor: item.errorText != null ? 'error.main' : '#c4c4c4',
                    bgcolor: item.errorText != null ? 'error.light' : undefined,
                    "&:hover": {
                        borderColor: 'text.primary',
                        bgcolor: 'primary.light'
                    },
                    "&:focus-within": {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.light',
                        borderWidth: '2px'
                    }
                }}
            >
                <MuiPhoneNumber
                    defaultCountry={'us'}
                    onChange={onChange}
                    disableCountryCode = {true}
                    disableDropdown = {true}
                    onlyCountries = {['us']}
                    placeholder = {item.placeholder ?? ''}
                    InputProps = {{ disableUnderline: true }}
                    error={item.errorText != null}
                />
            </Box>
            <FormHelperText
                sx = {{
                    paddingX: 2,
                    color: item.errorText != null ? 'error.main' : undefined,
                    marginTop: -0.5,
                    paddingLeft: 0
                }}>
                {<>{item.helperText ? <>{item.helperText}<br/></> : ''}{item.errorText}</>}
            </FormHelperText>
        </Stack>
    </>
}

export default PhoneST
