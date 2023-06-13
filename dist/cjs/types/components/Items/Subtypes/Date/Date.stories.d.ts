import React from 'react';
import type { StoryObj } from '@storybook/react';
import { DateSubtype } from "../../Items";
declare const meta: {
    title: string;
    component: ({ Items, SetItems, Options, Submit }: import("../../../index").RenderProps) => React.JSX.Element;
    tags: string[];
    argTypes: {
        Items: DateSubtype[];
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const DefaultValue: Story;
export declare const HelperText: Story;
export declare const Required: Story;
export declare const MinDate: Story;
export declare const MaxDate: Story;
export declare const MinAndMaxDate: Story;
export declare const MinDateOffsetDays: Story;
export declare const MaxDateOffsetDays: Story;
export declare const MinDateOffsetMonths: Story;
export declare const MaxDateOffsetMonths: Story;
export declare const MinDateOffsetYears: Story;
export declare const MaxDateOffsetYears: Story;
export declare const MinAndMaxAndOffsets: Story;
export declare const MultipleOffsets: Story;
export declare const Filter: Story;
