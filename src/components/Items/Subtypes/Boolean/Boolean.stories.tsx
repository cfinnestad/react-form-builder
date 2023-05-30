import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {BooleanSubtype, EqFilter} from "../../Items";
import {Submit} from "../../../Render/StoriesSubmit";
import {Render} from "../../../index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Boolean',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Boolean',
                id: 'boolean1',
                name: 'boolean1',
                label: 'Boolean',
            } as BooleanSubtype
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
                type: 'Field',
                subtype: 'Boolean',
                id: 'boolean1',
                name: 'boolean1',
                label: 'Boolean',
            } as BooleanSubtype
        ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }
    }
}

export const DefaultValue: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                value: true
            } as BooleanSubtype
        ]
    }
}

export const HelperText: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Helper Text'
            } as BooleanSubtype
        ]
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                required: true,
            } as BooleanSubtype
        ],
    }
}
export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Try checking'
            } as BooleanSubtype,
            {
                ...Basic.args.Items[0],
                id: 'boolean2',
                name: 'boolean2',
                label: 'Boolean 2',
                filter: {
                    comparison: '=',
                    fieldId: 'boolean1'
                } as EqFilter
            } as BooleanSubtype
        ],
    }
}
