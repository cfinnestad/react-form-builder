import React from "react";
import {AllowedItems} from "./DefaultItems";
import {Draggable, DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import {Card, Typography} from "@mui/material";
import styled from 'styled-components';
import {AnyItem} from "./Items";

interface ShowTypesProps {
    AllowedItems: AllowedItems
}

interface ShowTypeProps {
    Item: AnyItem,
    index: number
}


const grid:number = 2;

const getItemStyle = (draggableStyle: any, isDragging: boolean):{} => ({
    userSelect: 'none',
    padding: 2*grid,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'lightgrey',
    ...draggableStyle
});




const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px;
`;

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;

const ShowType = ({Item, index}: ShowTypeProps) => {
    // @ts-ignore
    return <Draggable type='Item' draggableId={Item.id} index={index}>
        {(providedDraggable: DraggableProvided, snapshotDraggable:DraggableStateSnapshot) => (
            <React.Fragment>
                <Card
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    style={getItemStyle(
                        providedDraggable.draggableProps.style,
                        snapshotDraggable.isDragging
                    )}
                >
                    <Typography component="div">
                        {Item.type}
                    </Typography>
                    {snapshotDraggable.isDragging && (
                        <Clone>{Item.type}</Clone>
                    )}
                </Card>
            </React.Fragment>
        )}
    </Draggable>
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