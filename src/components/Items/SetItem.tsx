import {AnyItem, GroupItem} from "./Items";

const SetItem = (item: AnyItem, items:AnyItem[]): AnyItem[] => {
    console.log('SETITEM', item)
    return items.map((curItem) => {
        console.log('AAAA', item.id, curItem.id, curItem.type)
        if (item.id === curItem.id) {
            console.log('SetItem',item)
            return item
        } else if (curItem.type === "Group") {
            (curItem as GroupItem).items = SetItem(item, (curItem as GroupItem).items)
        }
        return curItem
    })
}

export default SetItem