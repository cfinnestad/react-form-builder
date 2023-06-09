import React from "react";
import {FieldItem, HiddenItem, isCheckbox, isRadio, isSelect} from "./Items";

const GetValue = (item: FieldItem | HiddenItem): string|number|boolean|string[]|undefined => {
    let value = item.value ?? undefined

    if (isRadio(item)) {
        value = item.options.filter(option => option.selected === true).map(option => option.value ?? option.label)[0] ?? undefined
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