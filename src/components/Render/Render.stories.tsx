import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import Render, {SubmitProps} from './Render';
import {AnyItem, EqFilter, isField, isNumber} from "../Items/Items";
import {Button} from "@mui/material";



const Submit = ({ items, options, results } : SubmitProps ) => {
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
            for(const item of items) {
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
    title: 'Components/Render',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items:
            [
                {
                    id: 'testItem',
                    type: 'Field',
                    name: 'text',
                    required: false,
                    label: 'Text',
                    deprecated: false,
                    subtype: 'Text'
                }
            ],
    },
} satisfies Meta<typeof Render>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        Items:
            [
                {
                    id: 'testItem1',
                    type: 'Field',
                    name: 'text1',
                    required: true,
                    label: 'Text 1',
                    deprecated: false,
                    subtype: 'Text'
                },
                {
                    id: 'testItem2',
                    type: 'Field',
                    name: 'text2',
                    required: false,
                    label: 'Text 2',
                    deprecated: false,
                    filter: {
                        comparison: "=",
                        fieldId: "testItem1",
                        value: 'show'
                    } as EqFilter,
                    subtype: 'Text'
                },
                {
                    id: 'testItem3',
                    type: 'Field',
                    name: 'number1',
                    required: true,
                    label: 'Number 1',
                    deprecated: false,
                    subtype: 'Number',
                    min: 0,
                    max: 5000
                },
                {
                    id: 'group1',
                    type: 'Group',
                    name: 'group1',
                    required: false,
                    label: 'Testing Group',
                    deprecated: false,
                    items: [{
                        id: 'testItem4',
                        type: 'Field',
                        name: 'text3',
                        required: false,
                        label: 'Text 3',
                        deprecated: false,
                        subtype: 'Text'
                    }]
                }

            ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }



    }
}

export const TestFlatArray: Story = {
    args: {
        Items:
            [
                {
                    id: 'testItem1',
                    type: 'Field',
                    name: 'text1',
                    required: false,
                    label: 'Text 1',
                    deprecated: false,
                    subtype: 'Text'
                },
                {
                    id: 'testItem2',
                    type: 'Field',
                    name: 'text1',
                    required: false,
                    label: 'Text 2',
                    deprecated: false,
                    subtype: 'Text'
                },
                {
                    id: 'testItem3',
                    type: 'Field',
                    name: 'text3',
                    required: false,
                    label: 'Text 3',
                    deprecated: false,
                    subtype: 'Text'
                }
            ],
        Submit: Submit,
        Options: {
            returnType: 'flatarray'
        }



    }
}
export const Hidden: Story = {
    args: {
        Items:
            [
                {
                    id: 'HTML-1',
                    type: 'HTML',
                    content: '<h2>My Header</h2>'
                },
                {
                    id: 'hidden-1',
                    type: 'Hidden',
                    name: 'hidden1',
                    deprecated: false,
                    value: 'hidden value'
                },
                {
                    id: 'testItem1',
                    type: 'Field',
                    name: 'text1',
                    required: false,
                    label: 'Text 1 (try "show")',
                    deprecated: false,
                    subtype: 'Text'
                },
                {
                    id: 'testItem2',
                    type: 'Field',
                    name: 'text2',
                    required: false,
                    label: 'Text 2',
                    deprecated: false,
                    filter: {
                        comparison: "=",
                        fieldId: "testItem1",
                        value: 'show'
                    } as EqFilter,
                    subtype: 'Text'
                }
            ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }



    }
}


