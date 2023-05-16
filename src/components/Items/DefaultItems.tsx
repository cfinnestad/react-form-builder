import React from "react";
import {ItemType} from "./Items";
import Field from "./Field/Field";
import FieldEdit from "./Field/FieldEdit";
import { AllowedSubtypes } from "./Subtypes/DefaultSubTypes";
import Hidden from "./Hidden/Hidden"
import HiddenEdit from "./Hidden/HiddenEdit"
import {ItemGroupEdit} from "./Group/ItemGroupEdit";
import ItemGroup from "./Group/ItemGroup";


export type AllowedItems = {
    [key: string]: ItemType,
}

const DefaultItems = (allowedSubtypes: AllowedSubtypes): AllowedItems => {
    return {
        Field: {
            Item: {
                // TODO add comments to explain these.
                id: 'Field',
                type: 'Field',
                required: false,
                label: 'Text',
                name: 'text-1',
                deprecated: false,
                subtype: allowedSubtypes.Text.Subtype
            },
            ItemFC: Field,
            EditFC: FieldEdit
        },
        Hidden: {
            Item: {
                id: 'Hidden',
                type: 'Hidden',
                name: 'hidden-1',
                deprecated: false,
                value: 'Hidden value'
            },
            ItemFC: Hidden,
            EditFC: HiddenEdit
        },
        Group: {
            Item: {
                id:'Group',
                type:'Group',
                name:'group-1',
                label:'Group 1',
                items:[]
            },
            EditFC: ItemGroupEdit,
            ItemFC: ItemGroup,
        }
    }
}

export default DefaultItems
