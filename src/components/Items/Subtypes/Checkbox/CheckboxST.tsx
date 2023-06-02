import React, {useEffect, useState} from "react";
import {CheckboxSubtype, FieldProps, isCheckbox, isField} from "../../Items";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Stack
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

    return (
        <Stack spacing={2}>
            <div>{item.label} {item.required && <span>*</span>}</div>
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
            <FormHelperText error={item.errorText !== undefined}>
                {(item.helperText !== undefined) ? <>{item.helperText}<br/></> : ''}
                {item.errorText}
            </FormHelperText>
        </Stack>
    )
}

export default CheckboxST
