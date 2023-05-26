import {BooleanSubtype, FieldItem, isBoolean} from "../../Items";
import {Options} from "../../../Builder/Builder";

const BooleanValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isBoolean(item)){
        item.errorText = options.getError('invalidType', item)
    } else if (item.required && !item.value) {
        item.errorText = options.getError('mustCheck', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default BooleanValidate