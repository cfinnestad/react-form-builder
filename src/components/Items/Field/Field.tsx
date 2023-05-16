import React from "react";
import { FieldProps } from "../Items";
import Filter from "../../Filter/Filter";

const Field = (fieldProps: FieldProps) => {
    if(!fieldProps.options.IsBuild) {
        if (!Filter(fieldProps, fieldProps.item.filter)) return <></>
        if (fieldProps.item.deprecated) return <></>
    }
    return <>
        { fieldProps.options.AllowedSubtypes[fieldProps.item.subtype.subtype].SubtypeFC(fieldProps) }
    </>
}

export default Field