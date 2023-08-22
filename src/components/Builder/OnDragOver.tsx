import {DragOverEvent} from "@dnd-kit/core";
import {DragItem} from "../Items/findDragItem";
import {AnyItem} from "../Items";
import {updateItems} from "./OnDragEnd";
import {BuilderOptions, MAIN, TYPES} from "./Builder";
import FindDragItem from "../Items/findDragItem";
import {cloneDeep} from "lodash";

const OnDragOver = ({ active, over }: DragOverEvent, items: AnyItem[], options: BuilderOptions) => {
    console.error('DragOver Active', active)
    console.error('DragOver Over', over)
    if (!active || !over) return;
    const overRef = over.data?.current?.hasOwnProperty('Items')
        ? {items: cloneDeep(over.data.current.Items), groupId: TYPES, index: 0, item: over.data.current.Items[0]} as DragItem
        : FindDragItem(over.id, items, MAIN)
    const activeRef = active.data?.current?.hasOwnProperty('Items')
        ? {items: cloneDeep(active.data.current.Items), groupId: TYPES, index: 0, item: active.data.current.Items[0]} as DragItem
        : FindDragItem(active.id, items, MAIN)
    console.error('DragOver ActiveRef', activeRef)
    console.error('DragOver OverRef', overRef)
    if (!overRef || !activeRef) return

    if (activeRef.groupId === TYPES && overRef.groupId !== TYPES) {
        const newItems = [...activeRef.items]
        options.setItems(updateItems(items, overRef.groupId, [
            ...overRef.items.slice(0,overRef.index),
            ...newItems,
            ...overRef.items.slice(overRef.index,overRef.items.length)
        ]))
        return
    }


    // if (activeRef.groupId !== TYPES && overRef.groupId === TYPES) {
    //     options.setItems(updateItems(items, activeRef.groupId, activeRef.items.filter(item => item.id !== active.id)))
    //     return
    // }

    // if (activeRef.groupId === overRef.groupId) return;
    //
    // const activeItem = fixItemName(cloneDeep(activeRef.item), overRef)
    // options.setItems(
    //     updateItems(
    //         updateItems(items,activeRef.groupId,activeRef.items.splice(activeRef.index,1)),
    //         overRef.groupId,
    //         [
    //             ...overRef.items.slice(0,overRef.index),
    //             activeItem,
    //             ...overRef.items.slice(overRef.index, overRef.items.length)
    //         ]
    //     )
    // )
    // options.addItemSection(activeGroupId, activeContainer.items.filter(itm => active.id !== itm.id))
    // options.addItemSection(overGroupId, [
    //     ...overContainer.items.slice(0,overContainer.index),
    //     activeItem,
    //     ...overContainer.items.slice(overContainer.index, overContainer.items.length)
    // ])
};

export default OnDragOver