import React from "react";
import {FieldItem, FieldProps, ItemProps} from "../Items";

const SubtypeEdit = (itemProps:ItemProps) => {
    // @ts-ignore
    const data = itemProps.Options?.AllowedSubtypes[(itemProps.Item as FieldItem).subtype.subtype].EditFC(itemProps as FieldProps)
    return <>
        { data }
    </>
};

export default SubtypeEdit