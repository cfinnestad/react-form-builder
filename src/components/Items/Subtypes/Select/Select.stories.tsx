import type { Meta, StoryObj } from '@storybook/react';
import Render from '../../../Render/Render';
import {EqFilter, HTMLItem, SelectSubtype, SubmitItem} from "../../Items";
import { Submit } from "../../../Render/StoriesSubmit";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Select',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Select',
                id: 'testItem',
                name: 'text',
                label: 'Text',
                multiples: false,
                options: []
            } as SelectSubtype
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
                subtype: 'Select',
                id: 'selectTest',
                name: 'select1',
                label: 'Select an Option',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: 'Option 2' // test for second item in options list
                } as EqFilter
            } as HTMLItem,
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
                type: 'Field',
                subtype: 'Select',
                id: 'selectTest',
                name: 'select1',
                label: 'Select an Option',
                helperText: 'Helper text to describe your field',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: 'Option 2'
                } as EqFilter
            } as HTMLItem,
            {
                ...Basic.args.Items[2]
            }
        ]
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Select',
                id: 'selectTest',
                name: 'select1',
                label: 'Select an Option',
                helperText: 'Note the asterisk by the label',
                required: true,
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: 'Option 2'
                } as EqFilter
            } as HTMLItem,
            {
                ...Basic.args.Items[2]
            }
        ]
    }
}

export const DefaultOptionSelected: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Select',
                id: 'selectTest',
                name: 'select1',
                label: 'Select an Option',
                helperText: 'One option preselected on render',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3', selected: true },
                    { label: 'Option 4' }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: 'Option 2'
                } as EqFilter
            } as HTMLItem,
            {
                ...Basic.args.Items[2]
            }
        ]
    }
}

export const SelectMultipleOptions: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Select',
                id: 'selectMutiplesTest',
                name: 'selectMultiples1',
                label: 'Select Multiple Options',
                helperText: 'Ability to select multiple options',
                multiples: true,
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' },
                    { label: 'Option 4' },
                    { label: 'Option 5' },
                    { label: 'Option 6' },
                    { label: 'Option 7' }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectMutiplesTest',
                    comparison: '=',
                    value: 'Option 2'
                } as EqFilter
            } as HTMLItem,
            {
                ...Basic.args.Items[2]
            }
        ]
    }
}

export const DefaultOptionsSelected: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Select',
                id: 'selectMutiplesTest',
                name: 'selectMultiples1',
                label: 'Select Multiple Options',
                helperText: 'Multiple options preselected on render',
                multiples: true,
                options: [
                    { label: 'Option 1', selected: true },
                    { label: 'Option 2' },
                    { label: 'Option 3', selected: true },
                    { label: 'Option 4', selected: true },
                    { label: 'Option 5' },
                    { label: 'Option 6' },
                    { label: 'Option 7', selected: true }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectMutiplesTest',
                    comparison: '=',
                    value: 'Option 2'
                } as EqFilter
            } as HTMLItem,
            {
                ...Basic.args.Items[2]
            }
        ]
    }
}