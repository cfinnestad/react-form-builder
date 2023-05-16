import {AnyItem, FieldItem, isField, isGroup} from "./Items";

const GetItem = (id: string|number, items:AnyItem[]): FieldItem|undefined => {
    console.log('GetItem', id)
    for(let i=0; i<items.length; i++) {
        const item = items[i]
        if (isGroup(item)) {
            const groupItem = GetItem(id, item.items)
            if (groupItem !== null) {
                return groupItem
            }
        }
        if (isField(item) && id == i) {
            return item
        }
    }
    return undefined
}

export default GetItem