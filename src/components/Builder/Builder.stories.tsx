import type { Meta, StoryObj } from '@storybook/react';

import Builder from './Builder';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Builder',
    component: Builder,
    tags: ['autodocs'],
    argTypes: {
        Items:
            [
                {
                    id: 'testItem',
                    type: 'Text',
                    name: 'text',
                    required: false,
                    label: 'Text',
                    deprecated: false,
                }
            ],
    },
} satisfies Meta<typeof Builder>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        Items:
            [
                {
                    id: 'testItem',
                    type: 'Text',
                    name: 'text',
                    required: false,
                    label: 'Text',
                    deprecated: false,
                }
            ],
    }
}