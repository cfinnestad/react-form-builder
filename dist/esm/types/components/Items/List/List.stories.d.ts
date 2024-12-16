import React from 'react';
import type { StoryObj } from '@storybook/react';
import { ListItem } from "../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../index").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: ListItem[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const grouplist: Story;
export declare const Filter: Story;
