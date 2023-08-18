import React, {CSSProperties} from "react";
import {AnyItem, AllowedItems} from "./Items";
import {useDraggable} from "@dnd-kit/core";
import {TYPES} from "../Builder/Builder";
import { Box } from "@mui/material";

interface ShowTypesProps {
    AllowedItems: AllowedItems
}

interface ShowTypeProps {
    Item: AnyItem,
    index: number
}

const ShowType = ({Item}: ShowTypeProps) => {
    console.log('ShoeType Item', Item)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    } = useDraggable({
        id: Item.id,
        data: {
            Items: [Item],
            sortable: {containerId: TYPES}
        }
    });
    console.log('attributes', attributes)
    const style: CSSProperties | undefined = isDragging
        ? {
            position: "absolute",
            transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
            cursor: "move"
        }
        : {
            cursor: "grab"
        };
    // @ts-ignore
    return <>
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Box>{Item.type}</Box>
        </div>
        {isDragging && <div style={{ display: "none !important" }}><Box>{Item.type}</Box></div>}
    </>
}


const ShowTypes = ({AllowedItems}: ShowTypesProps) => {
    return <>
        {
            // Object.values(AllowedItems).map(Item => <div id={Item.Item.type}>{Item.Item.type}</div>)
            Object.values(AllowedItems).map((Item, index) => <ShowType key={index} Item={Item.Item} index={index}/>)
        }
    </>
}

export default ShowTypes