import {CheckboxSubtype, Options} from "../../Items";

const CheckboxValidate = (item: CheckboxSubtype, options: Options): boolean => {
    item.errorText = undefined
    if(item.required && item.options.filter(option => option.selected).length === 0) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default CheckboxValidate