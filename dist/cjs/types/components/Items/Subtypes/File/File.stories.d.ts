import type { StoryObj } from '@storybook/react';
import { FileSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options }: import("../../../Render/Render").RenderProps) => import("react").JSX.Element;
    tags: string[];
    argTypes: {
        Items: FileSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const HelperText: Story;
export declare const Required: Story;
