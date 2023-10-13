import React from "react";
import {HiddenItem, HiddenProps} from "../Items";
import {TextField} from "@mui/material";

const Hidden = (fieldProps: HiddenProps) => {
    const item = fieldProps.item as HiddenItem
    if (fieldProps.options.Mode === "build") return <TextField label='Hidden Field' type={"text"} id={fieldProps.item.id} name={item.name} disabled={true} value={item.value}/>
    if (item.deprecated) return <></>
    return <TextField id={fieldProps.item.id} type={"hidden"} name={item.name} value={item.value} sx={{display:'none'}}/>
}

export default Hidden