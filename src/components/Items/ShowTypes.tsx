import React, {CSSProperties} from "react";
import {AnyItem, AllowedItems} from "./Items";
import {useDraggable} from "@dnd-kit/core";

interface ShowTypesProps {
    AllowedItems: AllowedItems
}

interface ShowTypeProps {
    Item: AnyItem,
    index: number
}

const ShowType = ({Item}: ShowTypeProps) => {
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
            sortable: {containerId: '-Types-'}
        }
    });
    const style: CSSProperties | undefined = isDragging
        ? {
            position: "absolute",
            transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
            cursor: "move"
        }
        : {
            cursor: "pointer"
        };
    // @ts-ignore
    return <>
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {Item.type}
        </div>
        {isDragging && <div style={{ display: "none !important" }}>{Item.type}</div>}
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