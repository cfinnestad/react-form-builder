import React from "react";
import {ItemProps} from "./Items";

const EditFC = (ItemProps:ItemProps) => {
    // @ts-ignore
    const data = ItemProps.options.AllowedItems[ItemProps.item.type].EditFC(ItemProps)
    return <>{data}</>
};

export default EditFC