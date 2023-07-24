import React from 'react';
import {
    Box,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import {Option, SelectProps, SelectSubtype} from '../../Items';
import { SelectValidate } from "./index";

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

function SelectST({item, options}: SelectProps) {
    const theme = useTheme();
    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        const itm = { ...item } as SelectSubtype
        itm.options = itm.options.map(option => { return {...option} as Option})
        const { target: { value } } = event;

        if (itm.multiples) {
            console.log('pre item', itm)
            itm.options.forEach((option) => {
                option.selected = value.includes(option.label)
            })
            console.log('post item', itm)
        } else {
            itm.options.forEach((option) => {
                option.selected = option.label === value
            });
        }

        console.log('item', itm)
        SelectValidate(itm, options);
        if (!options.IsBuild) {
            options.SetItem(itm)
        }
    };

    if (item.multiples) {
        return (
            <Stack spacing={.5}>
                <InputLabel
                    required = {item.required ?? false}
                    error={item.errorText !== undefined}
                >
                    {item.label}
                </InputLabel>
                <FormControl sx={{ minWidth: 250 }}>
                    <Select
                        id={item.id}
                        multiple={item.multiples}
                        value={item.options.filter(option => option.selected).map(option => option.label)}
                        autoWidth
                        onChange={handleChange}
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
                                    style={getStyles(option.label, item.options.filter(option => option.selected).map(option => option.label), theme)}
                                >
                                    {option.label}
                                </MenuItem>
                            )
                        }
                    </Select>
                    <FormHelperText error={item.errorText !== undefined} sx={{marginLeft: 0}}>
                        {(item.helperText !== undefined) ? <>{item.helperText}<br /></> : ''}
                        {item.errorText}
                    </FormHelperText>
                </FormControl>
            </Stack>
        );
    }
    else {
        return (
            <Stack spacing={.5}>
                <InputLabel
                    required = {item.required ?? false}
                    error={item.errorText != null}
                >
                    {item.label}
                </InputLabel>
                <FormControl sx={{ minWidth: 250 }}>
                    <Select
                        error={item.errorText !== undefined}
                        id={item.id}
                        value={item.options.filter(option => option.selected).map(option => option.value ?? option.label)[0] ?? ''}
                        autoWidth
                        onChange={handleChange}
                    >
                        {
                            !item.required && (
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                            )
                        }
                        {
                            item.options.map(option =>
                                <MenuItem
                                    key={option.label}
                                    value={option.label}
                                    selected={option.selected}
                                >
                                    {option.label}
                                </MenuItem>
                            )
                        }
                    </Select>
                    <FormHelperText error={item.errorText !== undefined} sx={{marginLeft: 0}}>
                        {(item.helperText !== undefined) ? <>{item.helperText}<br /></> : ''}
                        {item.errorText}
                    </FormHelperText>
                </FormControl>
            </Stack>
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