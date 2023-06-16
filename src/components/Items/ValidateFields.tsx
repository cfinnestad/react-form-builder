import {Options} from "../Builder";
import {AnyItem, isField} from "./Items";
import Filter from "../Filter";
import setItem from "./SetItem";

const ValidateFields = (items: AnyItem[], options: Options): boolean => {
    let result = true
    for (const [key, item] of items.entries()) {
        if (isField(item)) {
            if(Filter(item, items, item.filter)) {
                const ValidateFC = options.AllowedSubtypes[item.subtype]?.ValidateFC ?? undefined
                if (ValidateFC !== undefined) {
                    result =  ValidateFC(item, options) && result // we want to run all the validations, so they have to happen before the && result
                }
                options.SetItem({...item})
                // console.log("Validate Field: ", item.id, 'Value:', item.value, 'result:', result )
            }
        }
    }
    return result
}

export default ValidateFields