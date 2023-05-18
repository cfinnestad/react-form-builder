import React from "react";
import {FieldItem, FieldProps, ItemProps} from "../Items";

const SubtypeEdit = (itemProps:ItemProps) => {
    // @ts-ignore
    const data = itemProps.options?.AllowedSubtypes[(itemProps.item as FieldItem).subtype].EditFC(itemProps as FieldProps)
    return <>
        { data }
    </>
};

export default SubtypeEdit