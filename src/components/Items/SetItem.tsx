import {AnyItem, isGroup} from "./Items";

const SetItem = (item: AnyItem, items:AnyItem[]): AnyItem[] => {
    return items.map((curItem) => {
        if (item.id === curItem.id) {
            return item
        } else if (isGroup(curItem)) {
            curItem.items = SetItem(item, curItem.items)
        }
        return curItem
    })
}

export default SetItem