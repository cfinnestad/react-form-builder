import React from "react";
import {AllowedItems, FieldItem, GroupItem, HiddenItem, HTMLItem, SubmitItem, TextSubtype} from "./Items";
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
import {v4} from "uuid";
import ItemFC from "./ItemFC";
import EditFC from "./EditFC";

const DefaultItems = (): AllowedItems => {
    return {
        Field: {
            Item: {
                // TODO add comments to explain these.
                // Text is the default subtype, but shouldn't need to define all default subtype attributes here.
                id: 'Text',
                type: 'Field',
                label: 'Text',
                name: 'Text',
                subtype: 'Text'
            } as TextSubtype,
            ItemFC: Field,
            EditFC: FieldEdit
        },
        Hidden: {
            Item: {
                id: 'Hidden',
                type: 'Hidden',
                name: 'Hidden',
                value: 'Hidden value'
            } as HiddenItem,
            ItemFC: Hidden,
            EditFC: HiddenEdit
        },
        HTML: {
            Item: {
                id: v4(),
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
                name: 'Submit',
                submitElementName: 'default'
            } as SubmitItem,
            ItemFC: Submit,
            EditFC: SubmitEdit
        },
        Group: {
            Item: {
                id:'Group',
                type:'Group',
                name:'Group',
                label:'Group 1',
                items:[{
                    id: 'Text',
                    type: 'Field',
                    label: 'Text',
                    name: 'Text',
                    subtype: 'Text'
                } as TextSubtype]
            } as GroupItem,
            EditFC: ItemGroupEdit,
            ItemFC: ItemGroup,
        }
    }
}

export default DefaultItems
