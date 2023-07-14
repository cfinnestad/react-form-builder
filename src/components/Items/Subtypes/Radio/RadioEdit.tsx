import React, { useEffect, useState } from "react";
import { FieldProps, isRadio, RadioSubtype } from "../../Items";
import Options, { SelectedType } from "../../../Options/Options";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";

const RadioEdit = ({ item, options }: FieldProps) => {
    if (!isRadio(item))
        return <></>;

    const [value, setValue] = useState(item.inLine ? 'inline' : 'vertical');
    const [layout, setLayout] = useState(item.inLine || false);
    useEffect(() => {
        const radio = { ...item } as RadioSubtype;
        if (layout)
            radio.inLine = true;
        else
            delete radio.inLine;

        options.SetItem(radio);
    }, [layout]);

    const layoutClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
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
                item={item}
                options={options}
                selectedType={SelectedType.Single}
            />
        </Stack>
    );
}

export default RadioEdit;