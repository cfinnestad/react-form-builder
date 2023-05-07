import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {FieldItem, TextSubtype,} from "../../Items";
import {TextField, Checkbox, FormGroup, FormControlLabel} from "@mui/material";
import ShowErrors from "../ShowErrors";
import subtypeEdit from "../SubtypeEdit";

type TextEditProps = {
    subtype: TextSubtype,
    setSubtype: Dispatch<SetStateAction<TextSubtype>>
    item: FieldItem
}
export const TextEdit = ({subtype, setSubtype, item}: TextEditProps ) => {
    const [valueError, setValueError] = useState( false)
    const [valueErrors, setValueErrors] = useState( [] as string[])
    const [minLengthError, setMinLengthError] = useState( false)
    const [minLengthErrors, setMinLengthErrors] = useState( [] as string[])
    const [maxLengthError, setMaxLengthError] = useState( false)
    const [maxLengthErrors, setMaxLengthErrors] = useState( [] as string[])

    const onChangeMinLength = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value === '' ? undefined : parseInt(event.target.value)

        if (value !== undefined) {
            if (value < 0) {
                setMinLengthError(true)
                setMaxLengthErrors(['minLength must be a positive number'])
                return false
            }
            if (subtype.maxLength && (value > subtype.maxLength)) {
                setMinLengthError(true)
                setMaxLengthErrors(['Min Length must not be greater than Max Length'])
                return false
            }
        }
        setMinLengthError(false)
        setMinLengthErrors([]);
        subtype.minLength = value
        setSubtype(subtype)
    }

    const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? undefined : parseInt(event.target.value)
        if (value !== undefined) {
            if (value < 1) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must be greater the 0'])
                return false
            }
            if (subtype.minLength && (value < subtype.minLength)) {
                setMaxLengthError(true)
                setMaxLengthErrors(['Max Length must not be less than Min Length '])
                return false
            }
        }
        setMaxLengthError(false);
        setMaxLengthErrors([]);
        subtype.maxLength = value
        setSubtype(subtype)
    }

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const st = {...subtype}
        if (value) {
            if (value.length < ((item.subtype as TextSubtype).minLength || 0)) {
                setValueError(true)
                setValueErrors([item.label + ' must be at least ' + (item.subtype as TextSubtype).minLength + 'charters long'])
                return
            }
            if (value.length > ((item.subtype as TextSubtype).maxLength || 0)) {
                setValueError(true)
                setValueErrors([item.label + ' cannot exceed ' + (item.subtype as TextSubtype).minLength + 'charters'])
                return
            }
            st.value = value
        } else {
            delete st.value
        }
        setSubtype(st)
    }

    const onClickMultiline = () => {
        const st = {...subtype}
        if (subtype.multiline !== undefined) {
            delete st.multiline
        } else {
            st.multiline = true
        }
        setSubtype(st)

    }

    return <>
        <TextField
            size='small'
            fullWidth={true}
            label='Value'
            type="text"
            error={valueError}
            value={subtype.value}
            onChange={onChangeValue}
        />
        <ShowErrors errors={valueErrors}/>
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={subtype.multiline || false} onClick={onClickMultiline}/>} label="Multiline" labelPlacement="start"/>
        </FormGroup>
        <TextField
            size='small'
            fullWidth={true}
            label='Min Length'
            type="number"
            inputProps={{"min": (subtype.maxLength || 0)}}
            error={minLengthError}
            value={subtype.minLength}
            onChange={onChangeMinLength}
        />
        <ShowErrors errors={minLengthErrors}/>
        <TextField
            size='small'
            fullWidth={true}
            label='Max Length'
            type="number"
            inputProps={{"min": (subtype.minLength || 1)}}
            error={maxLengthError}
            value={subtype.maxLength}
            onChange={onChangeMaxLength}
        />
        <ShowErrors errors={maxLengthErrors}/>
    </>

}

export default TextEdit