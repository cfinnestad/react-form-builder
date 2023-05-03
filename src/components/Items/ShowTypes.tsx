import React from "react";
import { AllowedItems } from "./DefaultItems";

interface ShowTypesProps {
    AllowedItems: AllowedItems
}

const ShowTypes = ({AllowedItems}: ShowTypesProps) => {
    return <>
        {
            Object.values(AllowedItems).map(Item => <div id={Item.Item.type}>{Item.Item.type}</div>)
        }
    </>
}

export default ShowTypes