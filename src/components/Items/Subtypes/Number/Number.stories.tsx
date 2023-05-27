import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {EqFilter, NumberSubtype} from "../../Items";
import {Submit} from "../../../Render/StoriesSubmit";
import {Render} from "../../../index";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Number',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Number',
                id: 'number1',
                name: 'number1',
                label: 'Number',
            } as NumberSubtype
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
                subtype: 'Number',
                id: 'number1',
                name: 'number1',
                label: 'Number 1'
            } as NumberSubtype
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
                value: 10
            } as NumberSubtype
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
            } as NumberSubtype
        ]
    }
}

export const MinimumValue: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                min: 2
            } as NumberSubtype
        ],
    }
}

export const MaximumValue: Story = {
    args: {
        ...Basic.args,Items: [
            {
                ...Basic.args.Items[0],
                max: 10,
            } as NumberSubtype
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
            } as NumberSubtype
        ],
    }
}
export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Try 4'
            } as NumberSubtype,
            {
                ...Basic.args.Items[0],
                id: 'number2',
                name: 'number2',
                label: 'Number 2',
                filter: {
                    comparison: '=',
                    fieldId: 'number1',
                    value: 4
                } as EqFilter
            } as NumberSubtype
        ],
    }
}
