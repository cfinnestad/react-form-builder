import {AnyItem, isField, Options} from "./Items";
import Filter from "../Filter";

const ValidateFields = (items: AnyItem[], options: Options): boolean => {
    let result = true
    for (const item of items) {
        if (isField(item) && !item.deprecated) {
            if(Filter(item, items, item.filter)) {
                const ValidateFC = options.AllowedSubtypes[item.subtype]?.ValidateFC ?? undefined
                if (ValidateFC !== undefined) {
                    result =  ValidateFC(item, options) && result // we want to run all the validations, so they have to happen before the && result
                }
                options.SetItem({...item})
            }
        }
    }
    return result
}

export default ValidateFields