import React from 'react';
import type { StoryObj } from '@storybook/react';
import { GroupItem } from "../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../index").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: GroupItem[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const Nested: Story;
export declare const Filter: Story;
