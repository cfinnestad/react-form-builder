import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Render from '../../../Render/Render';
import {CheckboxSubtype, EqFilter} from "../../Items";
import {Submit} from "../../../Render/StoriesSubmit";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Checkbox',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Checkbox',
                id: 'checkbox1',
                name: 'checkbox1',
                label: 'Checkbox 1',
                options: []
            } as CheckboxSubtype
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
                subtype: 'Checkbox',
                id: 'checkbox1',
                name: 'checkbox1',
                label: 'Checkbox 1',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as CheckboxSubtype
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
                helperText: 'Helper text to describe your field',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as CheckboxSubtype
        ]
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Note the asterisk by the label',
                required: true,
            } as CheckboxSubtype
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
            } as CheckboxSubtype
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
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3', selected: true },
                    { label: 'Option 4' }
                ]
            } as CheckboxSubtype
        ]
    }
}

export const DefaultOptionsSelected: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                value: ['Option 2', 'Option 4'],
                helperText: 'Multiple options preselected on render',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2', selected: true },
                    { label: 'Option 3' },
                    { label: 'Option 4', selected: true },
                ]
            } as CheckboxSubtype
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
            } as CheckboxSubtype,
            {
                ...Basic.args.Items[0],
                id: "checkbox2",
                name: "checkbox2",
                label: "Checkbox 2",
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ],
                filter: {
                    comparison: "=",
                    fieldId: "checkbox1",
                    value: "Option 2"
                } as EqFilter
            } as CheckboxSubtype
        ]
    }
}
