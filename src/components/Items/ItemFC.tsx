import {ItemProps} from "./Items";
import React from "react";

const ItemFC = (ItemProps:ItemProps) => {
    // @ts-ignore
    const data = ItemProps.Options.AllowedItems[ItemProps.Item.type].ItemFC(ItemProps)
    return <>{data}</>
};

export default ItemFC