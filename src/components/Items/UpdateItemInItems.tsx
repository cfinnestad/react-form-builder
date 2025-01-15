import {
    AnyItem,
    FieldFilter,
    FilterType,
    isComparisonFilter,
    isFieldFilter,
    isGroup,
    isList,
    isNamed,
    isNotFilter
} from "./Items";

type ChangedItemIds = {
    oldId: string,
    newId: string,
}

// replace filter fieldId in each inner item where it exists, then commit the whole object at once
const updateFilterIdsOnNameChange = (items: AnyItem[], changedItemIds : ChangedItemIds): void => {
    function updateItemFilter(filter: FilterType, changedItemIds: ChangedItemIds) {
        if (isFieldFilter(filter) && filter.fieldId === changedItemIds.oldId) {
            filter = {...filter, fieldId: changedItemIds.newId} as FieldFilter
        } else if (isComparisonFilter(filter)) {
            filter.filters.map(fltr => updateItemFilter(fltr,changedItemIds))
        } else if (isNotFilter(filter)) {
            updateItemFilter(filter.filter, changedItemIds)
        }
        return filter;
    }

    items.map(item => {
        if (item.filter) {
            updateItemFilter(item.filter,changedItemIds)
        }
        if (isGroup(item)) {
            updateFilterIdsOnNameChange(item.items, changedItemIds)
        } else if(isList(item)) {
            if (item.filter) {
                updateItemFilter(item.filter,changedItemIds)
            }
            if (item.baseItem.filter) {
                updateItemFilter(item.baseItem.filter,changedItemIds)
            }
        }
    })
}

// when typing quickly, a name change may not be fully committed yet when setting the id, so compare on the original
let originalId = undefined as string|undefined

export const updateChildItemsInItems = (
    items: AnyItem[],
    changedItemIds: ChangedItemIds[],
    prefix: string
): void => {
    items.map(item => {

        if (isNamed(item)) {
            originalId = item.id
            item.id = prefix + item.name
            if (originalId !== item.id) {
                changedItemIds.push({oldId: originalId, newId: item.id})
            }
            if (isGroup(item)) {
                updateChildItemsInItems(item.items,changedItemIds,item.id + '-')
            }
        }
        if (isList(item)) {
            updateChildItemsInItems(item?.listItems ?? [], changedItemIds, item.baseItem.id + '-')
        }
    })
}

const UpdateItemInItems = (
    item: AnyItem,
    items:AnyItem[],
    prefix: string = ''
): void => {
    const changedItemIds = [] as ChangedItemIds[]
    items.map((curItem, index) => {
        if (item.id === curItem.id || (originalId && curItem.id === originalId)) {
            if (isNamed(item) && item.id !== prefix + item.name) {
                item.id = prefix + item.name + '-' + index
                changedItemIds.push({oldId: curItem.id, newId: item.id} as ChangedItemIds)
                if (isGroup(item)) {
                    updateChildItemsInItems(item.items,changedItemIds,item.id + '-')
                } else if (isList(item) && item.listItems && item.listItems.length > 0) {
                    item.listItems.map((i,idx) => {
                        i.id = item.baseItem.id + '-' + idx.toString() + '-' + i.name
                        if (isGroup(i)) {
                            updateChildItemsInItems(i.items, changedItemIds, i.id + '-')
                        }
                    })
                }
            }
            items[index] = item
        } else if (isGroup(curItem)) {
            UpdateItemInItems(item, curItem.items, curItem.id + '-')
        } else if (isList(curItem)) {
            if(item.id === curItem.baseItem.id || (originalId && curItem.baseItem.id === originalId)) {
                if (isNamed(item) && item.id !== prefix + item.name) {
                    changedItemIds.push({oldId: curItem.baseItem.id, newId: prefix + item.name} as ChangedItemIds)
                    item.id = prefix + item.name
                    if (isGroup(item)) {
                        updateChildItemsInItems(item.items,changedItemIds,item.id + '-')
                    }
                }
                items[index] = {...curItem, baseItem: item} as AnyItem
            } else {
                if (isGroup(curItem.baseItem)) {
                    UpdateItemInItems(item, curItem.baseItem.items ?? [], curItem.baseItem.id + '-')
                }
                if (curItem?.listItems && curItem.listItems.length > 0) {
                    UpdateItemInItems(item, curItem.listItems ?? [] as AnyItem[], prefix)
                }
            }
        }
    })
    changedItemIds.map(changedItemId => {
        updateFilterIdsOnNameChange(items, changedItemId)
    })
}

export default UpdateItemInItems