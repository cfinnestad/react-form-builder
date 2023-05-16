import React from "react";
import {ItemType} from "./Items";
import Field from "./Field/Field";
import FieldEdit from "./Field/FieldEdit";
import { AllowedSubtypes } from "./Subtypes/DefaultSubTypes";
import Hidden from "./Hidden/Hidden"
import HiddenEdit from "./Hidden/HiddenEdit"
import {ItemGroupEdit} from "./Group/ItemGroupEdit";
import ItemGroup from "./Group/ItemGroup";
import Html from "./Html/Html";
import HtmlEdit from "./Html/HtmlEdit";


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
                label: 'Text',
                name: 'text-1',
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
                value: 'Hidden value'
            },
            ItemFC: Hidden,
            EditFC: HiddenEdit
        },
        HTML: {
            Item: {
                id: 'HTML-1',
                type: 'HTML',
                content: '<h3>HTML Content</h3>'
            },
            ItemFC: Html,
            EditFC: HtmlEdit
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
