import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TextSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options, Submit }: import("../../../index").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: TextSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const DefaultValue: Story;
export declare const HelperText: Story;
export declare const MinLength: Story;
export declare const MaxLength: Story;
export declare const Required: Story;
export declare const Filter: Story;
