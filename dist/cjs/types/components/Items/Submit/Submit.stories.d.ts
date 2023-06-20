import React from 'react';
import type { StoryObj } from '@storybook/react';
import { SubmitItem } from "../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../index").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: SubmitItem[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
