import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {BooleanSubtype, EqFilter, HiddenItem} from "../Items";
import {Submit} from "../../Render/StoriesSubmit";
import {Render} from "../../index";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Hidden',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Hidden',
                id: 'hidden1',
                name: 'hidden1',
                value: 'hidden'
            } as HiddenItem
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
                type: 'Hidden',
                id: 'hidden1',
                name: 'hidden1',
                value: 'hidden'
            } as HiddenItem
        ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }
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
                label: 'Show HTML',
            } as BooleanSubtype,
            {
                ...Basic.args.Items[0],
                filter: {
                    comparison: '=',
                    fieldId: 'boolean1',
                    value: true
                } as EqFilter
            } as HiddenItem
        ],
    }
}
