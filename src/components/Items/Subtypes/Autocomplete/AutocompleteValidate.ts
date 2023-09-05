import {FieldItem, isAutocomplete, Options} from "../../Items";


const AutocompleteValidate = (item: FieldItem, options: Options): boolean => {
    const element = document.getElementById(item.id)
    if (element === undefined) {
        console.error('Could not find element by ID')
    }
    // @ts-ignore
    item.value ??= document.getElementById(item.id)?.value

    item.errorText = undefined
    if (!isAutocomplete(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    } else if (!item.allowAnyInput && item.options.filter(option => option.value?.toLowerCase() === item.value?.toLowerCase() || option.label?.toLowerCase() === item.value?.toLowerCase()).length === 0 ) {
        item.errorText = options.getError('invalidSelection', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default AutocompleteValidate
