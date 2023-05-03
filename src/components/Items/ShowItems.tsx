import React, {Dispatch, SetStateAction} from "react";
import { ItemProps } from "./Items";


type ShowItemsProps = {
    ItemPropsArray: ItemProps[]
}


const ShowItems = ({ItemPropsArray}: ShowItemsProps) => {
    return <>
        {
            ItemPropsArray.map(ItemProp => {ItemProp.ItemFC(ItemProp)})
        }
    </>
}

export default ShowItems