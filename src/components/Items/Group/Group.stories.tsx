import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {BooleanSubtype, EqFilter, GroupItem, TextSubtype} from "../Items";
import {Submit} from "../../Render/Render.stories";
import {Render} from "../../index";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Group',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Group',
                id: 'group1',
                name: 'group1',
                label: 'Group 1',
                items: [
                    {
                        type: 'Field',
                        subtype: 'Text',
                        id: 'group1_text1',
                        name: 'text1',
                        label: 'Text',
                    } as TextSubtype
                ]
            } as GroupItem
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
                type: 'Group',
                id: 'group1',
                name: 'group1',
                label: 'Group 1',
                items: [
                    {
                        type: 'Field',
                        subtype: 'Text',
                        id: 'group1_text',
                        name: 'text',
                        label: 'Text',
                    } as TextSubtype
                ]
            } as GroupItem
        ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }
    }
}

export const Nested: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                items: [
                    {
                        type: 'Field',
                        subtype: 'Text',
                        id: 'group1_text',
                        name: 'text',
                        label: 'Text',
                    } as TextSubtype,
                    {
                        type: 'Group',
                        id: 'group1_group2',
                        name: 'group2',
                        label: 'Group 2',
                        items: [
                            {
                                type: 'Field',
                                subtype: 'Text',
                                id: 'group1_group2_text',
                                name: 'text',
                                label: 'Text',
                            } as TextSubtype
                        ]
                    } as GroupItem
                ]

            } as GroupItem
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
            } as GroupItem
        ],
    }
}
