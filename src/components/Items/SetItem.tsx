import {GroupItem} from "./Items";

const SetItem = (Item: AnyItem, Items:AnyItem[]): AnyItem[] => {

    const items: AnyItem[] = [...Items]
    let found = false
    items.forEach((curItem, index) => {
        if(!found) {
            if (Item.id === curItem.id) {
                items[index] = Item
                found = true
            } else if (curItem.type === "Group") {
                (curItem as GroupItem).Items = SetItem(Item, (curItem as GroupItem).Items)
                found = true
            }
        }
    })
    return items

}

export default SetItem