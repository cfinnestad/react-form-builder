import {AnyItem, isGroup} from "./Items";

const DeleteItem = (id: string|number, items: AnyItem[])=> {
    return items.filter(item => item.id !== id).map(item => {
        if (isGroup(item)) {
            item.items = DeleteItem(id, item.items)
        }
        return item
    })
}

export default DeleteItem