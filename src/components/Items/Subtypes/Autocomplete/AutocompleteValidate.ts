import {FieldItem, isAutocomplete} from "../../Items";
import {Options} from "../../../Builder/Builder"


const ServiceCityValidate = (item: FieldItem, options: Options): boolean => {
    item.errorText = undefined
    if (!isAutocomplete(item)){
        item.errorText = options.getError('invalidType', item)
    } else if(item.required && !item.value) {
        item.errorText = options.getError('required', item)
    }
    if(item.errorText === undefined) {
        delete item.errorText
    }
    return !item.errorText
}

export default ServiceCityValidate
