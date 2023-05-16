import React from "react";
import {isHtml, ItemProps} from "../Items";
import Filter from "../../Filter/Filter";

const Html = (fieldProps: ItemProps) => {
    if(!isHtml(fieldProps.item)) return <></>
    if(!fieldProps.options.IsBuild && !Filter(fieldProps, fieldProps.item.filter)) return <></>
    return <div dangerouslySetInnerHTML={{__html: fieldProps.item.content}}/>
}

export default Html