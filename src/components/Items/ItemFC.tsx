import {ItemProps} from "./Items";
import React from "react";

const ItemFC = (itemProps:ItemProps) => {
    // @ts-ignore
    const data = itemProps.options.AllowedItems[itemProps.item.type].ItemFC(itemProps)
    return <>{data}<div>ItemFC: {new Date().toLocaleString() + ""} <pre>{JSON.stringify(itemProps.item,null,4)}</pre></div></>
};

export default ItemFC