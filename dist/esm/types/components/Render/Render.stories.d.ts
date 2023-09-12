/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
import { TextSubtype } from "../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("./Render").RenderProps) => import("react").JSX.Element;
    tags: string[];
    argTypes: {
        Items: TextSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
