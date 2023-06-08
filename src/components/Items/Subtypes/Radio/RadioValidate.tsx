import {FieldItem, isRadio} from "../../Items";
import {Options} from "../../../Builder";

const RadioValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isRadio(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && item.options.filter(option => option.selected).length === 0) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default RadioValidate