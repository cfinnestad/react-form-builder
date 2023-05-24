import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Render, { SubmitProps } from '../../../Render/Render';
import { EqFilter, isNumber, SelectSubtype } from "../../Items";
import { Button } from "@mui/material";

const Submit = ({ items, options, results }: SubmitProps) => {
    return <>
        <Button onClick={() => {
            alert(JSON.stringify(results, null, 4))
        }}>
            SUBMIT RESULTS
        </Button>
        <Button onClick={() => {
            alert(JSON.stringify(items, null, 4))
        }}>
            SUBMIT ITEMS
        </Button>
        <Button onClick={() => {
            // alert(JSON.stringify(items, null, 4))
            for (const item of items) {
                if (isNumber(item)) {
                    item.errorText = 'TESTING ERROR'
                    options.SetItem(item)
                    break;
                }
            }
        }}>
            ADD ERROR
        </Button>
    </>
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Select',
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
                label: 'Select',
                value: '',
                options: [
                    {
                        label: 'Option 1',
                        value: '0'
                    },
                    {
                        label: 'Option 2',
                        value: '1'
                    },
                    {
                        label: 'Option 3'
                    }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: '1' // test for second item in options list
                } as EqFilter
            }
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
                type: 'Field',
                subtype: 'Select',
                id: 'selectTest',
                name: 'select1',
                label: 'Select',
                helperText: 'Helper text to describe your field',
                value: '',
                options: [
                    {
                        label: 'Option 1',
                        value: '0'
                    },
                    {
                        label: 'Option 2',
                        value: '1'
                    },
                    {
                        label: 'Option 3'
                    }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: '1' // test for second item in options list
                } as EqFilter
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
                label: 'Select',
                helperText: 'Note the asterisk by the label',
                required: true,
                value: '',
                options: [
                    {
                        label: 'Option 1',
                        value: '0'
                    },
                    {
                        label: 'Option 2',
                        value: '1'
                    },
                    {
                        label: 'Option 3'
                    }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: '1' // test for second item in options list
                } as EqFilter
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
                label: 'Select',
                helperText: 'One option preselected on render',
                value: '2',
                options: [
                    {
                        label: 'Option 1',
                        value: '0'
                    },
                    {
                        label: 'Option 2',
                        value: '1'
                    },
                    {
                        label: 'Option 3',
                        value: '2',
                        selected: true
                    },
                    {
                        label: 'Option 4'
                    }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectTest',
                    comparison: '=',
                    value: '1' // test for second item in options list
                } as EqFilter
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
                value: [],
                options: [
                    {
                        label: 'Option 1',
                        value: 'Option 1'
                    },
                    {
                        label: 'Option 2',
                        value: 'Option 2'
                    },
                    {
                        label: 'Option 3',
                        value: 'Option 3'
                    },
                    {
                        label: 'Option 4'
                    },
                    {
                        label: 'Option 5'
                    },
                    {
                        label: 'Option 6'
                    },
                    {
                        label: 'Option 7'
                    }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectMutiplesTest',
                    comparison: '=',
                    value: 'some label'
                } as EqFilter
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
                value: ['0ption 1', 'Option 3', 'Option 4', 'Option 7'],
                options: [
                    {
                        label: 'Option 1',
                        value: 'Option 1'
                    },
                    {
                        label: 'Option 2',
                        value: 'Option 2'
                    },
                    {
                        label: 'Option 3',
                        value: 'Option 3'
                    },
                    {
                        label: 'Option 4'
                    },
                    {
                        label: 'Option 5'
                    },
                    {
                        label: 'Option 6'
                    },
                    {
                        label: 'Option 7'
                    }
                ]
            } as SelectSubtype,
            {
                id: 'HTML',
                type: 'HTML',
                content: '<h4>Hello</h4>',
                filter: {
                    fieldId: 'selectMutiplesTest',
                    comparison: '=',
                    value: 'some label'
                } as EqFilter
            }
        ]
    }
}