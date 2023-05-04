import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {AnyItem, TextProps, TextItem, } from "../Items";
import {TextField} from "@mui/material";
import SetItem from "../SetItem";

export const edit = ({Item, Items, SetItems}: TextProps ) => {

}
const Text = ({Item, Items, SetItems, Options}: TextProps) => {
    const item = Item as TextItem

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: TextItem, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value || undefined
        if (item.required && value === undefined) {
            return false
        }
        Item.value = value
        SetItems(SetItem(Item,Items))
    }

    return <>
        <TextField id={Item.id} name={Item.name} label={Item.label} multiline={Item.multiline} type="text" value={Item.value} onChange={(event) => onChange(event, Item, Items, SetItems) }/>
    </>
}

export default Text