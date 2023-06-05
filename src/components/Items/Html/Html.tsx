import React from "react";
import {isHtml, ItemProps} from "../Items";
import {Typography} from "@mui/material";

const Html = (fieldProps: ItemProps) => {
    if(!isHtml(fieldProps.item)) return <></>
    return <Typography dangerouslySetInnerHTML={{__html: fieldProps.item.content}}/>
}

export default Html