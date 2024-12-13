import React from "react";
import {
    itemCloneDeep,
    RadioProps, RadioSubtype
} from "../../Items";
import {
    FormControlLabel,
    FormHelperText,
    InputLabel,
    Radio,
    RadioGroup, Stack
} from "@mui/material";
import {RadioValidate} from "./index";
import {cloneDeep} from "lodash";

const RadioST = ({item, options}: RadioProps ) => {

    function onChange(index: number){
        const itm = itemCloneDeep(item) as RadioSubtype
        const curVal = itm.options[index].selected
        itm.options.map((option, index) => {
            itm.options[index].selected = false;
        })

        itm.options[index].selected = itm.required ? true : !curVal

        RadioValidate(itm, options)

        if (!(options.Mode === "build")) {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack>
            {item.label ?
                <InputLabel
                    required = {item.required ?? false}
                    error={item.errorText != null}
                    sx={{marginBottom: -1}}
                    role="label"
                >
                    {item.label}
                </InputLabel>
                : undefined}
            <RadioGroup row={item.inLine}>
                {item.options.map((option,index) =>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={option.selected ?? false}
                                onClick={() => onChange(index)}
                                data-testid={`radio-button-${index + 1}`}
                                disabled={(!item.editable && options.Mode==="edit")}
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
