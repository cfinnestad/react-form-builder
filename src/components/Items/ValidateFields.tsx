import {AnyItem, isField, isGroup, isList, Options} from "./Items";
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
            else if (isList(item)
                && !item.baseItem.deprecated
                && (!item.baseItem.backend_only || options.Mode === "edit")
            ) {
                item.errorText = undefined
                if((item.listItems ?? []).length < item.minListSize) {
                    item.errorText = options.getError('minList', item)
                }
                if((item.listItems ?? []).length > item.maxListSize) {
                    item.errorText = options.getError('maxList', item)
                }
                if(item.errorText === undefined) {
                    delete item.errorText
                } else {
                    result = false;
                }

                if (item.listItems) {
                    result = ValidateFields(item.listItems, options, allItems ?? items) && result
                }
            }
        }
    }
    return result
}

export default ValidateFields