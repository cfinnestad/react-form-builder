/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
import { TextSubtype } from "../Items";
declare const meta: {
    title: string;
    component: ({ Data, Items, SetItems, Options }: import("./Editor").EditorProps) => import("react").JSX.Element;
    tags: string[];
    argTypes: {
        Items: TextSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const EditorWithoutData: Story;
