import React from 'react'
import {DragOverEvent} from "@dnd-kit/core";
import findDragItem from "../Items/findDragItem";
import {AnyItem, Options} from "../Items";
import {updateItems} from "./OnDragEnd";
const OnDragOver = ({ active, over }: DragOverEvent, items: AnyItem[], options: Options) => {
    if (!active || !over) return;

    // Find the containers
    const overContainer = findDragItem(over.id, items, '-Main-')
    if (!overContainer) return
    if (active.data.current?.sortable.containerId === '-Types-') {
        options.setItems(updateItems(items,overContainer.groupId,[
            ...overContainer.items.slice(0,overContainer.index),
            ...active.data.current.Items,
            ...overContainer.items.slice(overContainer.index, overContainer.items.length)
        ]))
        return
    }

    const activeContainer = findDragItem(active.id, items, '-Main-')

    if (!activeContainer || activeContainer.groupId === overContainer.groupId) return;

    options.setItems(
        updateItems(
            updateItems(
                items,
                activeContainer.groupId,
                activeContainer.items.filter(itm => active.id !== itm.id)
            ),
            overContainer.groupId,
            [
                ...overContainer.items.slice(0,overContainer.index),
                activeContainer.item,
                ...overContainer.items.slice(overContainer.index, overContainer.items.length)
            ]
        )
    )
};