import {
    AnyItem,
    FilterType,
    isAndFilter,
    isEqFilter,
    isFieldFilter, isGteFilter,
    isGtFilter, isLteFilter, isLtFilter,
    isInFilter,
    isNotFilter,
    isOrFilter,
    GetItem
} from "../Items";
import GetValue from "../Items/GetValue";

const Filter = (item: AnyItem, items: AnyItem[], filter: FilterType|undefined): boolean => {
    if (filter == undefined) {
        return true
    }

    if (isFieldFilter(filter)) {
        const relatedField = GetItem(filter.fieldId, items)
        if (relatedField !== undefined) {
            const value = GetValue(relatedField)

            if (isEqFilter(filter)) {
                if(value instanceof Array) {
                    // @ts-ignore
                    return value.includes(filter.value)
                } else {
                    return value === filter.value
                }
            }
            if (isGtFilter(filter) && filter.value !== undefined)  {

                if(value instanceof Array) {
                    let result = false
                    value.map(curValue => {
                        // @ts-ignore
                        result ||= (curValue > filter.value)
                    })
                } else {
                    // @ts-ignore
                    return value > filter.value
                }
            }
            if (isGteFilter(filter)) {
                if(value instanceof Array) {
                    let result = false
                    value.map(curValue => {
                        // @ts-ignore
                        result ||= (curValue >= filter.value)
                    })
                } else {
                    // @ts-ignore
                    return value >= filter.value
                }
            }
            if (isLtFilter(filter)) {
                if(value instanceof Array) {
                    let result = false
                    value.map(curValue => {
                        // @ts-ignore
                        result ||= (curValue < filter.value)
                    })
                } else {
                    // @ts-ignore
                    return value < filter.value
                }
            }
            if (isLteFilter(filter)) {
                if(value instanceof Array) {
                    let result = false
                    value.map(curValue => {
                        // @ts-ignore
                        result ||= (curValue <= filter.value)
                    })
                } else {
                    // @ts-ignore
                    return value <= filter.value
                }
            }
            if (isInFilter(filter)) {
                if(value instanceof Array) {
                    //@ts-ignore
                    return filter.value.some(r=> value.includes(r))
                } else {
                    // @ts-ignore
                    return filter.value.some(r => r === value)
                }
            }
        }
    }
    if (isAndFilter(filter)) {
        let response = true;
        filter.filters.map(nextFilter => {
            response &&= Filter(item, items, nextFilter)
            if (!response) return response;
        })
        return response;
    }
    if (isOrFilter(filter)) {
        let response = false;
        filter.filters.map(nextFilter => {
            response ||= Filter(item, items, nextFilter)
            if (response) return response;
        })
        return response;
    }
    if (isNotFilter(filter)) {
        return !Filter(item, items, filter.filter)
    }
    return true
}

export default Filter