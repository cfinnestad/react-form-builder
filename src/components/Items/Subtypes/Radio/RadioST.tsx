import React, {useEffect, useState} from "react";
import {
    FieldProps,
    isField,
    isRadio,
    RadioSubtype
} from "../../Items";
import {
    FormControlLabel,
    FormHelperText,
    InputLabel,
    Radio,
    RadioGroup, Stack
} from "@mui/material";
import {RadioValidate} from "./index";

const RadioST = (fieldProps: FieldProps ) => {

    if (!isField(fieldProps.item) || !isRadio(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as RadioSubtype)

    const itm = {...item};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    }, [item])

    function onChange(index: number){
        const curVal = itm.options[index].selected
        itm.options.map((option, index) => {
            itm.options[index].selected = false;
        })

        itm.options[index].selected = itm.required ? true : !curVal

        const value = itm.options.filter(i => {return i.selected ?? false}).map(i => {return i.value ?? i.label});
        if (value.length === 0) {
            itm.value = undefined
            delete itm.value
        } else {
            itm.value = value[0]
        }

        RadioValidate(itm, fieldProps.options)

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
            <RadioGroup row={item.inLine}>
                {item.options.map((option,index) =>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={option.selected ?? false}
                                onClick={() => onChange(index)}
                            />
                        }
                        label={option.label}
                    />
                )}
            </RadioGroup>
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

export default RadioST
