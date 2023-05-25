import React, { useEffect, useState } from 'react';
import {
    Box,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { FieldProps, isSelect, SelectSubtype } from '../../Items';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function SelectST(fieldProps: FieldProps) {
    const theme = useTheme();
    const [item, setItem] = useState(fieldProps.item as SelectSubtype);
    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        const itm = { ...item };
        const { target: { value } } = event;

        if (itm.multiples) {
            itm.value = typeof value === 'string' ? value.split(',') : value;
            if(itm.required && itm.value.length ===0) {
                itm.errorText = fieldProps.options.getError('required', itm)
            }
        } else {
            itm.value = event.target.value;
            if(itm.required && !itm.value) {
                itm.errorText = fieldProps.options.getError('required', itm)
            }
        }

        setItem(itm);
    };

    useEffect(() => {
        if (!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item);
        }
    }, [item]);

    if (!isSelect(fieldProps.item))
        return <></>

    if (item.multiples) {
        return (
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id={`${item.id}-label`} required={item.required}>
                    {item.label}
                </InputLabel>
                <Select
                    labelId={`${item.id}-label`}
                    id={item.id}
                    label={item.label}
                    multiple={item.multiples}
                    value={item.value as string[]}
                    autoWidth
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {
                        item.options.map(option =>
                            <MenuItem
                                key={option.label}
                                value={option.label}
                                selected={option.selected}
                                style={getStyles(option.label, item.value as string[], theme)}
                            >
                                {option.label}
                            </MenuItem>
                        )
                    }
                </Select>
                <FormHelperText>{item.helperText}</FormHelperText>
            </FormControl>
        );
    }
    else {
        return (
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id={`${item.id}-label`} required={item.required}>
                    {item.label}
                </InputLabel>
                <Select
                    labelId={`${item.id}-label`}
                    id={item.id}
                    label={item.label}
                    value={item.value as string}
                    autoWidth
                    onChange={handleChange}
                >
                    {
                        item.options.map((option, index) =>
                            <MenuItem
                                key={option.label}
                                value={index}
                                selected={option.selected}
                            >
                                {option.label}
                            </MenuItem>
                        )
                    }
                </Select>
                <FormHelperText>{item.helperText}</FormHelperText>
            </FormControl>
        );
    }
}

function getStyles(label: string, options: readonly string[], theme: Theme) {
    return {
        fontWeight:
            options.indexOf(label) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
}

export default SelectST;