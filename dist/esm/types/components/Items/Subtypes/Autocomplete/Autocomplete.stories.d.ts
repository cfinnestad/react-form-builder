import type { StoryObj } from '@storybook/react';
import React from "react";
import { AutocompleteSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../../Render/Render").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: AutocompleteSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const AllowAnyInput: Story;
export declare const Required: Story;
export declare const WithStaticOptions: Story;
