import {
    AllowedItems,
    FieldType,
    GroupItem, GroupType,
    HiddenItem,
    HiddenType,
    HTMLItem, HTMLType,
    SubmitItem, SubmitType,
    TextSubtype,
    ListItem, ListType
} from "./Items";
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
import {TextST} from "./Subtypes/Text";
import ItemList, {ItemListEdit} from "./List";

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
            SubtypeFC: TextST,
            ItemFC: Field,
            EditFC: FieldEdit
        } as FieldType,
        Hidden: {
            Item: {
                id: 'Hidden',
                type: 'Hidden',
                name: 'Hidden',
                value: 'Hidden value'
            } as HiddenItem,
            ItemFC: Hidden,
            EditFC: HiddenEdit
        } as HiddenType,
        HTML: {
            Item: {
                id: v4(),
                type: 'HTML',
                content: '<h3>HTML Content</h3>'
            }  as HTMLItem,
            ItemFC: Html,
            EditFC: HtmlEdit
        } as HTMLType,
        Submit: {
            Item: {
                id: 'Submit',
                type: 'Submit',
                label: 'Submit',
                submitElementName: 'default'
            } as SubmitItem,
            ItemFC: Submit,
            EditFC: SubmitEdit
        } as SubmitType,
        Group: {
            Item: {
                id:'Group',
                type:'Group',
                name:'Group',
                label:'Group 1',
                items:[{
                    id: 'Group-Text',
                    type: 'Field',
                    label: 'Text',
                    name: 'Text',
                    subtype: 'Text'
                } as TextSubtype]
            } as GroupItem,
            EditFC: ItemGroupEdit,
            ItemFC: ItemGroup,
        } as GroupType,
        List: {
            Item: {
                id:'List',
                type:'List',
                label:'List Of Items',
                addButton:'New List Item',
                baseItem: {
                    id: 'List_Item',
                    type: 'Field',
                    label: '',
                    name: 'List_Item',
                    subtype: 'Text'
                } as TextSubtype,
                minListSize: 1,
                maxListSize: 10,
            } as ListItem,
            EditFC: ItemListEdit,
            ItemFC: ItemList
        } as ListType,
    }
}

export default DefaultItems
