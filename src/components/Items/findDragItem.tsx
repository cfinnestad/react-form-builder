import {AnyItem, isGroup} from "./Items";


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