import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {AutocompleteSubtype, Option} from "../../Items";
import Render from "../../../Render/Render";
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
                id: 'autocompleteCitiesId',
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
            } as AutocompleteSubtype
        ],
        Submit: Submit,
        Options: {
            searchableOptions: {
                exampleCities: (input) => input != null
                    ? exampleCities.filter(city => city.value?.toLowerCase().includes(input))
                    : []
            },
            returnType: 'flatobject'
        }
    }
}

// export const AllowAnyInput: Story = {
//     args: {
//         Items: [
//             {
//                 type: 'Field',
//                 subtype: 'Autocomplete',
//                 id: 'autocompleteTestId',
//                 name: 'autocompleteTestName',
//                 searchableOptionsName: 'exampleCities',
//                 allowAnyInput: true,
//                 label: 'Service City',
//                 value: undefined,
//             } as AutocompleteSubtype
//         ],
//         Submit: Submit,
//         Options: {
//             searchableOptions: {
//                 exampleCities: (input) => input != null
//                     ? exampleCities.filter(city => city.value?.toLowerCase().includes(input))
//                     : []
//             },
//             returnType: 'flatobject'
//         }
//     }
// }

export const Required: Story = {
    args: {
        Items: [
            {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocompleteTestId',
                name: 'autocompleteTestName',
                searchableOptionsName: 'exampleCities',
                label: 'Example Cities - Required',
                required: true,
                value: undefined,
            } as AutocompleteSubtype
        ],
        Submit: Submit,
        Options: {
            searchableOptions: {
                exampleCities: (input) => input != null
                    ? exampleCities.filter(city => city.value?.toLowerCase().includes(input))
                    : []
            },
            returnType: 'flatobject'
        }
    }
}

export const WithStaticOptions: Story = {
    args: {
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
            } as AutocompleteSubtype
        ],
        Submit: Submit,
        Options: {
            returnType: 'flatobject'
        }
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