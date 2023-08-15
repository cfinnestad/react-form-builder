import React, {ChangeEvent, useEffect, useState} from "react";
import {RadioProps, RadioSubtype} from "../../Items";
import Options, { SelectedType } from "../../../Options/Options";
import {Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material";

const RadioEdit = ({ item, options }: RadioProps) => {
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

    const onClickEditable = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked || undefined
        const itm = {...item}
        if (value === undefined) {
            delete itm.editable
        } else {
            itm.editable = true
        }
        options.SetItem(itm)
    }

    const layoutClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the modal so the user has a good experience when choosing the default selected option
        setValue((event.target as HTMLInputElement).value);
        // Update the builder to reflect the user's choice for default selected option
        setLayout(!layout);
    }

    return (
        <>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked={item.editable || false} onChange={onClickEditable}/>}
                    label="Editable"
                />
                <FormHelperText sx={{marginTop: -1, marginLeft: 0}}>Enable editing in backend.</FormHelperText>
            </FormControl>

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
        </>
    );
}

export default RadioEdit;