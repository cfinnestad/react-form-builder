import React from "react";
import {CheckboxProps} from "../../Items";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel, Stack
} from "@mui/material";
import {CheckboxValidate} from "./index";
import {cloneDeep} from "lodash";

const CheckboxST = ({item, options}: CheckboxProps ) => {
    function onChange(index: number){
        const itm = cloneDeep(item)
        itm.options[index].selected = !itm.options[index].selected;

        CheckboxValidate(itm, options)

        if (!(options.Mode === "build")) {
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
                                disabled={(!item.editable && options.Mode==="edit")}
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
