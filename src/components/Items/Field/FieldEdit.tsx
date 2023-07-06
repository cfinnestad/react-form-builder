import React from "react";
import {FieldProps, isField, ItemProps} from "../Items";

export const FieldEdit = (FieldProps: ItemProps) => {
    const item = FieldProps.item
    if (!isField(item)) return <></>
    const data = FieldProps.options.AllowedSubtypes[item.subtype].EditFC(FieldProps as FieldProps)
    // TODO add field-level items to be edited.
    return <>
        { data }
    </>
}

export default FieldEdit