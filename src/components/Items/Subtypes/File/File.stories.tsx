import type { Meta, StoryObj } from '@storybook/react';
import Render from '../../../Render/Render';
import {EqFilter, FileSubtype, HTMLItem, SelectSubtype, SubmitItem} from "../../Items";
import { Submit } from "../../../Render/StoriesSubmit";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/File',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'File',
                id: 'fileItem',
                name: 'file',
                label: 'File',
                maxFiles: 2,
                maxSizeBytes: 5000000,
                fileTypes: ['image/jpeg','image/png','image/gif','image/bmp']
            } as FileSubtype
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
                subtype: 'File',
                id: 'fileTest',
                name: 'test1',
                label: 'Select an File to upload',
                maxFiles: 2,
                maxSizeBytes: 5000000,
                fileTypes: ['image/jpeg','image/png','image/gif','image/bmp']
            } as FileSubtype,
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
                subtype: 'File',
                id: 'fileTest',
                name: 'test1',
                label: 'Select an File to upload',
                maxFiles: 1,
                maxSizeBytes: 5000000,
                helperText: 'Helper text to describe your field',
                fileTypes: ['image/jpeg','image/png','image/gif','image/bmp']
            } as FileSubtype,
        ]
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'File',
                id: 'fileTest',
                name: 'test1',
                label: 'Select an File to upload',
                maxFiles: 2,
                maxSizeBytes: 5000000,
                helperText: 'Note the asterisk by the label',
                required: true,
                fileTypes: ['image/jpeg','image/png','image/gif','image/bmp']
            } as FileSubtype,
        ]
    }
}