import React from "react";
import {FieldItem, FieldProps, ItemProps} from "../Items";

const SubtypeFC = (itemProps:ItemProps) => {
    // @ts-ignore
    const data = itemProps.Options?.AllowedSubtypes[(itemProps.Item as FieldItem).subtype.subtype].SubtypeFC(itemProps as FieldProps)
    return <>
        { data }
        </>
};

export default SubtypeFC
