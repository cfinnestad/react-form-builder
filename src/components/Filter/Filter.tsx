import {
    AnyItem,
    FilterType,
    isAndFilter,
    isEqFilter,
    isFieldFilter, isGteFilter,
    isGtFilter, isLteFilter, isLtFilter,
    isNotFilter,
    isOrFilter
} from "../Items/Items";
import GetItem from "../Items/GetItem";

const Filter = (item: AnyItem, items: AnyItem[], filter: FilterType|undefined): boolean => {
    if (filter == undefined) return true
    if (isFieldFilter(filter)) {
        const relatedField = GetItem(filter.fieldId, items)
        if (relatedField !== undefined) {
            if (isEqFilter(filter)) {
                if(relatedField.subtype.value instanceof Array) {
                    // @ts-ignore
                    return relatedField.subtype.value.includes(filter.value)
                } else {
                    return relatedField.subtype.value == filter.value
                }
            }
            if (isGtFilter(filter))  {

                if(relatedField.subtype.value instanceof Array) {
                    let result = false
                    relatedField.subtype.value.map(curValue => {
                        result ||= (curValue > filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.subtype.value > filter.value
                }
            }
            if (isGteFilter(filter)) {
                if(relatedField.subtype.value instanceof Array) {
                    let result = false
                    relatedField.subtype.value.map(curValue => {
                        result ||= (curValue >= filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.subtype.value >= filter.value
                }
            }
            if (isLtFilter(filter)) {
                if(relatedField.subtype.value instanceof Array) {
                    let result = false
                    relatedField.subtype.value.map(curValue => {
                        result ||= (curValue < filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.subtype.value < filter.value
                }
            }
            if (isLteFilter(filter)) {
                if(relatedField.subtype.value instanceof Array) {
                    let result = false
                    relatedField.subtype.value.map(curValue => {
                        result ||= (curValue <= filter.value)
                    })
                } else {
                    // @ts-ignore
                    return relatedField.subtype.value <= filter.value
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