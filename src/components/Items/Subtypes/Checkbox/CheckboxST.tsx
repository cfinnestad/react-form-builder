import React, {useEffect, useState} from "react";
import {CheckboxSubtype, FieldProps, isCheckbox, isField} from "../../Items";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel, Stack
} from "@mui/material";
import {CheckboxValidate} from "./index";

const CheckboxST = ({item, options}: FieldProps ) => {

    if (!isField(item) || !isCheckbox(item) ) {
        return <></>
    }


    function onChange(index: number){
        const itm = {...item} as CheckboxSubtype;
        itm.options[index].selected = !itm.options[index].selected;
        itm.value = itm.options.filter(i => {return i.selected ?? false}).map(i => {return i.value ?? i.label});
        if (itm.value?.length === 0) {
            itm.value = undefined
            delete itm.value
        }
        CheckboxValidate(itm, options)

        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack>
            <InputLabel
                required={item.required ?? false}
                error={item.errorText != null}
                sx={{marginBottom: -1}}
            >
                {item.label}
            </InputLabel>
            <FormGroup row={item.inLine}>
                {item.options.map((option,index) =>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={option.selected ?? false}
                                onChange={() => onChange(index)}
                            />
                        }
                        label={option.label}
                    />
                )}
            </FormGroup>
            <FormHelperText
                sx={{marginTop: -1}}
                error={item.errorText !== undefined}
            >
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </Stack>
    </>
}

export default CheckboxST
