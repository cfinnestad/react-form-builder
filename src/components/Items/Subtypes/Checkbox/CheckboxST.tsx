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

const CheckboxST = (fieldProps: FieldProps ) => {

    if (!isField(fieldProps.item) || !isCheckbox(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as CheckboxSubtype)

    const itm = {...item};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    }, [item])

    function onChange(index: number){
        itm.options[index].selected = !itm.options[index].selected;
        itm.value = itm.options.filter(i => {return i.selected ?? false}).map(i => {return i.value ?? i.label});
        if (itm.value?.length === 0) {
            itm.value = undefined
            delete itm.value
        }
        CheckboxValidate(itm, fieldProps.options)
        setItem(itm);
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
