import {FieldItem, isPhone} from "../../Items";
import {Options} from "../../../Builder/Builder";

const PhoneValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isPhone(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default PhoneValidate