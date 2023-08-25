import {AnyItem, FieldItem, HiddenItem, isField, isGroup, isHidden} from "./Items";

const GetNamedItem = (id: string|number, items:AnyItem[]): FieldItem|HiddenItem|undefined => {
    for(let i=0; i < items.length; i++) {
        const item = items[i]
        if (isGroup(item)) {
            const groupItem = GetNamedItem(id, item.items)
            if (groupItem !== undefined) {
                return groupItem
            }
        }
        if ((isField(item) || isHidden(item)) && (id === item.id)) {
            return item
        }
    }
    return undefined
}

export default GetNamedItem