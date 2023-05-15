import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {AnyItem, FieldItem, FieldProps, isField, isText} from "../../Items";
import {TextField} from "@mui/material";
import SetItem from "../../SetItem";
import ShowErrors from "../ShowErrors";

const Text = (fieldProps: FieldProps ) => {
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState( [] as string[])
    const [value, setValue] = useState(fieldProps.item.subtype.value)
    if (!isField(fieldProps.item) || !isText(fieldProps.item.subtype) ) {
        return <></>
    }
    const item = fieldProps.item
    const subtype = fieldProps.item.subtype


    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.item.subtype.value = value
            fieldProps.options.SetItem(fieldProps.item)
        }
    }, [value])

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: FieldItem, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value || undefined
        if (item.required && value === undefined) {
            setErrors([...errors, Item.name + ' is required'])
        }
        if (value) {
            if (value.length < (subtype.minLength || 0)) {
                setErrors([...errors, item.label + ' must be at least ' + subtype.minLength + 'charters long'])
            }
            if (value.length > (subtype.maxLength || 0)) {
                setErrors([...errors, item.label + ' cannot exceed ' + subtype.minLength + 'charters'])
            }
        }

        if(errors.length > 0) {
            console.log('errors', errors)
            setError(true)
            return
        }

        console.log('value', value)

        if(!fieldProps.options.IsBuild) {
            const itm = {...item}
            itm.subtype = {...itm.subtype}


            itm.subtype.value = value
            fieldProps.options.SetItem(itm)
        }

        setValue(value)
        setError(false)
        setErrors([])
        if (!fieldProps.options.IsBuild) {
            Item.subtype.value = value
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
            multiline={subtype.multiline || false}
            type="text"
            value={value}
            onChange={(event) => onChange(event, item, fieldProps.items, fieldProps.options.setItems) }
        />
        <ShowErrors errors={errors}/>
    </>
}

export default Text
