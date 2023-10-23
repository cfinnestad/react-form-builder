import React, { useEffect, useState} from "react";
import { CheckboxSubtype, OptionSubtype, CheckboxProps } from "../../Items";
import Options, { SelectedType } from "../../../Options/Options";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";


const CheckboxEdit = ({ item, options }: CheckboxProps) => {
    // Handles layout state for the edit modal
    const [value, setValue] = useState(item.inLine ? 'inline' : 'vertical');
    // Handles layout state for the builder
    const [layout, setLayout] = useState(item.inLine || false);
    // Handles choices state for the builder
    const [itemOptions, setItemOptions] = useState(item.options);

    useEffect(() => {
        const checkbox = { ...item } as CheckboxSubtype;
        if (layout)
            checkbox.inLine = true;
        else
            delete checkbox.inLine;

        options.SetItem(checkbox);
    }, [layout]);

    useEffect(() => {
        options.SetItem({ ...item, options: itemOptions } as OptionSubtype)
    }, [itemOptions]);


    const layoutClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the modal so the user has a good experience when choosing the default selected option
        setValue((event.target as HTMLInputElement).value);
        // Update the builder to reflect the user's choice for default selected option
        setLayout(!layout);
    }

    return (
        <>
            <FormControl>
                <FormLabel id="control-layout-radio-buttons-group">Layout</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="control-layout-radio-buttons-group"
                    name="layout-radio-buttons-group"
                    value={value}
                    onChange={layoutClickHandler}
                >
                    <FormControlLabel
                        control={<Radio />}
                        value="inline"
                        label="Inline"
                    />
                    <FormControlLabel
                        control={<Radio />}
                        value="vertical"
                        label="Vertical"
                    />
                </RadioGroup>
            </FormControl>

            <FormLabel id="control-options-group">Choices</FormLabel>
            <Options
                options={itemOptions}
                setOptions={setItemOptions}
                selectedType={SelectedType.Multiple}
            />
        </>
    );
}

export default CheckboxEdit;