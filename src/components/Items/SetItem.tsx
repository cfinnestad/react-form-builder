import {AnyItem, GroupItem} from "./Items";

const SetItem = (Item: AnyItem, Items:AnyItem[]): AnyItem[] => {
    console.log('SETITEM', Item)
    return Items.map((curItem) => {
        console.log('AAAA', Item.id, curItem.id, curItem.type)
        if (Item.id === curItem.id) {
            console.log('SetItem',Item)
            return Item
        } else if (curItem.type === "Group") {
            (curItem as GroupItem).Items = SetItem(Item, (curItem as GroupItem).Items)
        }
        return curItem
    })
}

export default SetItem