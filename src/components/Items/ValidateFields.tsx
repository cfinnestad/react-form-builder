import {AnyItem, isField, isGroup, Options} from "./Items";
import Filter from "../Filter";

const ValidateFields = (items: AnyItem[], options: Options, allItems?: AnyItem[]): boolean => {
    let result = true
    for (const item of items) {
        if(Filter(item, allItems ?? items, item.filter)) {
            if (isField(item) && !item.deprecated && (!item.backend_only || options.Mode === "edit") && (options.Mode !== "edit" || item.editable)) {
                const ValidateFC = options.AllowedSubtypes[item.subtype]?.ValidateFC ?? undefined
                if (ValidateFC !== undefined) {
                    //@ts-ignore
                    result =  ValidateFC(item, options) && result // we want to run all the validations, so they have to happen before the && result
                }
                options.SetItem({...item})
            }
            else if (isGroup(item) && !item.deprecated && (!item.backend_only || options.Mode === "edit")) {
                result = ValidateFields(item.items, options, allItems ?? items) && result
                options.SetItem({...item})
            }
        }
    }
    return result
}

export default ValidateFields