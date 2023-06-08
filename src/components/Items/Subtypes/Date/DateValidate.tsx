import {isDate, FieldItem} from "../../Items";
import {Options} from "../../../Builder/Builder";
import dayjs, {ManipulateType} from 'dayjs'
import {dateFormat} from "./index";

const DateValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined

    const isErr = (val: string | null, cmp: string, which: string) => {
        return dayjs(val)[which](dayjs(cmp))
    }
    const getOffset = (offset: number, unit: ManipulateType) => {
        if (offset < 0) return dateFormat(dayjs(today()).subtract(-offset, unit))
        else return dateFormat(dayjs(today()).add(offset, unit))
    }
    const today = () => {
        return dateFormat(dayjs())
    }

    if (!isDate(item)) {
        item.errorText = options.getError('invalidType', item)
    } else if (item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.value !== undefined) {

        if (item.value === "Invalid Date") item.errorText = options.getError('value', item)

        else if (item.minDate && isErr(item.value, item.minDate, "isBefore")) item.errorText = options.getError('minDate', item)
        else if (item.maxDate && isErr(item.value, item.maxDate, "isAfter")) item.errorText = options.getError('maxDate', item)

        else {
            let offsets = {
                minDateOffsetDays: "d",
                minDateOffsetMonths: "M",
                minDateOffsetYears: "y",
                maxDateOffsetDays: "d",
                maxDateOffsetMonths: "M",
                maxDateOffsetYears: "y"
            }

            for (let key in offsets) {
                let unit = offsets[key] as ManipulateType
                let which = (key.startsWith("min")) ? "isBefore" : "isAfter"

                if (item[key] && isErr(item.value, getOffset(item[key], unit), which))
                    item.errorText = options.getError(key, item)
            }
        }

    }

    if (item.errorText === undefined) {
        delete item.errorText
    }

    return !item.errorText
}

export default DateValidate