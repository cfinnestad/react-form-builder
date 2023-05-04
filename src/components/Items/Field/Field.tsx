import React from "react";
import { FieldProps } from "../Items";

export const edit = () => {

    return <></>
}

const Field = (fieldProps: FieldProps) => {
    return <>
        { fieldProps.AllowedSubtypes[fieldProps.Item.subtype.subtype].SubtypeFC(fieldProps) }
    </>
}

export default Field