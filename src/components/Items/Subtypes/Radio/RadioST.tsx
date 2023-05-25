import React, {useEffect, useState} from "react";
import {
    FieldProps,
    isField,
    isRadio,
    RadioSubtype
} from "../../Items";
import {
    Box,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";

const RadioST = (fieldProps: FieldProps ) => {

    if (!isField(fieldProps.item) || !isRadio(fieldProps.item) ) {
        return <></>
    }

    const [item, setItem] = useState(fieldProps.item as RadioSubtype)

    const itm = {...item};
    useEffect(() => {
        if(!fieldProps.options.IsBuild) {
            fieldProps.options.SetItem(item)
        }
    }, [item])

    function onChange(index: number){
        itm.options.map((option, index) => {
            itm.options[index].selected = false;
        })

        itm.options[index].selected = true;

        itm.value = itm.options.filter(i => {return i.selected ?? false}).map(i => {return i.value ?? i.label});

        if(itm.required && !itm.value) {
            itm.errorText = fieldProps.options.getError('required', itm)
        }

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
            <Box sx = {{ paddingLeft: 2, paddingY: 1, borderRadius: 1, border: 1, borderColor: 'grey.600', "&:hover": { borderColor: 'grey.200' }} } >
                <RadioGroup sx = {{display: flex, flexDirection: 'row'}}>
                    {item.options.map((option,index) =>
                        <>
                            <FormGroup>
                                <FormControlLabel
                                    control=
                                        {<Radio
                                            value={option.value}
                                            checked={option.selected ?? false}
                                            onClick={() => onChange(index)} />}
                                    label={option.label
                                    }/>
                            </FormGroup>
                        </>
                    )}
                </RadioGroup>
            </Box>
            <FormHelperText sx = {{ paddingX: 2}}>
                {item.helperText}
            </FormHelperText>
        </Box>
    </>
}

export default RadioST