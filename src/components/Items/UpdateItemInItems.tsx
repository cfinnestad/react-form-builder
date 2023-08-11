import {
    AnyItem,
    FieldFilter,
    FilterType,
    isComparisonFilter,
    isFieldFilter,
    isGroup,
    isNamed,
    isNotFilter
} from "./Items";

type ChangedItemIds = {
    oldId: string,
    newId: string,
}

// replace filter fieldId in each inner item where it exists, then commit the whole object at once
const updateFilterIdsOnNameChange = (items: AnyItem[], changedItemIds : ChangedItemIds): AnyItem[] => {
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

    return items.map(item => {
        if (item.filter) {
            const oldFilter = JSON.stringify(item.filter)
            const newFilter = JSON.stringify(updateItemFilter(item.filter,changedItemIds))
            if (oldFilter !== newFilter) {
                item = {...item, filter: JSON.parse(newFilter)}
            }
        }
        if (isGroup(item)) {
            const originalItems = JSON.stringify(item.items)
            const newItems = JSON.stringify(updateFilterIdsOnNameChange(item.items, changedItemIds))
            if (originalItems !== newItems) {
                item = {...item, items: JSON.parse(newItems)}
            }
        }
        return item
    })
}

const UpdateItemInItems = (item: AnyItem, items:AnyItem[], prefix: string = ''): AnyItem[] => {
    let changedItemIds: ChangedItemIds|undefined = undefined
    let newItems = items.map((curItem) => {
        if (item.id === curItem.id) { // the id may be changing
            if (isNamed(item) && item.id !== prefix + item.name) {
                changedItemIds = {oldId: item.id, newId: prefix + item.name} as ChangedItemIds
                item.id = prefix + item.name
            }
            return item
        } else if (isGroup(curItem)) {
            curItem.items = UpdateItemInItems(item, curItem.items, curItem.id + '-')
        }
        return curItem
    })
    if (changedItemIds) {
        newItems = updateFilterIdsOnNameChange(newItems, changedItemIds)
    }
    return newItems
}

export default UpdateItemInItems