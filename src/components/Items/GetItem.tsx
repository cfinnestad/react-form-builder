import {AnyItem, FieldItem, HiddenItem, isField, isGroup, isHidden} from "./Items";

const GetItem = (id: string|number, items:AnyItem[]): AnyItem|undefined => {
    for(let i=0; i < items.length; i++) {
        const item = items[i]
        if (id === item.id) {
            return item
        }
        if (isGroup(item)) {
            const groupItem = GetItem(id, item.items)
            if (groupItem !== undefined) {
                return groupItem
            }
        }
    }
    return undefined
}

export default GetItem