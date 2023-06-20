import React from 'react';
import type { StoryObj } from '@storybook/react';
import { RadioSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../../Render/Render").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: RadioSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const HelperText: Story;
export declare const Required: Story;
export declare const inline: Story;
export declare const DefaultOptionSelected: Story;
export declare const filter: Story;
