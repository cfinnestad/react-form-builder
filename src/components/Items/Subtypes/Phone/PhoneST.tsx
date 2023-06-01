import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldProps, isPhone, PhoneSubtype} from "../../Items";
import MuiPhoneNumber from 'mui-phone-number';
import phoneValidate from "./PhoneValidate";
import {Box, FormHelperText, FormLabel, Stack} from "@mui/material";

const PhoneST = (fieldProps: FieldProps ) => {
    if (!isPhone(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as PhoneSubtype)

    useEffect(()=>{
        if (!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    },[item])

    const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const itm = {...item}
        
        itm.value = (typeof e === 'string') ? e.toString() : e.target.value

        if(item.value === undefined) {
            delete item.value
        }
        phoneValidate(itm, fieldProps.options)
        
        setItem(itm)
    }

    const styles = {
        phoneInput: {
            color: (item.errorText != null ? "red !important" : ""),
            borderColor: (item.errorText != null ? "red" : "grey.500"),
            borderColorHover: (item.errorText != null ? "" : 'text.primary')
        },
    };

    return <>
        <Stack spacing={2}>
            <div>{item.label} {item.required && <span>*</span>}</div>
            <Box sx = {{ paddingLeft: 2, paddingY: 1, borderRadius: 1, border: 1, borderColor: styles.phoneInput.borderColor, "&:hover": { borderColor: styles.phoneInput.borderColorHover }, color: styles.phoneInput.color }} >
                <MuiPhoneNumber
                    defaultCountry={'us'}
                    onChange={onChange}
                    disableCountryCode = {true}
                    disableDropdown = {true}
                    onlyCountries = {['us']}
                    placeholder = {item.placeholder ?? ''}
                    InputProps = {{ disableUnderline: true }}
                    required = {item.required ?? false}
                    error={item.errorText != null}
                />
            </Box>
            <FormHelperText sx = {{ paddingX: 2, color: styles.phoneInput.color, marginTop: -0.5, paddingLeft: 0}}>
                {<>{item.helperText ? <>{item.helperText}<br/></> : ''}{item.errorText}</>}
            </FormHelperText>
        </Stack>
    </>
}

export default PhoneST
