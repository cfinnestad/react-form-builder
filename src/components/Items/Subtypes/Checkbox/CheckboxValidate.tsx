import {CheckboxSubtype, FieldItem, isCheckbox} from "../../Items";
import {Options} from "../../../Builder/Builder";

const CheckboxValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if(!isCheckbox(item)) {
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default CheckboxValidate