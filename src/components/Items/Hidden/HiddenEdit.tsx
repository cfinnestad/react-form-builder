import React, { ChangeEvent, useState } from "react";
import { HiddenProps } from "../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, TextField} from "@mui/material";

const HiddenEdit = ({ item, options }: HiddenProps) => {
    const [value, setValue] = useState(item.value || "");
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        const itm = { ...item, value: val };
        setValue(val);
        options.SetItem(itm);
    }
    const handleDeprecated = (event: ChangeEvent<HTMLInputElement>) => {
        const itm = { ...item }
        const { target: { checked } } = event;
        itm.deprecated = checked

        if(!itm.deprecated) {
            itm.deprecated = undefined
            delete itm.deprecated
        }

        options.SetItem(itm)
    }

    return ( <>
            <FormGroup>
                <TextField
                    label="Hidden Value"
                    onChange={handleChange}
                    type="text"
                    value={value}
                    variant="outlined"
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel control={ <Checkbox  checked={item.deprecated ?? false} onChange={handleDeprecated}/> } label="Deprecated"/>
                <FormHelperText sx = {{marginTop: -1}}>
                    Deprecated fields will not be removed from the database. They will still show in the builder interface with a red outline.
                </FormHelperText>
            </FormGroup>
    </>
    );
}

export default HiddenEdit;