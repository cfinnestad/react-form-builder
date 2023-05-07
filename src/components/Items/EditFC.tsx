import React from "react";
import {ItemProps} from "./Items";

const EditFC = (ItemProps:ItemProps) => {
    // @ts-ignore
    const data = ItemProps.Options.AllowedItems[ItemProps.Item.type].EditFC(ItemProps)
    return <>{data}</>
};

export default EditFC