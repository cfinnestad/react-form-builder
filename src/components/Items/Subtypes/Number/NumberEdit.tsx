import React, { ChangeEvent } from "react";
import {NumberProps, NumberSubtype} from "../../Items";
import ShowErrors from "../ShowErrors";
import { Stack, TextField } from "@mui/material";

export const NumberEdit = ({ item, options, errorHandler }: NumberProps) => {

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;

        if (val && isNaN(+val)) {
            errorHandler.setError('value', "Value must be a number!")
        }
        else if (item.min && (parseFloat(val) < item.min)) {
            errorHandler.setError('value', "Value cannot be less than the Min Value setting!")
        }
        else if (item.max && (parseFloat(val) > item.max)) {
            errorHandler.setError('value', "Value cannot be greater than the Max Value setting!")
        }
        else {
            errorHandler.setError('value')
            options.SetItem({...item, value: parseFloat(val)});
        }
    };

    const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (val && isNaN(+val)) {
            errorHandler.setError('max', 'Max Value must be an integer!')
        }
        else if (val === 0) {
            errorHandler.setError('max', 'Max Value must be greater than zero!')
        }
        else if (item.min && (val < item.min)) {
            errorHandler.setError('max', 'Max Value must not be less than Min Value!')
        }
        else {
            errorHandler.setError('max')

            // Make sure the Value field still complies with the new Min Value setting
            if (item.value && item.value > val) {
                errorHandler.setError('value', 'Value cannot be greater than the Max Value setting!')
            } else {
                errorHandler.setError('value')
            }

            const itm = { ...item, max: val } as NumberSubtype;
            if (isNaN(val)) {
                delete itm.max
            }

            options.SetItem(itm);
        }
    };

    const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (val && isNaN(+val)) {
            errorHandler.setError('min', 'Min Value must be an integer!')
        } else if (val === 0) {
            errorHandler.setError('min', 'Min Value must be greater than zero!')
        } else if (item.max && (val > item.max)) {
            errorHandler.setError('min', 'Min Value must not be greater than Max Value!')
        } else {
            errorHandler.setError('min')

            // Make sure the Value field still complies with the new Min Value setting
            if (item.value && parseFloat(item.value.toString()) < val) {
                errorHandler.setError('value', 'Value cannot be less than the Min Value setting!')
            } else {
                errorHandler.setError('value')
            }

            const itm = { ...item, min: val } as NumberSubtype;
            if (isNaN(val)) {
                delete itm.min
            }

            options.SetItem(itm);
        }
    };

    return (
        <>
            <Stack spacing={1}>
                <TextField
                    error={errorHandler.hasError('value')}
                    id={`${item.id}-field-value`}
                    inputProps={{ pattern: '\d*' }}
                    label="Value"
                    onChange={handleValueChange}
                    size="small"
                    type="text"
                    defaultValue={item.value}
                />
                <ShowErrors errors={errorHandler.getError('value')} />
            </Stack>

            <Stack spacing={1}>
                <TextField
                    error={errorHandler.hasError('min')}
                    id={`${item.id}-min-value`}
                    inputProps={{ min: 1, shrink: true }}
                    label="Min Value"
                    onChange={handleMinValueChange}
                    size="small"
                    type="number"
                    defaultValue={item.min}
                />
                <ShowErrors errors={errorHandler.getError('min')} />
            </Stack>

            <Stack spacing={1}>
                <TextField
                    error={errorHandler.hasError('max')}
                    id={`${item.id}-max-value`}
                    inputProps={{ min: 1, shrink: true }}
                    label="Max Value"
                    onChange={handleMaxValueChange}
                    size="small"
                    type="number"
                    defaultValue={item.max}
                />
                <ShowErrors errors={errorHandler.getError('max')} />
            </Stack>
        </>
    );
}

export default NumberEdit;