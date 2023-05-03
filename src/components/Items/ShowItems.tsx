import React from "react";
import { ItemProps } from "./Items";


type ShowItemsProps = {
    ItemPropsArray: ItemProps[]
}


const ShowItems = ({ItemPropsArray}: ShowItemsProps) => {
    return <>
        {
            ItemPropsArray.map(ItemProp => <div>{ItemProp.ItemFC(ItemProp)}</div> )
        }
    </>
}

export default ShowItems