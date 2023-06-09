import React from "react";
import {AllowedItems, FieldItem, GroupItem, HiddenItem, HTMLItem, SubmitItem} from "./Items";
import Field from "./Field/Field";
import FieldEdit from "./Field/FieldEdit";
import Hidden from "./Hidden/Hidden"
import HiddenEdit from "./Hidden/HiddenEdit"
import {ItemGroupEdit} from "./Group";
import ItemGroup from "./Group/ItemGroup";
import Html from "./Html/Html";
import HtmlEdit from "./Html/HtmlEdit";
import Submit from "./Submit";
import SubmitEdit from "./Submit/SubmitEdit";

const DefaultItems = (): AllowedItems => {
    return {
        Field: {
            Item: {
                // TODO add comments to explain these.
                // Text is the default subtype, but shouldn't need to define all default subtype attributes here.
                id: 'Field',
                type: 'Field',
                label: 'Text',
                name: 'text-1',
                subtype: 'Text'
            } as FieldItem,
            ItemFC: Field,
            EditFC: FieldEdit
        },
        Hidden: {
            Item: {
                id: 'Hidden',
                type: 'Hidden',
                name: 'hidden-1',
                value: 'Hidden value'
            } as HiddenItem,
            ItemFC: Hidden,
            EditFC: HiddenEdit
        },
        HTML: {
            Item: {
                id: 'HTML-1',
                type: 'HTML',
                content: '<h3>HTML Content</h3>'
            }  as HTMLItem,
            ItemFC: Html,
            EditFC: HtmlEdit
        },
        Submit: {
            Item: {
                id: 'Submit',
                type: 'Submit',
                name: 'Submit-1',
                submitElementName: 'default'
            } as SubmitItem,
            ItemFC: Submit,
            EditFC: SubmitEdit
        },
        Group: {
            Item: {
                id:'Group',
                type:'Group',
                name:'group-1',
                label:'Group 1',
                items:[]
            } as GroupItem,
            EditFC: ItemGroupEdit,
            ItemFC: ItemGroup,
        }
    }
}

export default DefaultItems
