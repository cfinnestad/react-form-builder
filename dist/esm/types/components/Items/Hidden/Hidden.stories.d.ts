import React from 'react';
import type { StoryObj } from '@storybook/react';
import { HiddenItem } from "../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options, Submit }: import("../../Render/Render").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: HiddenItem[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const Filter: Story;
