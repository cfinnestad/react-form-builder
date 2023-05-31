import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {EqFilter, PhoneSubtype} from "../../Items";
import {Submit} from "../../../Render/StoriesSubmit";
import {Render} from "../../../index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Phone',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Phone',
                id: 'phone1',
                name: 'phone1',
                label: 'Phone',
            } as PhoneSubtype
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
                id: 'phone1',
                type: 'Field',
                name: 'phone1',
                label: 'Phone',
                subtype: 'Phone',
                placeholder: '(555) 555-5555'
            } as PhoneSubtype
        ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }
    }
}

export const HelperText: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Helper Text'
            } as PhoneSubtype
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
            } as PhoneSubtype
        ],
    }
}
export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Try 555-555-5555'
            } as PhoneSubtype,
            {
                ...Basic.args.Items[0],
                id: 'phone2',
                name: 'phone2',
                label: 'Phone 2',
                filter: {
                    comparison: '=',
                    fieldId: 'phone1',
                    value: '(555) 555-5555'
                } as EqFilter
            } as PhoneSubtype
        ],
    }
}
