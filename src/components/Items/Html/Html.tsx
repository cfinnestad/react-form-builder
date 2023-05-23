import React from "react";
import {isHtml, ItemProps} from "../Items";

const Html = (fieldProps: ItemProps) => {
    if(!isHtml(fieldProps.item)) return <></>
    return <div dangerouslySetInnerHTML={{__html: fieldProps.item.content}}/>
}

export default Html