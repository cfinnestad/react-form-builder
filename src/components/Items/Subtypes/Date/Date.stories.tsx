import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {EqFilter, DateSubtype} from "../../Items";
import {Render} from "../../../index";
import {Submit} from "../../../Render/StoriesSubmit";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Items/Fields/Date',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Date',
                id: 'testItem',
                name: 'text',
                label: 'Text',
            } as DateSubtype
        ],
    },
} satisfies Meta<typeof Render>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
    args: {
        Items: [
            {
                type: 'Field',
                subtype: 'Date',
                id: 'date1',
                name: 'date1',
                label: 'Date 1'
            } as DateSubtype
        ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }
    }
}

export const DefaultValue: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                value: "06/06/2023"
            } as DateSubtype
        ]
    }
}

export const HelperText: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Helper Text'
            } as DateSubtype
        ]
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                required: true
            } as DateSubtype
        ],
    }
}

export const MinDate: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                minDate: "06/02/2023"
            } as DateSubtype
        ],
    }
}
export const MaxDate: Story = {
    args: {
        ...Basic.args,Items: [
            {
                ...Basic.args.Items[0],
                maxDate: "06/07/2023"
            } as DateSubtype
        ],
    }
}

export const MinAndMaxDate: Story = {
    args: {
        ...Basic.args,Items: [
            {
                ...Basic.args.Items[0],
                minDate: "06/04/2023",
                maxDate: "06/08/2023"
            } as DateSubtype
        ],
    }
}

export const MinDateOffsetDays: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                minDateOffsetDays: 2,
                helperText: '2 days from now or later'
            } as DateSubtype
        ],
    }
}
export const MaxDateOffsetDays: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                maxDateOffsetDays: -3,
                helperText: '3 days before now or earlier'
            } as DateSubtype
        ],
    }
}

export const MinDateOffsetMonths: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                minDateOffsetMonths: -1,
                helperText: '1 month before now or later'
            } as DateSubtype
        ],
    }
}
export const MaxDateOffsetMonths: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                maxDateOffsetMonths: 4,
                helperText: '4 months from now or earlier'
            } as DateSubtype
        ],
    }
}

export const MinDateOffsetYears: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                minDateOffsetYears: 2,
                helperText: '2 years from now or later'
            } as DateSubtype
        ],
    }
}
export const MaxDateOffsetYears: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                maxDateOffsetYears: -1,
                helperText: '1 year before now or earlier'
            } as DateSubtype
        ],
    }
}

export const MinAndMaxAndOffsets: Story = {
    args: {
        ...Basic.args,Items: [
            {
                ...Basic.args.Items[0],
                minDate: "05/15/2023",
                maxDate: "06/15/2023",
                minDateOffsetDays: -3,
                maxDateOffsetDays: 3
            } as DateSubtype
        ],
    }
}

export const Filter: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                ...Basic.args.Items[0],
                helperText: 'Try "06/06/2023"'
            } as DateSubtype,
            {
                ...Basic.args.Items[0],
                id: 'date2',
                name: 'date2',
                label: 'Date 2',
                filter: {
                    comparison: '=',
                    fieldId: 'date1',
                    value: "06/06/2023"
                } as EqFilter
            } as DateSubtype
        ],
    }
}
