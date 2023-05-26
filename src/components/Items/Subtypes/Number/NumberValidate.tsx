import {isNumber, FieldItem} from "../../Items";
import {Options} from "../../../Builder/Builder";

const NumberValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isNumber(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default NumberValidate