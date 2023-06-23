import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {FieldItem, FieldProps, NumberSubtype} from "../../Items";
// import {TextField, Checkbox, FormGroup, FormControlLabel} from "@mui/material";
// import ShowErrors from "../ShowErrors";
// import subtypeEdit from "../SubtypeEdit";

export const NumberEdit = ({item, items, options}: FieldProps ) => {
    // const [valueError, setValueError] = useState( false)
    // const [valueErrors, setValueErrors] = useState( [] as string[])
    // const [minLengthError, setMinLengthError] = useState( false)
    // const [minLengthErrors, setMinLengthErrors] = useState( [] as string[])
    // const [maxLengthError, setMaxLengthError] = useState( false)
    // const [maxLengthErrors, setMaxLengthErrors] = useState( [] as string[])
    //
    // const onChangeMinLength = (event: ChangeEvent<HTMLInputElement>) => {
    //
    //     const value = event.target.value === '' ? undefined : parseInt(event.target.value)
    //
    //     if (value !== undefined) {
    //         if (value < 0) {
    //             setMinLengthError(true)
    //             setMaxLengthErrors(['min must be a positive number'])
    //             return false
    //         }
    //         if (subtype.max && (value > subtype.max)) {
    //             setMinLengthError(true)
    //             setMaxLengthErrors(['Min must not be greater than Max Length'])
    //             return false
    //         }
    //     }
    //     setMinLengthError(false)
    //     setMinLengthErrors([]);
    //     subtype.min = value
    //     setSubtype(subtype)
    // }
    //
    // const onChangeMaxLength = (event: ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value === '' ? undefined : parseInt(event.target.value)
    //     if (value !== undefined) {
    //         if (value < 1) {
    //             setMaxLengthError(true)
    //             setMaxLengthErrors(['Max Length must be greater the 0'])
    //             return false
    //         }
    //         if (subtype.min && (value < subtype.min)) {
    //             setMaxLengthError(true)
    //             setMaxLengthErrors(['Max Length must not be less than Min Length '])
    //             return false
    //         }
    //     }
    //     setMaxLengthError(false);
    //     setMaxLengthErrors([]);
    //     subtype.max = value
    //     setSubtype(subtype)
    // }
    //
    // const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value || undefined
    //     console.log('typeof value...', typeof value )
    //     const st = {...subtype}
    //     if (value) {
    //         if (value.length < ((item.subtype as NumberSubtype).min || 0)) {
    //             setValueError(true)
    //             setValueErrors([item.label + ' must be at least ' + (item.subtype as NumberSubtype).min + 'charters long'])
    //             return
    //         }
    //         if (value.length > ((item.subtype as NumberSubtype).max || 0)) {
    //             setValueError(true)
    //             setValueErrors([item.label + ' cannot exceed ' + (item.subtype as NumberSubtype).max + 'charters'])
    //             return
    //         }
    //         st.value = Number.isInteger(value) ? Number.parseInt(value) : Number.parseFloat(value)
    //     } else {
    //         delete st.value
    //     }
    //     setSubtype(st)
    // }
    //
    // // const onClickMultiline = () => {
    // //     const st = {...subtype}
    // //     if (subtype.multiline !== undefined) {
    // //         delete st.multiline
    // //     } else {
    // //         st.multiline = true
    // //     }
    // //     setSubtype(st)
    // //
    // // }
    //
    // return <>
    //     <TextField
    //         size='small'
    //         fullWidth={true}
    //         label='Value'
    //         type="number"
    //         error={valueError}
    //         value={subtype.value}
    //         onChange={onChangeValue}
    //     />
    //     <ShowErrors errors={valueErrors}/>
    //     {/*<FormGroup>*/}
    //     {/*    <FormControlLabel control={<Checkbox checked={subtype.multiline || false} onClick={onClickMultiline}/>} label="Multiline" labelPlacement="start"/>*/}
    //     {/*</FormGroup>*/}
    //     <TextField
    //         size='small'
    //         fullWidth={true}
    //         label='Min Length'
    //         type="number"
    //         inputProps={{"min": (subtype.max || 0)}}
    //         error={minLengthError}
    //         value={subtype.min}
    //         onChange={onChangeMinLength}
    //     />
    //     <ShowErrors errors={minLengthErrors}/>
    //     <TextField
    //         size='small'
    //         fullWidth={true}
    //         label='Max Length'
    //         type="number"
    //         inputProps={{"min": (subtype.min || 1)}}
    //         error={maxLengthError}
    //         value={subtype.max}
    //         onChange={onChangeMaxLength}
    //     />
    //     <ShowErrors errors={maxLengthErrors}/>
    // </>
    return <></>

}

export default NumberEdit