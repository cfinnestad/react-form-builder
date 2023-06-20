import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Render from '../../../Render/Render';
import {EqFilter, RadioSubtype, SubmitItem} from "../../Items";
import {Submit} from "../../../Render/StoriesSubmit";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Radio',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Radio',
                id: 'radio1',
                name: 'radio1',
                label: 'Radio',
                options: []
            } as RadioSubtype
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
                subtype: 'Radio',
                id: 'radio1',
                name: 'radio1',
                label: 'Radio',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as RadioSubtype,
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

export const HelperText: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Helper text to describe your field',
            } as RadioSubtype,
            {
                ...Basic.args.Items[1]
            }
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
            } as RadioSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

export const inline: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                inLine: true,
            } as RadioSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

export const DefaultOptionSelected: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'One option preselected on render',
                value: 'Option 3',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3', selected: true },
                    { label: 'Option 4' }
                ]
            } as RadioSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

export const filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Pick option 2',
            } as RadioSubtype,
            {
                ...Basic.args.Items[0],
                id: "radio2",
                name: "radio2",
                label: "Radio 2",
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ],
                filter: {
                    comparison: "=",
                    fieldId: "radio1",
                    value: "Option 2"
                } as EqFilter
            } as RadioSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}