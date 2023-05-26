import React from 'react';
import type { StoryObj } from '@storybook/react';
import { SubmitProps } from './Render';
import { TextSubtype } from "../Items";
export declare const Submit: ({ items, options }: SubmitProps) => React.JSX.Element;
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
