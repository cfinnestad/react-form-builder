import React, {Dispatch, SetStateAction} from "react";


const ShowItems = ({ItemProps}: ItemProps) => {
    return <>
        { ItemProps.map((ItemProp) => {ItemProp.ItemFC(ItemProp)}) }
    </>
}

export default ShowItems