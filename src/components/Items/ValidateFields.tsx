import {Options} from "../Builder/Builder";
import {AnyItem, isField} from "./Items";

const ValidateFields = (items: AnyItem[], options: Options): boolean => {
    let result = true
    for (const item of items) {
        if (isField(item)) {
            const ValidateFC = options.AllowedSubtypes[item.subtype]?.ValidateFC ?? undefined
            if (ValidateFC !== undefined) {
                result =  ValidateFC(item, options) && result // we want to run all the validations, so they have to happen before the && result
            }
        }
    }
    options.setItems(items)
    return result
}

export default ValidateFields