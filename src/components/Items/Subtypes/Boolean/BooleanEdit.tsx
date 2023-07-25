import React, {useEffect, useState} from "react";
import {BooleanProps, BooleanSubtype} from "../../Items";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const BooleanEdit = ({item, options}: BooleanProps) => {
    // Handles default value state for the edit modal
    const [value, setValue] = useState(item.value ? 'true' : 'false');
    // Handles default value state for the builder
    const [bool, setBool] = useState(item.value || false);

    useEffect(() => {
        const boolean = { ...item } as BooleanSubtype;
        if (bool)
            boolean.value = true;
        else
            delete boolean.value;

        options.SetItem(boolean);
    }, [bool]);


    const defaultValueClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the modal so the user has a good experience when choosing the default selected option
        setValue((event.target as HTMLInputElement).value);
        // Update the builder to reflect the user's choice for default selected option
        setBool(!bool);
    }

    return (
        <>
            <FormControl>
                <FormLabel id="control-layout-radio-buttons-group">Default Value</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="control-layout-radio-buttons-group"
                    name="layout-radio-buttons-group"
                    value={value}
                    onChange={defaultValueClickHandler}
                >
                    <FormControlLabel
                        control={<Radio />}
                        value="true"
                        label="True"
                    />
                    <FormControlLabel
                        control={<Radio />}
                        value="false"
                        label="False"
                    />
                </RadioGroup>
            </FormControl>
        </>
    );
}

export default BooleanEdit