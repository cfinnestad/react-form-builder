import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {AutocompleteSubtype, Option, SubmitItem} from "../../Items";
import Render, {RenderOptions} from "../../../Render/Render";
import {Submit} from "../../../Render/StoriesSubmit";
import {faker} from "@faker-js/faker";

faker.seed(123)

const meta = {
    title: 'Components/Items/Fields/Autocomplete',
    component: Render,
    tags: ['autodocs'],
    argTypes: {
        Items: [
            {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocompleteId',
                name: 'autocompleteName',
                label: 'Autocomplete Label',
                options: []
            } as AutocompleteSubtype
        ],
    },
} satisfies Meta<typeof Render>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        Items: [
            {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocompleteBasicId',
                name: 'autocompleteCitiesName',
                searchableOptionsName: 'exampleCities',
                // Defaults to use searchableOptionsName
                options: [
                    {
                        label: 'Red',
                        value: 'red'
                    },
                    {
                        label: 'Blue',
                        value: 'blue'
                    },
                    {
                        label: 'Green',
                        value: 'green'
                    }
                ],
                label: 'Example Cities',
                value: undefined,
            } as AutocompleteSubtype,
            {
                type: 'Submit',
                id: 'submit1',
                label: 'Submit',
                submitElementName: 'default'
            } as SubmitItem
        ],
        Options: {
            searchableOptions: {
                exampleCities: (input) => input != null
                    ? exampleCities.filter(city => city.value?.toLowerCase().includes(input))
                    : []
            },
            submitElements: {
                'default': Submit
            }
        } as RenderOptions
    }
}

export const AllowAnyInput: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocompleteAnyInput',
                name: 'autocompleteTestName',
                searchableOptionsName: 'exampleCities',
                allowAnyInput: true,
                label: 'Service City',
                value: 'Testing'
            } as AutocompleteSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

export const Required: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocompleteRequiredId',
                name: 'autocompleteTestName',
                searchableOptionsName: 'exampleCities',
                label: 'Example Cities - Required',
                required: true,
                value: undefined,
            } as AutocompleteSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

export const WithStaticOptions: Story = {
    args: {
        ...Basic.args,
        Items: [
            {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocompleteTestId',
                name: 'autocompleteTestName',
                options: [
                    {
                        label: 'Red',
                        value: 'red'
                    },
                    {
                        label: 'Green',
                        value: 'green'
                    },
                    {
                        label: 'Blue',
                        value: 'blue'
                    },
                    {
                        label: 'Purple',
                        value: 'purple'
                    },
                    {
                        label: 'Yellow',
                        value: 'yellow'
                    },
                    {
                        label: 'Pink',
                        value: 'pink'
                    },
                    {
                        label: 'Orange',
                        value: 'orange'
                    },
                    {
                        label: 'Grey',
                        value: 'grey'
                    },
                    {
                        label: 'Black',
                        value: 'black'
                    },

                ],
                label: 'Colors',
                value: undefined,
            } as AutocompleteSubtype,
            {
                ...Basic.args.Items[1]
            }
        ]
    }
}

const exampleCities: Option[] = []
for (let x = 0; x < 50; x++) {
    const city = faker.location.city()
    exampleCities.push({
        label: city,
        value: city.toLowerCase()
    })
}