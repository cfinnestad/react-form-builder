import React from "react";
import { FieldProps } from "../Items";
import Filter from "../../Filter/Filter";
import {Box} from "@mui/material";

const Field = (fieldProps: FieldProps) => {
    if(!fieldProps.options.IsBuild) {
        if (!Filter(fieldProps.item, fieldProps.items, fieldProps.item.filter)) return <></>
        if (fieldProps.item.deprecated) return <></>
    }
    return <Box component="div" sx={{ flexGrow: 1 }} marginTop={1} marginBottom={1}>
        { fieldProps.options.AllowedSubtypes[fieldProps.item.subtype.subtype].SubtypeFC(fieldProps) }
    </Box>
}

export default Field