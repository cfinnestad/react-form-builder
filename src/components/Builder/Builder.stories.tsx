import type {Meta, StoryObj} from '@storybook/react';

import Builder from './Builder';
import {
    AutocompleteSubtype, BooleanSubtype, CheckboxSubtype,
    EmailSubtype,
    EqFilter,
    GroupItem, HTMLItem,
    NumberSubtype, Option,
    PhoneSubtype, RadioSubtype, SelectSubtype, SubmitItem,
    TextSubtype
} from "../Items";
import {Submit} from "../Render/StoriesSubmit";
import {RenderOptions} from "../Render";
import {faker} from "@faker-js/faker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Builder',
    component: Builder,
    tags: ['autodocs'],
    argTypes: {
        Items:
            [
                {
                    id: 'testItem',
                    type: 'Field',
                    name: 'text',
                    required: false,
                    label: 'Text',
                    deprecated: false,
                    subtype: 'Text'
                }
            ],
    },
} satisfies Meta<typeof Builder>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        Items:
            [
                {
                    id: 'first_name',
                    type: 'Field',
                    name: 'first_name',
                    required: true,
                    label: 'First Name (Type "show")',
                    deprecated: false,
                    subtype: 'Text',
                    maxLength: 10,
                    minLength: 2
                } as TextSubtype,
                {
                    id: 'last_name',
                    type: 'Field',
                    name: 'last_name',
                    required: true,
                    label: 'Last Name',
                    deprecated: false,
                    subtype: 'Text',
                    maxLength: 10,
                    minLength: 2
                } as TextSubtype,
                {
                    id: 'text2',
                    type: 'Field',
                    name: 'text2',
                    required: true,
                    label: 'Text 2',
                    deprecated: false,
                    filter: {
                        comparison: "=",
                        fieldId: "first_name",
                        value: 'show'
                    } as EqFilter,
                    subtype: 'Text'
                } as TextSubtype,
                {
                    id: 'autocompleteId1',
                    type: 'Field',
                    name: 'autocompleteName1',
                    required: false,
                    label: 'Autocomplete 1',
                    deprecated: false,
                    subtype: 'Autocomplete'
                } as AutocompleteSubtype,
                {
                    id: 'number1',
                    type: 'Field',
                    name: 'number1',
                    required: true,
                    label: 'Number 1',
                    subtype: 'Number',
                    min: 12,
                    max: 5000,
                    helperText: 'Helper text',
                } as NumberSubtype,
                {
                    id: 'phone1',
                    type: 'Field',
                    name: 'phone1',
                    required: true,
                    label: 'Phone 1',
                    subtype: 'Phone',
                    helperText: 'Helper text',
                    placeholder: '(555) 555-5555',
                } as PhoneSubtype,
                {
                    id: 'group1',
                    type: 'Group',
                    name: 'group1',
                    label: 'Testing Group',
                    items: [
                        {
                            id: 'group1_text3',
                            type: 'Field',
                            name: 'text3',
                            label: 'Text 3',
                            subtype: 'Text'
                        } as TextSubtype,
                        {
                            id: 'group1_email1',
                            type: 'Field',
                            name: 'email1',
                            required: true,
                            label: 'Email',
                            subtype: 'Email',
                            maxLength: 255,
                        } as EmailSubtype,
                        {
                            id: 'group2',
                            type: 'Group',
                            name: 'group2',
                            label: 'Testing Group Two',
                            items: [
                                {
                                    id: 'group2_text1',
                                    type: 'Field',
                                    name: 'text1',
                                    label: 'Text 1',
                                    subtype: 'Text'
                                } as TextSubtype,
                                {
                                    id: 'group2_text2',
                                    type: 'Field',
                                    name: 'text2',
                                    label: 'Text 2',
                                    subtype: 'Text'
                                } as TextSubtype,
                            ]
                        } as GroupItem
                    ]
                } as GroupItem,
                {
                    id: 'Select_Multiples',
                    type: 'Field',
                    name: 'Select_Multiples',
                    subtype: 'Select',
                    label: 'Select',
                    multiples: true,
                    helperText: 'Select helper text test',
                    options: [
                        {
                            selected: true,
                            label: 'Second',
                            value: 'second value'
                        },
                        {
                            label: 'Third',
                        },
                        {
                            label: 'Fourth',
                        },
                    ]
                } as SelectSubtype,
                {
                    id: 'Select',
                    type: 'Field',
                    name: 'Select',
                    subtype: 'Select',
                    label: 'Select',
                    helperText: 'Select helper text test',
                    options: [
                        {
                            label: 'First',
                        },
                        {
                            selected: true,
                            label: 'Second',
                            value: '2'
                        }
                    ]
                } as SelectSubtype,
                {
                    id: 'Checkbox',
                    type: 'Field',
                    name: 'Checkbox',
                    subtype: 'Checkbox',
                    label: 'Checkbox',
                    helperText: 'Checkbox helper text test',
                    options: [
                        {
                            label: 'First',
                        },
                        {
                            selected: true,
                            label: 'Second',
                            value: 'second value'
                        }
                    ]
                } as CheckboxSubtype,
                {
                    id: "HTML1",
                    type: "HTML",
                    content: "<h4>Hello</h4>",
                    filter: {
                        fieldId: "Checkbox",
                        comparison: "=",
                        value: "First"
                    } as EqFilter
                } as HTMLItem,
                {
                    id: 'boolean1',
                    type: 'Field',
                    label: 'Boolean Label',
                    name: 'Boolean',
                    subtype: 'Boolean',
                    helperText: 'This is the boolean helper text',
                } as BooleanSubtype,
                {
                    id: 'radio1',
                    type: 'Field',
                    label: 'Radio1',
                    name: 'Radio-1',
                    subtype: 'Radio',
                    inLine: true,
                    helperText: 'Radio helper text',
                    options: [
                        {
                            label: 'Radio 1',
                        },
                        {
                            label: 'Radio 2',
                            value: 'Radio 2 value',
                            selected: true
                        }
                    ]
                } as RadioSubtype,
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

const exampleCities: Option[] = []
for (let x = 0; x < 50; x++) {
    const city = faker.location.city()
    exampleCities.push({
        label: city,
        value: city.toLowerCase()
    })
}