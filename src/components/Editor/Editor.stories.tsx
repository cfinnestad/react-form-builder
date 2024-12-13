import type {Meta, StoryObj} from '@storybook/react';
import Editor from './Editor'
import {
    BooleanSubtype,
    CheckboxSubtype,
    DateSubtype,
    EmailSubtype,
    EqFilter,
    ListItem,
    HTMLItem,
    NumberSubtype,
    TextSubtype,
    RadioSubtype,
    SelectSubtype,
    PhoneSubtype,
    AutocompleteSubtype,
    SubmitItem,
    Option
} from "../Items";
import {Submit} from "../Render/StoriesSubmit";
import {TestTheme} from "../../shared/themes/TestTheme";
import {faker} from "@faker-js/faker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'Components/Editor',
    component: Editor,
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
                    subtype: 'Text',
                    minLength: 2,
                    maxLength: 4,
                } as TextSubtype
            ],
    },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        Data: {
            first_name: "first name",
            last_name: "last name",
            text2: "text2",
            'group1-text3': "group 1 text 3",
            'group1-email1': "group1-email1",
            'autocomplete1': 'autocomplete1',
            zip_code: '99999',
            phone1: '(907) 999-9999',
            Select_Multiples: ['Third', 'Fourth'],
            Select: ['First'],
            Checkbox: ['First', 'second value'],
            date1: '10/07/2023',
            boolean1: true,
            radio1: 'Radio 1'
        },

        Items:
            [
                {
                    id: 'first_name',
                    type: 'Field',
                    name: 'first_name',
                    required: true,
                    label: 'First Name (Type "show")',
                    deprecated: true,
                    subtype: 'Text',
                    maxLength: 10,
                    minLength: 2,
                    editable: true,
                    value: "first name"
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
                    minLength: 2,
                    backend_only: true,
                    value: "last name"
                } as TextSubtype,
                {
                    id: 'backend',
                    type: 'Field',
                    name: 'backend',
                    label: 'Backend Editable',
                    deprecated: false,
                    subtype: 'Text',
                    maxLength: 10,
                    minLength: 2,
                    backend_only: true,
                    editable: true,
                    value: "last name"
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
                    id: 'group1',
                    type: 'Group',
                    name: 'group1',
                    label: 'Testing Group',
                    items: [
                        {
                            id: 'group1-text3',
                            type: 'Field',
                            name: 'text3',
                            label: 'Text 3',
                            subtype: 'Text',
                            value: "test"
                        } as TextSubtype,
                        {
                            id: 'group1-email1',
                            type: 'Field',
                            name: 'email1',
                            required: true,
                            label: 'Email',
                            subtype: 'Email',
                            maxLength: 255
                        } as EmailSubtype,
                    ]
                } as ListItem,

                {
                    id: 'autocomplete1',
                    allowAnyInput: true,
                    editable: true,
                    type: 'Field',
                    name: 'autocomplete1',
                    required: true,
                    label: 'City',
                    deprecated: false,
                    subtype: 'Autocomplete',
                    searchableOptionsName: 'exampleCities',
                    options: [
                        {
                            label: 'First',
                        },
                        {
                            label: 'Second',
                        }
                    ]
                } as AutocompleteSubtype,
                {
                    id: 'zip_code',
                    type: 'Field',
                    name: 'zip_code',
                    required: true,
                    label: 'Zip Code',
                    subtype: 'Number',
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
                    multiples: true,
                    helperText: 'Select helper text test',
                    options: [
                        {
                            label: 'First',
                        },
                        {
                            selected: true,
                            label: 'Second',
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
                    id: "date1",
                    type: 'Field',
                    name: 'date1',
                    label: 'Date',
                    subtype: 'Date',
                    helperText: 'Helper text'
                } as DateSubtype,
                {
                    id: "date2",
                    type: 'Field',
                    name: 'date2',
                    label: 'Date Filter',
                    subtype: 'Date',
                    filter: {
                        fieldId: "date1",
                        comparison: "=",
                        value: "08/07/2023"
                    } as EqFilter
                } as DateSubtype,
                {
                    id: 'boolean1',
                    type: 'Field',
                    label: 'Boolean Label',
                    description: 'Boolean Description',
                    name: 'boolean1',
                    subtype: 'Boolean',
                    helperText: 'This is the boolean helper text',
                } as BooleanSubtype,
                {
                    id: 'boolean2',
                    value: true,
                    type: 'Field',
                    label: 'Boolean Label',
                    description: 'Boolean Description',
                    name: 'boolean1',
                    subtype: 'Boolean',
                    helperText: 'This is the boolean helper text',
                } as BooleanSubtype,
                {
                    id: 'radio1',
                    type: 'Field',
                    label: 'Radio1',
                    name: 'radio1',
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
            muiTheme: TestTheme,
            submitElements: {
                'default': Submit
            },
            mode: "edit",
            searchableOptions: {
                exampleCities: (input) => input != null
                    ? exampleCities.filter(city => city.value?.toLowerCase().includes(input))
                    : [],
            }
        }
    }
}

export const EditorWithoutData: Story = {
    args: {
        Data: {
        },

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
                    minLength: 2,
                    editable: true,
                    value: "first name"
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
                    minLength: 2,
                    backend_only: true,
                    value: "last name"
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
                    id: 'group1',
                    type: 'Group',
                    name: 'group1',
                    label: 'Testing Group',
                    items: [
                        {
                            id: 'group1-text3',
                            type: 'Field',
                            name: 'text3',
                            label: 'Text 3',
                            subtype: 'Text',
                            value: "test"
                        } as TextSubtype,
                        {
                            id: 'group1-email1',
                            type: 'Field',
                            name: 'email1',
                            required: true,
                            label: 'Email',
                            subtype: 'Email',
                            maxLength: 255
                        } as EmailSubtype,
                    ]
                } as ListItem,

                {
                    id: 'autocomplete1',
                    allowAnyInput: true,
                    editable: true,
                    type: 'Field',
                    name: 'autocomplete1',
                    required: true,
                    label: 'City',
                    deprecated: false,
                    subtype: 'Autocomplete',
                    searchableOptionsName: 'exampleCities',
                    options: [
                        {
                            label: 'First',
                        },
                        {
                            label: 'Second',
                        }
                    ]
                } as AutocompleteSubtype,
                {
                    id: 'zip_code',
                    type: 'Field',
                    name: 'zip_code',
                    required: true,
                    label: 'Zip Code',
                    subtype: 'Number',
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
                    multiples: true,
                    helperText: 'Select helper text test',
                    options: [
                        {
                            label: 'First',
                        },
                        {
                            selected: true,
                            label: 'Second',
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
                    id: "date1",
                    type: 'Field',
                    name: 'date1',
                    label: 'Date',
                    subtype: 'Date',
                    helperText: 'Helper text'
                } as DateSubtype,
                {
                    id: "date2",
                    type: 'Field',
                    name: 'date2',
                    label: 'Date Filter',
                    subtype: 'Date',
                    filter: {
                        fieldId: "date1",
                        comparison: "=",
                        value: "08/07/2023"
                    } as EqFilter
                } as DateSubtype,
                {
                    id: 'boolean1',
                    type: 'Field',
                    label: 'Boolean Label',
                    description: 'Boolean Description',
                    name: 'boolean1',
                    subtype: 'Boolean',
                    helperText: 'This is the boolean helper text',
                } as BooleanSubtype,
                {
                    id: 'boolean2',
                    value: true,
                    type: 'Field',
                    label: 'Boolean Label',
                    description: 'Boolean Description',
                    name: 'boolean1',
                    subtype: 'Boolean',
                    helperText: 'This is the boolean helper text',
                } as BooleanSubtype,
                {
                    id: 'radio1',
                    type: 'Field',
                    label: 'Radio1',
                    name: 'radio1',
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
            muiTheme: TestTheme,
            submitElements: {
                'default': Submit
            },
            mode: "edit",
            searchableOptions: {
                exampleCities: (input) => input != null
                    ? exampleCities.filter(city => city.value?.toLowerCase().includes(input))
                    : [],
            }
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
