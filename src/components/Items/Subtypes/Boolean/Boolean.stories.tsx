import type { Meta, StoryObj } from '@storybook/react';
import {BooleanSubtype, EqFilter, SubmitItem} from "../../Items";
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
                description: 'Description',
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
                description: 'Description',
            } as BooleanSubtype,
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
                value: true
            } as BooleanSubtype,
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
            } as BooleanSubtype,
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
            } as BooleanSubtype,
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
            } as BooleanSubtype,
            {
                ...Basic.args.Items[1]
            }
        ],
    }
}
