import React from 'react';
import type { StoryObj } from '@storybook/react';
import { SelectSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options, Submit }: import("../../../Render/Render").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: SelectSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const HelperText: Story;
export declare const Required: Story;
export declare const DefaultOptionSelected: Story;
export declare const SelectMultipleOptions: Story;
export declare const DefaultOptionsSelected: Story;
