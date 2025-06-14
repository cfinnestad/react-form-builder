import type { StoryObj } from '@storybook/react';
import { BooleanSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../../index").RenderProps) => import("react").JSX.Element;
    tags: string[];
    argTypes: {
        Items: BooleanSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const DefaultValue: Story;
export declare const HelperText: Story;
export declare const Required: Story;
export declare const Filter: Story;
