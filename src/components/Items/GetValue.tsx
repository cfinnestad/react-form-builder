import {FieldItem, HiddenItem, isAutocomplete, isCheckbox, isRadio, isSelect} from "./Items";

const GetValue = (item: FieldItem | HiddenItem): string|number|boolean|string[]|File[]|undefined => {
    let value = item.value ?? undefined

    if (isRadio(item)) {
        value = item.options.filter(option => option.selected === true).map(option => option.value ?? option.label)[0] ?? undefined
    } else if (isAutocomplete(item)) {
        if(item.searchableOptionsName) {
            const options = item.options.filter(option => option.value?.toLowerCase() === item.value?.toLowerCase() || option.label?.toLowerCase() === item.value?.toLowerCase())
            if(item.value && options.length > 0) {
                value = item.options[0]?.value ?? undefined
            }
        } else {
            value = item.options.filter(option => option.label === item.value)[0]?.value ?? item.value
        }
        value = value === '' ? undefined : value
    } else if(isCheckbox(item)) {
        value = item.options.filter(option => option.selected === true).map(option => option.value ?? option.label)
    } else if(isSelect(item)) {
        if (item.multiples) {
            value = item.options.filter(option => option.selected === true).map(option => option.value ?? option.label)
        } else {
            value = item.options.filter(option => option.selected === true).map(option => option.value ?? option.label)[0] ?? undefined
        }
    }

    return value
}

export default GetValue