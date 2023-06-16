import {FieldItem, isPhone} from "../../Items";
import {Options} from "../../../Builder/Builder";

const PhoneValidate = (item: FieldItem, options: Options): boolean => {
    const element = document.getElementById(item.id)
    if (element === undefined) {
        console.log('Could not find element by ID')
    }
    // @ts-ignore
    item.value = document.getElementById(item.id)?.value
    item.errorText = undefined
    if (!isPhone(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.required && item.value !== undefined && item.value.length != 14) {
        item.errorText = options.getError('invalidPhone', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default PhoneValidate