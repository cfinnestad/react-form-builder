import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import Render from './Render';

const Submit = ({ Items } : { Items: [] | {} } ) => {
    return <><button onClick={() => console.log('Button Clicked...', Items)}>SUBMIT</button></>
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
                    subtype: {
                        subtype: 'Text'
                    }
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
                    required: false,
                    label: 'Text 1',
                    deprecated: false,
                    subtype: {
                        subtype: 'Text'
                    }
                },
                {
                    id: 'testItem2',
                    type: 'Field',
                    name: 'text1',
                    required: false,
                    label: 'Text 2',
                    deprecated: false,
                    subtype: {
                        subtype: 'Text'
                    }
                },
                {
                    id: 'group1',
                    type: 'Group',
                    name: 'group1',
                    required: false,
                    label: 'Testing Group',
                    deprecated: false,
                    items: [{
                        id: 'testItem3',
                        type: 'Field',
                        name: 'text3',
                        required: false,
                        label: 'Text 3',
                        deprecated: false,
                        subtype: {
                            subtype: 'Text'
                        }
                    }]
                }

            ],
        Submit: Submit,
        Options: {

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
                    subtype: {
                        subtype: 'Text'
                    }
                },
                {
                    id: 'testItem2',
                    type: 'Field',
                    name: 'text1',
                    required: false,
                    label: 'Text 2',
                    deprecated: false,
                    subtype: {
                        subtype: 'Text'
                    }
                },
                {
                    id: 'testItem3',
                    type: 'Field',
                    name: 'text3',
                    required: false,
                    label: 'Text 3',
                    deprecated: false,
                    subtype: {
                        subtype: 'Text'
                    }
                }
            ],
        Submit: Submit,
        Options: {
            returnType: 'flatarray'
        }



    }
}


