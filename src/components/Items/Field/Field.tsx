import React from "react";
import { FieldProps } from "../Items";

const Field = (fieldProps: FieldProps) => {
    return <>
        { fieldProps.AllowedSubtypes[fieldProps.Item.subtype.subtype].SubtypeFC(fieldProps) }
    </>
}

export default Field