/// <reference types="react" />
import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("./Builder").BuilderProps) => import("react").JSX.Element;
    tags: string[];
    argTypes: {
        Items: {
            id: string;
            type: string;
            name: string;
            required: boolean;
            label: string;
            deprecated: boolean;
            subtype: string;
        }[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Empty: Story;
