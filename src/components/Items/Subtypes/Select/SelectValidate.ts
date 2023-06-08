import {FieldItem, isSelect} from "../../Items";
import {Options} from "../../../Builder";

const SelectValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isSelect(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && item.options.filter(option => option.selected).length === 0) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default SelectValidate