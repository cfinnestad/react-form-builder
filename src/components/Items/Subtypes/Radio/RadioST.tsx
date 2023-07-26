import React from "react";
import {
    RadioProps,
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

const RadioST = ({item, options}: RadioProps ) => {

    function onChange(index: number){
        const itm = {...item} as RadioSubtype
        const curVal = itm.options[index].selected
        itm.options.map((option, index) => {
            itm.options[index].selected = false;
        })

        itm.options[index].selected = itm.required ? true : !curVal

        RadioValidate(itm, options)

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
                role="label"
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
                                data-testid={`radio-button-${index + 1}`}
                            />
                        }
                        label={option.label}
                        key={option.label}
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
