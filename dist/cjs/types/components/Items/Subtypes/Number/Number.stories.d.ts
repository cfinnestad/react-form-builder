import React from 'react';
import type { StoryObj } from '@storybook/react';
import { NumberSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../../index").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: NumberSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const DefaultValue: Story;
export declare const HelperText: Story;
export declare const MinimumValue: Story;
export declare const MaximumValue: Story;
export declare const Required: Story;
export declare const Filter: Story;
