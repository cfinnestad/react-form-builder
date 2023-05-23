import {
    AnyItem,
    FilterType,
    isAndFilter,
    isEqFilter,
    isFieldFilter, isGteFilter,
    isGtFilter, isLteFilter, isLtFilter,
    isInFilter,
    isNotFilter,
    isOrFilter
} from "../Items/Items";
import GetItem from "../Items/GetItem";

const Filter = (item: AnyItem, items: AnyItem[], filter: FilterType|undefined): boolean => {
    if (filter == undefined) {
        return true
    }

    if (isFieldFilter(filter)) {
        const relatedField = GetItem(filter.fieldId, items)
        if (relatedField !== undefined) {
            if (isEqFilter(filter)) {
                if(relatedField.value instanceof Array) {
                    // @ts-ignore
                    return relatedField.value.includes(filter.value)
                } else {
                    return relatedField.value == filter.value
                }
            }
            if (isGtFilter(filter))  {

                if(relatedField.value instanceof Array) {
                    let result = false
                    relatedField.value.map(curValue => {
                        result ||= (curValue > filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.value > filter.value
                }
            }
            if (isGteFilter(filter)) {
                if(relatedField.value instanceof Array) {
                    let result = false
                    relatedField.value.map(curValue => {
                        result ||= (curValue >= filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.value >= filter.value
                }
            }
            if (isLtFilter(filter)) {
                if(relatedField.value instanceof Array) {
                    let result = false
                    relatedField.value.map(curValue => {
                        result ||= (curValue < filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.value < filter.value
                }
            }
            if (isLteFilter(filter)) {
                if(relatedField.value instanceof Array) {
                    let result = false
                    relatedField.value.map(curValue => {
                        result ||= (curValue <= filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.value <= filter.value
                }
            }
            if (isInFilter(filter)) {
                if(relatedField.value instanceof Array) {
                    //@ts-ignore
                    return filter.value.some(r=> relatedField.value.includes(r))
                } else {
                    return filter.value.some(r => r === relatedField.value)
                }
            }
        }
    }
    if (isAndFilter(filter)) {
        let response = true;
        filter.filters.map(nextFilter => {
            response &&= Filter(item, items, nextFilter)
        })
    }
    if (isOrFilter(filter)) {
        let response = false;
        filter.filters.map(nextFilter => {
            response ||= Filter(item, items, nextFilter)
        })
    }
    if (isNotFilter(filter)) {
        return !Filter(item, items, filter.filter)
    }
    return true
}

export default Filter