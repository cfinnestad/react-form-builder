import React from "react";
import {HiddenItem, ItemProps} from "../Items";
import {TextField} from "@mui/material";
import Filter from "../../Filter/Filter";

// TODO Use IsBuild parameter
// If true, render as text field
// If false, render as hidden field
// Still needs to render, just dont show


const Hidden = (fieldProps: ItemProps) => {
    const item = fieldProps.item as HiddenItem
    if(!fieldProps.options.IsBuild && !Filter(item, fieldProps.items, fieldProps.item.filter)) return <></>
    if (fieldProps.options.IsBuild) return <TextField label='Hidden Field' type={"text"} id={fieldProps.item.id} name={item.name} disabled={true} value={item.value}/>
    if (item.deprecated) return <></>
    return <TextField id={fieldProps.item.id} type={"hidden"} name={item.name} value={item.value} sx={{display:'none'}}/>
}

export default Hidden