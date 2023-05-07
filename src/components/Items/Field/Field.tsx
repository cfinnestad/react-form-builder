import React from "react";
import { FieldProps } from "../Items";

const Field = (fieldProps: FieldProps) => {
    return <>
        { fieldProps.Options.AllowedSubtypes[fieldProps.Item.subtype.subtype].SubtypeFC(fieldProps) }
    </>
}

export default Field