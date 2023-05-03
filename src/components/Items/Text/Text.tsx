import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {AnyItem, TextItem, TextProps} from "../Items";
import {TextField} from "@mui/material";
import UpdateItem from "../../UpdateItem/UpdateItem";

const Text = ({Item, Items, SetItems, Options}: TextProps) => {

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: TextItem, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value || undefined
        if (Item.required && value === undefined) {
            return false
        }
        Item.value = value
        UpdateItem({Item: Item, Items: Items, SetItems: SetItems})
    }

    return <>
        <TextField fullWidth id={Item.id} name={Item.name} label={Item.label} multiline={Item.multiline} type="text" value={Item.value} onChange={(event) => onChange(event, Item, Items, SetItems) }/>
    </>
}

export default Text