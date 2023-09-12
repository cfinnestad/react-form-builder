import React, {ChangeEvent, useEffect, useState} from "react";
import {BooleanProps, BooleanSubtype} from "../../Items";
import {
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup, TextField
} from "@mui/material";

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

    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        options.SetItem({...item, description: event.target.value})
    }

    return (
        <>
            <FormGroup>
                <TextField
                    size='small'
                    fullWidth={true}
                    label='Description'
                    type="text"
                    defaultValue={item.description}
                    onChange={onChangeDescription}
                />
            </FormGroup>
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

            <FormControl>
                <FormControlLabel
                    control={<Checkbox defaultChecked={item.editable || false} onChange={onClickEditable}/>}
                    label="Editable"
                />
                <FormHelperText sx={{marginTop: -1, marginLeft: 0}}>Enable editing in backend.</FormHelperText>
            </FormControl>
        </>
    );
}

export default BooleanEdit