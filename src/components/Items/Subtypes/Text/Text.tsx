import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {AnyItem, FieldItem, FieldProps, TextSubtype,} from "../../Items";
import {TextField} from "@mui/material";
import SetItem from "../../SetItem";

export const edit = ({Item, Items, SetItems}: FieldProps ) => {

    const item = Item as FieldItem
    const subtype = item.subtype as TextSubtype

    // TODO add return to display fields for editing.
    // going to call parent, then add all personal things inside.

    return <></>

}
const Text = ({Item, Items, SetItems, Options}: FieldProps ) => {
    const item = Item as FieldItem
    const subtype = item.subtype as TextSubtype

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, Item: FieldItem, Items: AnyItem[], SetItems: Dispatch<SetStateAction<AnyItem[]>>) => {
        const value = event.target.value || undefined
        if (item.required && value === undefined) {
            return false
        }
        Item.subtype.value = value
        SetItems(SetItem(Item,Items))
    }

    return <>
        <TextField id={item.id} name={item.name} label={item.label} multiline={subtype.multiline || false} type="text" value={subtype.value} onChange={(event) => onChange(event, Item, Items, SetItems) }/>
    </>
}

export default Text