import React from "react";
import {GroupItem, ItemProps} from "../Items";
// import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from "react-beautiful-dnd";
import ShowItems from "../ShowItem";
import onDragEnd from "../../Builder/OnDragEnd";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import ShowItem from "../ShowItem";

const grid = 3
const getListStyle = (isDraggingOver: boolean):{} => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    minHeight: 40
});

const ItemGroup = ({item, options}: ItemProps) => {
    const myItem = item as GroupItem
    return <>
        <SortableContext
            items={myItem.items.map(item => item.id)}
            strategy={verticalListSortingStrategy}>
            {myItem.items.map((item) => <ShowItem key={item.id} item={item} items={myItem.items} options={options}/>)}
        </SortableContext>
    </>
}

export default ItemGroup