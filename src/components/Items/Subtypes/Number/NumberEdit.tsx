import React, { ChangeEvent, useState } from "react";
import { NumberProps } from "../../Items";
import ShowErrors from "../ShowErrors";
import { Stack, TextField } from "@mui/material";

export const NumberEdit = ({ item, items, options }: NumberProps) => {
    const [value, setValue] = useState(item.value || "");
    const [min, setMin] = useState(item.min || null);
    const [max, setMax] = useState(item.max || null);
    const [valueError, setValueError] = useState([] as string[]);
    const [minError, setMinError] = useState([] as string[]);
    const [maxError, setMaxError] = useState([] as string[]);

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        const itm = { ...item, value: val };
        setValue(val);

        if (val && isNaN(+val))
            setValueError(["Value must be a number!"]);
        else if (min && (parseFloat(val) < min))
            setValueError(["Value cannot be less than the Min Value setting!"]);
        else if (max && (parseFloat(val) > max))
            setValueError(["Value cannot be greater than the Max Value setting!"]);
        else {
            setValueError([]);
            options.SetItem(itm);
        }
    };

    const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);
        const itm = { ...item, max: val };
        setMax(val);

        if (val && isNaN(+val))
            setMaxError(["Max Value must be an integer!"]);
        else if (val === 0)
            setMaxError(["Max Value must be greater than zero!"]);
        else if (min && (val < min))
            setMaxError(["Max Value must not be less than Min Value!"]);
        else {
            setMaxError([]);

            // Make sure the Value field still complies with the new Min Value setting
            if (value && parseFloat(value.toString()) > val)
                setValueError(["Value cannot be less than the Min Value setting!"]);
            else
                setValueError([]);

            options.SetItem(itm);
        }
    };

    const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);
        const itm = { ...item, min: val };
        setMin(val);

        if (val && isNaN(+val))
            setMinError(["Min Value must be an integer!"]);
        else if (val === 0)
            setMinError(["Min Value must be greater than zero!"]);
        else if (max && (val > max))
            setMinError(["Min Value must not be greater than Max Value!"]);
        else {
            setMinError([]);

            // Make sure the Value field still complies with the new Min Value setting
            if (value && parseFloat(value.toString()) < val)
                setValueError(["Value cannot be less than the Min Value setting!"]);
            else
                setValueError([]);

            options.SetItem(itm);
        }
    };

    return (
        <>
            <Stack spacing={1}>
                <TextField
                    error={valueError.length > 0 ? true : false}
                    id={`${item.id}-field-value`}
                    inputProps={{ pattern: '\d*' }}
                    label="Value"
                    onChange={handleValueChange}
                    size="small"
                    type="text"
                    value={value}
                />
                <ShowErrors errors={valueError} />
            </Stack>

            <Stack spacing={1}>
                <TextField
                    error={minError.length > 0 ? true : false}
                    id={`${item.id}-min-value`}
                    inputProps={{ min: 1, shrink: true }}
                    label="Min Value"
                    onChange={handleMinValueChange}
                    size="small"
                    type="number"
                    value={min}
                />
                <ShowErrors errors={minError} />
            </Stack>

            <Stack spacing={1}>
                <TextField
                    error={maxError.length > 0 ? true : false}
                    id={`${item.id}-max-value`}
                    inputProps={{ min: 1, shrink: true }}
                    label="Max Value"
                    onChange={handleMaxValueChange}
                    size="small"
                    type="number"
                    value={max}
                />
                <ShowErrors errors={maxError} />
            </Stack>
        </>
    );
}

export default NumberEdit;