import {AnyItem, isGroup, isList} from "./Items";


export type DragItem = {
    item: AnyItem,
    index: number,
    items: AnyItem[],
    groupId: string|number
}
const findDragItem = (id: string|number, items: AnyItem[], groupId: string|number): DragItem|undefined => {
    // console.log('findDragItem id', id)
    // console.log('findDragItem items', items)
    // console.log('findDragItem groupId', groupId)

    let result = undefined

    items.forEach((item, index) => {
      if (item.id === id) {
          // console.log('index', index)
          result = {id: id, index: index, items: items, groupId: groupId, item:item}
      } else if (isList(item) && item.baseItem.id === id) {
          result = {id: id, index: index, items: items, groupId: groupId, item:item.baseItem}
      }
      if (isGroup(item)) {
          const groupItem = findDragItem(id, item.items, item.id)
          if(groupItem) {
              // console.log('groupItem', groupItem)
              result = groupItem
          }
      } else if (isList(item) && isGroup(item.baseItem)) {
          const listItem    = findDragItem(id, item.baseItem.items, item.baseItem.id)
          if(listItem) {
              // console.log('listItem', listItem)
              result = listItem
          }
      }
    })
    return result
}

export default findDragItem