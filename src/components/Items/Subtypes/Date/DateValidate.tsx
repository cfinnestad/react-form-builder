import {isDate, FieldItem, Options} from "../../Items";
import {dateCmp} from "./index";

const DateValidate = (item: FieldItem, options: Options): boolean => {
    const element = document.getElementById(item.id)
    if (element === undefined) {
        console.log('Could not find element by ID')
    }
    // @ts-ignore
    const elemVal = document.getElementById(item.id)?.value
    if (elemVal && !item.value) item.value = elemVal
    item.errorText = undefined
    if (!isDate(item)) {
        item.errorText = options.getError('invalidType', item)
    } else if (item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.value !== undefined) {

        if (item.value === "Invalid Date") item.errorText = options.getError('invalidDate', item)

        else {
            let minErr = false, maxErr = false
            if (item.minDateComputed && dateCmp(item.value, item.minDateComputed, "isBefore")) minErr = true
            if (item.maxDateComputed && dateCmp(item.value, item.maxDateComputed, "isAfter")) maxErr = true

            if (item.minDateComputed && item.maxDateComputed && (minErr || maxErr)) item.errorText = options.getError('dateRange', item)
            else if (minErr) item.errorText = options.getError('minDate', item)
            else if (maxErr) item.errorText = options.getError('maxDate', item)
        }

    }

    if (item.errorText === undefined) {
        delete item.errorText
    }

    return !item.errorText
}

export default DateValidate