import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {EmailSubtype, EqFilter, RadioSubtype, SubmitItem} from "../../Items";
import {Submit} from "../../../Render/StoriesSubmit";
import {Render} from "../../../index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Email',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Email',
                id: 'email1',
                name: 'email1',
                label: 'Email',
            } as EmailSubtype
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
                subtype: 'Email',
                id: 'email1',
                name: 'email1',
                label: 'Email',
            } as EmailSubtype,
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

export const DefaultValue: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                value: 'test@test.com'
            } as EmailSubtype,
            {
                ...Basic.args.Items[1]
            }
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
            } as EmailSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

export const MaxLength: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                maxLength: 4,
            } as EmailSubtype,
            {
                ...Basic.args.Items[1]
            }
        ],
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                required: true,
            } as EmailSubtype,
            {
                ...Basic.args.Items[1]
            }
        ],
    }
}
export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Radio',
                id: 'radio1',
                name: 'radio1',
                required: true,
                options: [
                    {label: 'Show', selected: true},
                    {label: 'Hide'}
                ]
            } as RadioSubtype,
            {
                ...Basic.args.Items[0],
                filter: {
                    comparison: '=',
                    fieldId: 'radio1',
                    value: 'Show'
                } as EqFilter
            } as EmailSubtype,
            {
                ...Basic.args.Items[1]
            }
        ],
    }
}
