import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {AnyItem, FieldProps, isText, TextSubtype} from "../../Items";
import {TextField} from "@mui/material";
import SetItem from "../../SetItem";
import ShowErrors from "../ShowErrors";

const Text = (fieldProps: FieldProps ) => {

    if (!isText(fieldProps.item) ) {
        return <></>
    }

    const [error, setError] = useState(false)
    const [errors, setErrors] = useState( [] as string[])
    const [value, setValue] = useState(fieldProps.item.value)

    const item = fieldProps.item

    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.item.value = value
            fieldProps.options.SetItem(fieldProps.item)
        }
    }, [value])

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: TextSubtype, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value || undefined
        if (item.required && value === undefined) {
            setErrors([...errors, Item.name + ' is required'])
        }
        if (value) {
            if (value.length < (item.minLength || 0)) {
                setErrors([...errors, item.label + ' must be at least ' + item.minLength + 'charters long'])
            }
            if (value.length > (item.maxLength || 0)) {
                setErrors([...errors, item.label + ' cannot exceed ' + item.minLength + 'charters'])
            }
        }

        if(errors.length > 0) {
            setError(true)
            return
        }

        if(!fieldProps.options.IsBuild) {
            const itm = {...item}
            itm.value = value
            fieldProps.options.SetItem(itm)
        }

        setValue(value)
        setError(false)
        setErrors([])
        if (!fieldProps.options.IsBuild) {
            Item.value = value
            SetItems(SetItem(Item,Items))
        }
    }

    return <>
        <TextField
            id={item.id}
            error={error}
            size='small'
            fullWidth={true}
            name={item.name}
            label={item.label}
            multiline={item.multiline || false}
            type="text"
            value={value}
            onChange={(event) => onChange(event, item, fieldProps.items, fieldProps.options.setItems) }
        />
        <ShowErrors errors={errors}/>
    </>
}

export default Text
