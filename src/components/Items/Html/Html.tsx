import React from "react";
import {HTMLProps} from "../Items";
import {Typography} from "@mui/material";

const Html = (fieldProps: HTMLProps) => {
    return <Typography dangerouslySetInnerHTML={{__html: fieldProps.item.content}}/>
}

export default Html