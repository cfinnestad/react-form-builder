import React from "react";
import {AllowedItems} from "./DefaultItems";

interface ShowTypesProps {
    AllowedItems: AllowedItems
}

const ShowTypes = ({AllowedItems}: ShowTypesProps) => {
    return <>
        {
            Object.values(AllowedItems).map((ItemType) => <div id={ItemType.Item.type}>{ItemType.Item.type}</div>)
        }
    </>
}

export default ShowTypes