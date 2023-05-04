import React, {Dispatch, SetStateAction} from "react";
import {AnyItem} from "../Items/Items";
import SetItem from "../Items/SetItem";

type UpdateItemProps = {
    Item: AnyItem,
    Items: AnyItem[],
    SetItems: Dispatch<SetStateAction<AnyItem[]>>,
}

const UpdateItem = ({Item, Items, SetItems}: UpdateItemProps) => {
    SetItems(SetItem(Item,Items))
    return
}

export default UpdateItem