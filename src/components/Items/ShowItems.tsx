import React from "react";
import { ItemProps } from "./Items";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import {Card} from "@mui/material";

import styled from 'styled-components';

type ShowItemsProps = {
    ItemPropsArray: ItemProps[]
}
type ShowItemProps = {
    ItemProps: ItemProps,
    index: number
}

const grid:number = 8;
const getItemStyle = (draggableStyle: any, isDragging: boolean):{} => ({
    userSelect: 'none',
    padding: 2*grid,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});



const Handle = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
    margin: -0.5rem 0.5rem -0.5rem -0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
    background: #fff;
    border-right: 1px solid #ddd;
    color: #000;
`;

const ShowItem = ({ItemProps, index}: ShowItemProps) => {
    // @ts-ignore
    return <Draggable type='Item' draggableId={ItemProps.Item.id} index={index}>
        {(providedDraggable: DraggableProvided, snapshotDraggable:DraggableStateSnapshot) => (
            <Card
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                {...providedDraggable.dragHandleProps}
                style={getItemStyle(
                    providedDraggable.draggableProps.style,
                    snapshotDraggable.isDragging
                )}

            >
                <Handle
                    {...providedDraggable.dragHandleProps}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                            // fill="currentColor"
                            d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                        />
                    </svg>
                </Handle>
                { ItemProps.ItemFC(ItemProps)}
            </Card>
        )}
    </Draggable>
}


const ShowItems = ({ItemPropsArray}: ShowItemsProps) => {
    return <>
        {
            ItemPropsArray.map((ItemProp, index) => <ShowItem key={index} ItemProps={ItemProp} index={index}/> )
        }
    </>
}

export default ShowItems