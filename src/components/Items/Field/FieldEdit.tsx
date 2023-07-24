import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {FieldItem, FieldProps} from "../Items";
import DefaultSubtypes from "../Subtypes/DefaultSubTypes";
import {
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormHelperText, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {omit, pick} from "lodash";

export const FieldEdit = ({item, items, options}: FieldProps) => {
    const [subtype, setSubtype] = useState(item.subtype)

    const subtypeInit = useRef(false)
    const subtypeOptions = Object.keys(DefaultSubtypes())

    useEffect(() => {
        // Don't run getSubtypeDefaults on first render. Trust that existing subtype fields are correct.
        if(subtypeInit.current) {
            const fieldItem = getSubtypeDefaults(item, subtype)
            // setItem(fieldItem)
            options.SetItem(fieldItem)
        } else {
            subtypeInit.current = true
        }
    }, [subtype])

    const getSubtypeDefaults = (item: FieldProps['item'], subtype: string) => {
        const itm = { ...item }
        itm.subtype = subtype
        const defaults = options.AllowedSubtypes[subtype].Subtype
        const fieldIndex: (keyof FieldItem)[] = ['id', 'name', 'type', 'filter', 'custom', 'required', 'label', 'deprecated', 'helperText', 'subtype']

        // grab item and field specific properties from 'item'
        const fieldProps = pick(itm, fieldIndex)
        // grab subtype specific properties from 'defaults'
        const subtypeDefaults = omit(defaults, fieldIndex)

        return { ...fieldProps, ...subtypeDefaults } as FieldItem
    }

    const handlers = {
        required: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { checked } } = event;
            itm.required = checked

            if(!itm.required) {
                itm.required = undefined
                delete itm.required
            }

            options.SetItem(itm)
        },
        deprecated: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { checked } } = event;
            itm.deprecated = checked

            if(!itm.deprecated) {
                itm.deprecated = undefined
                delete itm.deprecated
            }

            options.SetItem(itm)
        },
        subtype: (event: SelectChangeEvent) => {
            const { target: { value } } = event;
            setSubtype(value)
        },
        label: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { value } } = event;
            itm.label = value

            options.SetItem(itm)
        },
        helperText: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { value } } = event;
            itm.helperText = value

            options.SetItem(itm)
        }
    }

    return <>
        <FormGroup>
            <FormControlLabel control={ <Checkbox  defaultChecked={item.required ?? false} onChange={handlers.required}/> } label="Required"/>
            <FormHelperText error={item.errorText !== undefined} sx = {{marginTop: -1}}>
                Indicate whether this field needs filled out prior to submitting the form.
            </FormHelperText>
        </FormGroup>

        <FormGroup>
            <FormControlLabel control={ <Checkbox  defaultChecked={item.deprecated ?? false} onChange={handlers.deprecated}/> } label="Deprecated"/>
            <FormHelperText error={item.errorText !== undefined} sx = {{marginTop: -1}}>
                Deprecated fields will not be removed from the database. They will still show in the builder interface with a red background.
            </FormHelperText>
        </FormGroup>

        <TextField
            size="small"
            label="Label"
            type="text"
            defaultValue={item.label}
            onChange={handlers.label}
        />

        <TextField
            size="small"
            label="Helper Text"
            type="text"
            value={item.helperText}
            onChange={handlers.helperText}
        />

        <FormControl>
            <InputLabel id="subtype-select-label">Subtype</InputLabel>
            <Select
                size="small"
                labelId="subtype-select-label"
                label="Subtype"
                defaultValue={item.subtype}
                onChange={handlers.subtype}
            >
                {
                    subtypeOptions.map(option =>
                        <MenuItem
                            key={option}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    )
                }
            </Select>
            <FormHelperText error={item.errorText !== undefined} sx={{marginLeft: 0}}>
                This will affect available subtype-specific options below. Changing this will revert subtype options to defaults.
            </FormHelperText>
        </FormControl>

        { Object.entries(options.AllowedSubtypes).map(([key, value]) => {
            return subtype === key &&
                <value.EditFC
                    item={item}
                    items={items}
                    options={options}
                ></value.EditFC>
        })}

    </>
}

export default FieldEdit