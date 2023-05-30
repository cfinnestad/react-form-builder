import {isNumber, FieldItem} from "../../Items";
import {Options} from "../../../Builder/Builder";

const NumberValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isNumber(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
        return false
    } else if (item.value && isNaN(item.value)) {     // input is not a number
        item.errorText = options.getError('nan', item)
    } else if (item.value !== undefined && item?.min !== undefined && item.value < item?.min  ) {
        item.errorText = options.getError('min', item)
    } else if (item.value !== undefined && item.max !== undefined && item.value > item.max) {
        item.errorText = options.getError('max', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default NumberValidate