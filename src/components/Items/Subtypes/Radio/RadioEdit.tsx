import React, { useEffect, useState } from "react";
import { FieldProps, isRadio, RadioSubtype } from "../../Items";
import Options, { SelectedType } from "../../../Options/Options";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";

const RadioEdit = ({ item, options }: FieldProps) => {
    if (!isRadio(item))
        return <></>;

    // Handles layout state for the edit modal
    const [value, setValue] = useState(item.inLine ? 'inline' : 'vertical');
    // Handles layout state for the builder
    const [layout, setLayout] = useState(item.inLine || false);
    // Handles choices state for the builder
    const [itemOptions, setItemOptions] = useState(item.options);

    useEffect(() => {
        const radio = { ...item } as RadioSubtype;
        if (layout)
            radio.inLine = true;
        else
            delete radio.inLine;

        options.SetItem(radio);
    }, [layout]);

    useEffect(() => {
        options.SetItem({ ...item, options: itemOptions })
    }, [itemOptions]);

    const layoutClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the modal so the user has a good experience when choosing the default selected option
        setValue((event.target as HTMLInputElement).value);
        // Update the builder to reflect the user's choice for default selected option
        setLayout(!layout);
    }

    return (
        <Stack spacing={3}>
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
                selectedType={SelectedType.Single}
            />
        </Stack>
    );
}

export default RadioEdit;