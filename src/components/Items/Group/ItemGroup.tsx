import React from "react";
import {GroupItem, ItemProps} from "../Items";
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import ShowItems from "../ShowItems";
import onDragEnd from "../../Builder/OnDragEnd";

const grid = 3
const getListStyle = (isDraggingOver: boolean):{} => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    minHeight: 40
});

const ItemGroup = ({Item, Options}: ItemProps) => {
    const item = Item as GroupItem
    return <>
        <DragDropContext onDragEnd={(results) => onDragEnd(results, item.Items, Options)}>
            <Droppable type={item.id} droppableId={item.id}>
                {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        <ShowItems Items={item.Items} Options={Options} type={item.id} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </>
}

export default ItemGroup