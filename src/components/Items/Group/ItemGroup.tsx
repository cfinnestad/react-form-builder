import React from "react";
import {GroupItem, ItemProps} from "../Items";
import {Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import ShowItems from "../ShowItems";

const grid = 3
const getListStyle = (isDraggingOver: boolean):{} => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    minHeight: 40
});

const ItemGroup = ({Item, Options}: ItemProps) => {
    const item = Item as GroupItem
    return <>
        <Droppable type='Item' droppableId={item.id}>
            {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}
                >
                    <ShowItems Items={item.Items} Options={Options}  />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </>
}

export default ItemGroup