import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options, Submit }: import("./Render").RenderProps) => JSX.Element;
    tags: string[];
    argTypes: {
        Items: {
            id: string;
            type: string;
            name: string;
            required: boolean;
            label: string;
            deprecated: boolean;
            subtype: {
                subtype: string;
            };
        }[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const TestFlatArray: Story;
