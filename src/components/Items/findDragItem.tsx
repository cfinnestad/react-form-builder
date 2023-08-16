import React from "react";
import {AnyItem, GroupItem, isGroup} from "./Items";


export type DragItem = {
    item: AnyItem,
    index: number,
    items: AnyItem[],
    groupId: string|number
}
const findDragItem = (id: string|number, items: AnyItem[], groupId: string|number): DragItem|undefined => {
    // console.log('id', id)
    // console.log('items', items)
    // console.log('groupId', groupId)

    let result = undefined

    items.forEach((item, index) => {
      if (item.id === id) {
          // console.log('index', index)
          result = {id: id, index: index, items: items, groupId: groupId}
      }
      if (isGroup(item)) {
          const groupItem = findDragItem(id, item.items, item.id)
          if(groupItem) {
              console.log('groupItem', groupItem)
              result = groupItem
          }
      }
    })
    return result
}

export default findDragItem