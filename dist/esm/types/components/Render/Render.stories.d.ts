import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TextSubtype } from "../Items/Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options, Submit }: import("./Render").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: TextSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const TestFlatArray: Story;
export declare const Hidden: Story;
