import {ItemProps} from "./Items";
import React from "react";

const ItemFC = (itemProps:ItemProps) => {
    // @ts-ignore
    const data = itemProps.options.AllowedItems[itemProps.item.type].ItemFC(itemProps)
    return <>{data}</>
};

export default ItemFC