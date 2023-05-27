import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {BooleanSubtype, EqFilter, HTMLItem} from "../Items";
import {Submit} from "../../Render/StoriesSubmit";
import {Render} from "../../index";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/HTML',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'HTML',
                id: 'html1',
                content: '<h2>My Content</h2>'
            } as HTMLItem
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
                type: 'HTML',
                id: 'html1',
                content: '<h2>My Content</h2>'
            } as HTMLItem
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
            } as HTMLItem
        ],
    }
}
