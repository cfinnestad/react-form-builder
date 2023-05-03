import React, {ChangeEvent} from "react";
import {TextProps} from "../Items";
import {TextField} from "@mui/material";
import UpdateItem from "../../UpdateItem/UpdateItem";

const Text = ({Item, Items, SetItems, Options}: TextProps) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        if (Item.required && value === undefined) {
            return false
        }
        Item.value = value
        UpdateItem({Item: item, Items: Items, SetItems: SetItems})
    }
    return <>
        <TextField id={Item.id} name={Item.name} label={Item.label} multiline={Item.multiline} type="text" value={Item.value} onChange={onChange}/>
    </>
}

export default Text