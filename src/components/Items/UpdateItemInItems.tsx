import {
    AnyItem,
    FieldFilter,
    FilterType,
    isComparisonFilter,
    isFieldFilter,
    isGroup,
    isList, isListItem,
    isNamed,
    isNotFilter, ListItem, NamedItem
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
let originalId = undefined as any

const UpdateItemInItems = (
    item: AnyItem,
    items:AnyItem[],
    prefix: string = ''
): void => {
    // console.log('********************************** item', item)
    let changedItemIds: ChangedItemIds|undefined = undefined
    items.map((curItem, index) => {
        if (item.id === curItem.id || (originalId && curItem.id === originalId)) {
            if (isNamed(item) && item.id !== prefix + item.name) {
                originalId = curItem.id
                changedItemIds = {oldId: originalId, newId: prefix + item.name} as ChangedItemIds
                item.id = prefix + item.name
            }
            items[index] = item
        } else if (isGroup(curItem)) {
            UpdateItemInItems(item, curItem.items, curItem.id + '-')
        } else if (isList(curItem)) {
            if(item.id === curItem.baseItem.id || (originalId && curItem.baseItem.id === originalId)) {
                if(isListItem(item)) {
                    originalId = item.id
                    item.id = prefix + item.name
                    changedItemIds = {oldId: originalId, newId: item.id} as ChangedItemIds
                    const newItem = {...curItem, baseItem: item}
                    delete newItem.list
                    items[index] = newItem
                }
            } else {
                UpdateItemInItems(item, curItem.list ?? [] as AnyItem[], prefix)
            }
        }
    })
    if (changedItemIds) {
        updateFilterIdsOnNameChange(items, changedItemIds)
    }
}

export default UpdateItemInItems