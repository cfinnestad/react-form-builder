import React from "react";
import {FieldProps} from "../Items";
import {Box} from "@mui/material";

const Field = (fieldProps: FieldProps) => {
    if(!(fieldProps.options.Mode === "build") && !(fieldProps.options.Mode === "edit")) {
        if (fieldProps.item.deprecated || fieldProps.item.backend_only) return <></>
    }
    return <Box component="div" sx={{ flexGrow: 1 }} marginTop={1.75} marginBottom={1}>
        { fieldProps.options.AllowedSubtypes[fieldProps.item.subtype].SubtypeFC(fieldProps as FieldProps) }
    </Box>
}

export default Field