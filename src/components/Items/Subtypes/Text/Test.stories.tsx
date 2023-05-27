import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {EqFilter, TextSubtype} from "../../Items";
import {Render} from "../../../index";
import {Submit} from "../../../Render/StoriesSubmit";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Text',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Text',
                id: 'testItem',
                name: 'text',
                label: 'Text',
            } as TextSubtype
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
                subtype: 'Text',
                id: 'text1',
                name: 'text1',
                label: 'Text 1'
            } as TextSubtype
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
                value: 'This'
            } as TextSubtype
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
            } as TextSubtype
        ]
    }
}

export const MinLength: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                minLength: 2
            } as TextSubtype
        ],
    }
}

export const MaxLength: Story = {
    args: {
        ...Basic.args,Items: [
            {
                ...Basic.args.Items[0],
                maxLength: 4,
            } as TextSubtype
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
            } as TextSubtype
        ],
    }
}
export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Try "show"'
            } as TextSubtype,
            {
                ...Basic.args.Items[0],
                id: 'text2',
                name: 'text2',
                label: 'Text 2',
                filter: {
                    comparison: '=',
                    fieldId: 'text1',
                    value: 'show'
                } as EqFilter
            } as TextSubtype
        ],
    }
}
