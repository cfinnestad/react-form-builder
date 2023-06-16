import {TextSubtype, isText, FieldItem} from "../../Items";
import {Options} from "../../../Builder/Builder";

const TextValidate = (item: FieldItem, options: Options): boolean => {
    const element = document.getElementById(item.id)
    if (element === undefined) {
        console.log('Could not find element by ID')
    }
    // @ts-ignore
    item.value = document.getElementById(item.id)?.value
    item.errorText = undefined
    if(!isText(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (item.value !== undefined && item.minLength !== undefined && item.value.length < item.minLength) {
        item.errorText = options.getError('minLength', item)
    } else if (item.value !== undefined && item.maxLength !== undefined && item.value.length > item.maxLength) {
        item.errorText = options.getError('maxLength', item)
    }

    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default TextValidate