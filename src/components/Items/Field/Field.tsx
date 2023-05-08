import React from "react";
import { FieldProps } from "../Items";

const Field = (fieldProps: FieldProps) => {
    return <>
        { fieldProps.options.AllowedSubtypes[fieldProps.item.subtype.subtype].SubtypeFC(fieldProps) }
    </>
}

export default Field