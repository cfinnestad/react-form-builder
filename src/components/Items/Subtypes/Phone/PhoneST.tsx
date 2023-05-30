import React, {useEffect, useState} from "react";
import {FieldProps, isPhone, PhoneSubtype} from "../../Items";
import MuiPhoneNumber from 'material-ui-phone-number';
import phoneValidate from "./PhoneValidate";
import {Box, FormHelperText, FormLabel} from "@mui/material";

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

    const onChange = (value: string) => {
        const itm = {...item}

        itm.value = !value ? undefined : value

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
        <Box component="div" sx={{ flexGrow: 1 }} marginTop={1.25} marginBottom={1}>
            <FormLabel sx={{marginLeft: "0.71em", marginTop: "-0.75em", zIndex: 2, paddingX: 0.5, backgroundColor: "#fff", position: "absolute", fontSize: "0.75em", fontWeight: 400, color: styles.phoneInput.color}}>
                {item.label} {item.required ? '*' : ''}
            </FormLabel>
            <Box sx = {{ paddingLeft: 2, paddingY: 1, borderRadius: 1, border: 1, borderColor: styles.phoneInput.borderColor, "&:hover": { borderColor: styles.phoneInput.borderColorHover }, color: styles.phoneInput.color }} >
                <MuiPhoneNumber
                    defaultCountry={'us'}
                    onChange={onChange}
                    disableCountryCode = 'true'
                    disableDropdown = 'true'
                    onlyCountries = {['us']}
                    placeholder = {item.placeholder ?? ''}
                    InputProps = {{ disableUnderline: true }}
                    required = {item.required ?? false}
                    error={item.errorText != null}
                />
            </Box>
        </Box>
        <FormHelperText sx = {{ paddingX: 2, color: styles.phoneInput.color, marginTop: -0.5, paddingLeft: 0}}>
            {<>{item.helperText ? <>{item.helperText}<br/></> : ''}{item.errorText}</>}
        </FormHelperText>
    </>
}

export default PhoneST
