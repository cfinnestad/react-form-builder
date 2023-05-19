import React from "react";
import {FieldItem, FieldProps, ItemProps} from "../Items";

const SubtypeFC = (itemProps:ItemProps) => {
    // @ts-ignore
    const data = itemProps.options?.AllowedSubtypes[(itemProps.item as FieldItem).subtype].SubtypeFC(itemProps as FieldProps)
    return <>
        { data }
        </>
};

export default SubtypeFC
