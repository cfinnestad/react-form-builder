import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {FieldItem, HTMLItem, SubmitItem} from "../Items";
import {Submit} from "../../Render/StoriesSubmit";
import {Render} from "../../index";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Submit',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Submit',
                id: 'submit1',
                submitElementName: 'default'
            } as SubmitItem
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
                id: 'select1',
                name: 'selectname1',
                subtype: 'Select',
                label: 'Pick a color',
                multiples: false,
                options: [
                    {
                        label: 'Red',
                    },
                    {
                        label: 'Green',
                    },
                    {
                        label: 'Blue',
                    }
                ]
            } as FieldItem,
            {
                type: 'Submit',
                id: 'submit1',
                label: 'Submit',
                submitElementName: 'default'
            } as SubmitItem,
            {
                type: 'HTML',
                id: 'html1',
                content: '<small>**This is an example legal disclaimer</small>'
            } as HTMLItem
        ],
        Options: {
            submitElements: {
                'default': Submit
            }
        }
    }
}
