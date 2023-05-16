import {
    Filter,
    isAndFilter,
    isEqFilter,
    isFieldFilter, isGteFilter,
    isGtFilter, isLteFilter, isLtFilter,
    isNotFilter,
    isOrFilter, ItemProps
} from "../Items/Items";
import GetItem from "../Items/GetItem";

const Filter = (itemProps: ItemProps, filter: Filter|undefined): boolean => {
    if (filter === undefined) return true
    if (isFieldFilter(filter)) {
        const relatedField = GetItem(filter.fieldId, itemProps.items)
        if (relatedField !== undefined) {
            if (isEqFilter(filter)) {
                return relatedField.subtype.value == filter.value
            }
            if (isGtFilter(filter))  {
                // @ts-ignore
                return relatedField.subtype.value > filter.value
            }
            if (isGteFilter(filter)) {
                // @ts-ignore
                return relatedField.subtype.value >= filter.value
            }
            if (isLtFilter(filter)) {
                // @ts-ignore
                return relatedField.subtype.value < filter.value
            }
            if (isLteFilter(filter)) {
                // @ts-ignore
                return relatedField.subtype.value < filter.value
            }
        }
    }
    if (isAndFilter(filter)) {
        let response = true;
        filter.filters.map(nextFilter => {
            response &&= Filter(itemProps, nextFilter)
        })
    }
    if (isOrFilter(filter)) {
        let response = false;
        filter.filters.map(nextFilter => {
            response ||= Filter(itemProps, nextFilter)
        })
    }
    if (isNotFilter(filter)) {
        return !Filter(itemProps, filter.filter)
    }
    return true
}

export default Filter