import {isDate, FieldItem} from "../../Items";
import {Options} from "../../../Builder/Builder";
import {dateCmp} from "./index";

const DateValidate = (item: FieldItem, options: Options): boolean => {
    const element = document.getElementById(item.id)
    if (element === undefined) {
        console.log('Could not find element by ID')
    }
    // @ts-ignore
    item.value = document.getElementById(item.id)?.value
    item.errorText = undefined

    if (!isDate(item)) {
        item.errorText = options.getError('invalidType', item)
    } else if (item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.value !== undefined) {

        if (item.value === "Invalid Date") item.errorText = options.getError('value', item)

        else if (item.minDate && dateCmp(item.value, item.minDate, "isBefore")) item.errorText = options.getError('minDate', item)
        else if (item.maxDate && dateCmp(item.value, item.maxDate, "isAfter")) item.errorText = options.getError('maxDate', item)

    }

    if (item.errorText === undefined) {
        delete item.errorText
    }

    return !item.errorText
}

export default DateValidate