import React from "react";
import {FieldProps, isField, ItemProps} from "../Items";
import {Box} from "@mui/material";

const Field = (fieldProps: ItemProps) => {
    if(!isField(fieldProps.item)) {
        return <></>
    }

    if(!fieldProps.options.IsBuild) {
        if (fieldProps.item.deprecated) return <></>
    }
    return <Box component="div" sx={{ flexGrow: 1 }} marginTop={1.75} marginBottom={1}>
        { fieldProps.options.AllowedSubtypes[fieldProps.item.subtype].SubtypeFC(fieldProps as FieldProps) }
    </Box>
}

export default Field