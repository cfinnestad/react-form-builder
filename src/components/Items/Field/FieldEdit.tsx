import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {FieldItem, FieldProps, isField, ItemProps} from "../Items";
import DefaultSubtypes from "../Subtypes/DefaultSubTypes";
import {
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormHelperText, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, Stack,
    TextField
} from "@mui/material";
import {omit, pick} from "lodash";

export const FieldEdit = (FieldProps: ItemProps) => {
    if (!isField(FieldProps.item)) return <></>

    const [item, setItem] = useState(FieldProps.item)
    const [subtype, setSubtype] = useState(FieldProps.item.subtype)

    const subtypeInit = useRef(false)
    const subtypeOptions = Object.keys(DefaultSubtypes())

    useEffect(() => {
        // Don't run getSubtypeDefaults on first render. Trust that existing subtype fields are correct.
        if(subtypeInit.current) {
            const fieldItem = getSubtypeDefaults(item, subtype)
            setItem(fieldItem)
        } else {
            subtypeInit.current = true
        }
    }, [subtype])

    useEffect(() => {
        FieldProps.options.SetItem(item)
    }, [item])

    const getSubtypeDefaults = (item: FieldProps['item'], subtype: string) => {
        const itm = { ...item }
        itm.subtype = subtype
        const defaults = FieldProps.options.AllowedSubtypes[subtype].Subtype
        const fieldIndex: (keyof FieldItem)[] = ['id', 'type', 'label', 'name', 'subtype', 'required', 'deprecated']

        // grab field-specific properties from ITEM
        const fieldProps = pick(itm, fieldIndex)
        // grab subtype-specific properties from DEFAULTS | Doesn't always have all defaults
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

            setItem(itm)
        },
        deprecated: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { checked } } = event;
            itm.deprecated = checked

            if(!itm.deprecated) {
                itm.deprecated = undefined
                delete itm.deprecated
            }
            setItem(itm)
        },
        subtype: (event: SelectChangeEvent) => {
            const { target: { value } } = event;
            setSubtype(value)
        },
        label: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { value } } = event;
            itm.label = value
            setItem(itm)
        },
        helperText: (event: ChangeEvent<HTMLInputElement>) => {
            const itm = { ...item }
            const { target: { value } } = event;
            itm.helperText = value
            setItem(itm)
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

        { Object.entries(FieldProps.options.AllowedSubtypes).map(([key, value]) => {
            return subtype === key &&
                <value.EditFC
                    item={item}
                    items={FieldProps.items}
                    options={FieldProps.options}
                ></value.EditFC>
        })}

    </>
}

export default FieldEdit