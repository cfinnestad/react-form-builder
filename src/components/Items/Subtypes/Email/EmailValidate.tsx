import {FieldItem, isEmail} from "../../Items";
import {Options} from "../../../Builder/Builder";

const EmailValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isEmail(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.value !== undefined && item.maxLength !== undefined && item.value.length > item.maxLength) {
        item.errorText = options.getError('maxLength', item)
    } else if (item.value !== undefined && !item.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        item.errorText = options.getError('email', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default EmailValidate