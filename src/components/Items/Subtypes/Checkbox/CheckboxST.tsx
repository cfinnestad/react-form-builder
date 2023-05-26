import React, {useEffect, useState} from "react";
import {CheckboxSubtype, FieldProps, isCheckbox, isField} from "../../Items";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel
} from "@mui/material";
import {CheckboxValidate} from "./index";

const CheckboxST = (fieldProps: FieldProps ) => {

    if (!isField(fieldProps.item) || !isCheckbox(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as CheckboxSubtype)

    const itm = {...item};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    }, [item])

    function onChange(index: number){
        itm.options[index].selected = !itm.options[index].selected;
        itm.value = itm.options.filter(i => {return i.selected ?? false}).map(i => {return i.value ?? i.label});
        if (itm.value?.length === 0) {
            itm.value = undefined
            delete itm.value
        }
        CheckboxValidate(itm, fieldProps.options)
        setItem(itm);
    }

    let flex : string = '';
    if(item.inLine){
        flex = 'flex';
    }

    return <>

        <Box component="div" sx={{ flexGrow: 1 }} marginTop={1.25} marginBottom={1}>
            <FormLabel sx={{marginLeft: "0.71em", marginTop: "-0.75em", zIndex: 2, paddingX: 0.5, backgroundColor: "#fff", position: "absolute", fontSize: "0.75em", fontWeight: 400}}>
                {item.label}
            </FormLabel>
            <Box sx = {{ paddingLeft: 2, paddingY: 1,  display: flex, flexDirection: 'row', borderRadius: 1, border: 1, borderColor: 'grey.600', "&:hover": { borderColor: 'grey.200' }} } >
                {item.options.map((option,index) =>
                    <>
                        <FormGroup>
                            <FormControlLabel
                                control=
                                    {<Checkbox
                                        value={option.value}
                                        checked={option.selected}
                                        onChange={() => onChange(index)} />}
                                label={option.label
                                }/>
                        </FormGroup>
                    </>
                )}
            </Box>
            <FormHelperText sx = {{ paddingX: 2}}>
                {item.helperText}
            </FormHelperText>
        </Box>
    </>
}

export default CheckboxST
