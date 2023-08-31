import React from "react";
import {AnyItem, AllowedItems} from "./Items";
import {Card} from "@mui/material";

interface ShowTypesProps {
    AllowedItems: AllowedItems,
    addItems: (items: AnyItem[]) => void
}

interface ShowTypeProps {
    Item: AnyItem,
    addItems: (items: AnyItem[]) => void
}

const ShowType = ({Item, addItems}: ShowTypeProps) => {
    // const {
    //     attributes,
    //     listeners,
    //     setNodeRef,
    //     transform,
    //     isDragging
    // } = useDraggable({
    //     id: Item.id,
    //     data: {
    //         Items: [Item],
    //         sortable: {containerId: TYPES}
    //     }
    // });
    // @ts-ignore
    return <>
        <Card variant="outlined" onClick={() => addItems([Item])} style={{cursor: "cell", margin: "3px", padding: "2px"}}>
            {Item.type}
        </Card>
    </>
}


const ShowTypes = ({AllowedItems, addItems}: ShowTypesProps) => {
    return <>
        {
            // Object.values(AllowedItems).map(Item => <div id={Item.Item.type}>{Item.Item.type}</div>)
            Object.values(AllowedItems).map((Item, index) => <ShowType key={index} Item={Item.Item} addItems={addItems}/>)
        }
    </>
}

export default ShowTypes