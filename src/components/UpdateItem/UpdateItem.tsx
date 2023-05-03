import React, {Dispatch, SetStateAction} from "react";
import {AnyItem} from "../Items/Items";

type UpdateItemProps = {
    Item: AnyItem,
    Items: AnyItem[],
    SetItems: Dispatch<SetStateAction<AnyItem[]>>,
}

const UpdateItem = ({Item, Items, SetItems}: UpdateItemProps) => {
    /**
     * TODO find the item in the items looking by ID list it may be in a group
     * update that items in the list
     * call SetItems with the new list
     */
    return
}

export default UpdateItem