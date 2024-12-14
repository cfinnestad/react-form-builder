import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {BooleanSubtype, EqFilter, GroupItem, ListItem, SubmitItem, TextSubtype} from "../Items";
import {Submit} from "../../Render/StoriesSubmit";
import {Render} from "../../index";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/List',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'List',
                id: 'list1',
                baseItem: {
                    type: 'Field',
                    subtype: 'Text',
                    id: 'list_text',
                    name: 'list_text',
                    label: 'List Text',
                } as TextSubtype,
                minListSize: 1,
                maxListSize: 10,
                list: [
                    {
                        type: 'Field',
                        subtype: 'Text',
                        id: 'list_text[0]',
                        name: 'list_text',
                        label: 'List Text',
                    } as TextSubtype,
                ]
            } as ListItem
        ],
    },
} satisfies Meta<typeof Render>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
    args: {
        Items: [
            {
                type: 'List',
                id: 'list1',
                label: 'List Text',
                baseItem: {
                    type: 'Field',
                    subtype: 'Text',
                    id: 'list_text',
                    name: 'list_text',
                } as TextSubtype,
                minListSize: 1,
                maxListSize: 10
            } as ListItem,
            {
                type: 'Submit',
                id: 'submit1',
                label: 'Submit',
                submitElementName: 'default'
            } as SubmitItem
        ],
        Options: {
            submitElements: {
                'default': Submit
            }
        }
    }
}

export const grouplist: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'List',
                id: 'list1',
                label: 'List Items',
                addbutton: 'Add List Item',
                baseItem: {
                    type: 'Group',
                    id: 'group1',
                    name: 'group1',
                    items: [
                        {
                            type: 'Field',
                            subtype: 'Text',
                            id: 'group1-text',
                            name: 'text',
                            label: 'Text',
                        } as TextSubtype
                    ]
                } as GroupItem,
                minListSize: 1,
                maxListSize: 10
            } as ListItem,
            {
                type: 'Submit',
                id: 'submit1',
                label: 'Submit',
                submitElementName: 'default'
            } as SubmitItem
        ]
    }
}
export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Boolean',
                id: 'boolean1',
                name: 'boolean1',
                label: 'Show Group',
            } as BooleanSubtype,
            {
                ...Basic.args.Items[0],
                filter: {
                    comparison: '=',
                    fieldId: 'boolean1',
                    value: true
                } as EqFilter
            } as ListItem,
            {
                type: 'Submit',
                id: 'submit1',
                label: 'Submit',
                submitElementName: 'default'
            } as SubmitItem
        ],
    }
}
