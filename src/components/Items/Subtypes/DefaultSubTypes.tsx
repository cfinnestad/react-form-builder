import React from "react";
import {
    CheckboxSubtype,
    BooleanSubtype,
    EmailSubtype,
    NumberSubtype,
    RadioSubtype,
    SelectSubtype,
    TextSubtype,
    AutocompleteSubtype,
    PhoneSubtype,
    DateSubtype, AllowedSubtypes,
} from "../Items";
import {BooleanEdit, BooleanST, BooleanValidate} from "./Boolean";
import {TextEdit, TextST, TextValidate} from "./Text";
import {EmailEdit, EmailST, EmailValidate} from "./Email";
import {CheckboxEdit, CheckboxST, CheckboxValidate} from "./Checkbox";
import {NumberEdit, NumberST, NumberValidate} from "./Number";
import {RadioEdit, RadioST, RadioValidate} from "./Radio";
import {SelectEdit, SelectST, SelectValidate} from "./Select";
import {AutocompleteEdit, AutocompleteST, AutocompleteValidate} from "./Autocomplete"
import {PhoneEdit, PhoneST, PhoneValidate} from "./Phone";
import {DateEdit, DateST, DateValidate} from "./Date";

const DefaultSubtypes = (): AllowedSubtypes => {
    return {
        Text: {
            Subtype: {
                id: 'text1',
                type: 'Field',
                label: 'Text',
                name: 'text-1',
                subtype: 'Text',
                maxLength: 255
            } as TextSubtype,
            SubtypeFC: TextST,
            EditFC: TextEdit,
            ValidateFC: TextValidate
        },
        Email: {
            Subtype: {
                id: 'email2',
                type: 'Field',
                label: 'Email',
                name: 'email-1',
                subtype: 'Email',
                maxLength: 255
            } as EmailSubtype,
            SubtypeFC: EmailST,
            EditFC: EmailEdit,
            ValidateFC: EmailValidate
        },
        Checkbox: {
            Subtype: {
                id: 'checkbox1',
                type: 'Field',
                label: 'Checkbox1',
                name: 'Checkbox-1',
                subtype: 'Checkbox',
                options: [
                    {
                        label: 'Text 1',
                    },
                    {
                        label: 'Text 2'
                    }
                ]
            } as CheckboxSubtype,
            SubtypeFC: CheckboxST,
            EditFC: CheckboxEdit,
            ValidateFC: CheckboxValidate
        },
        Number: {
            Subtype: {
                id: 'number1',
                type: 'Field',
                label: 'Number',
                name: 'number-1',
                subtype: 'Number',
                min: 0,
                max: 5000
            } as NumberSubtype,
            SubtypeFC: NumberST,
            EditFC: NumberEdit,
            ValidateFC: NumberValidate
        },
        Boolean: {
            Subtype: {
                id: 'boolean1',
                type: 'Field',
                label: 'Boolean',
                name: 'boolean-1',
                subtype: 'Boolean',
            } as BooleanSubtype,
            SubtypeFC: BooleanST,
            EditFC: BooleanEdit,
            ValidateFC: BooleanValidate,
        },
        Date: {
            Subtype: {
                id: 'date1',
                type: 'Field',
                label: 'Date',
                name: 'date-1',
                subtype: 'Date',
            } as DateSubtype,
            SubtypeFC: DateST,
            EditFC: DateEdit,
            ValidateFC: DateValidate,
        },
        Radio: {
            Subtype: {
                id: 'radio1',
                type: 'Field',
                label: 'Radio1',
                name: 'Radio-1',
                subtype: 'Radio',
                value: 'Radio 1 value',
                options: [
                    {
                        label: 'Radio 1',
                        selected: true,
                        value: 'Radio 1 value'
                    },
                    {
                        label: 'Radio 2'
                    }
                ]
            } as RadioSubtype,
            SubtypeFC: RadioST,
            EditFC: RadioEdit,
            ValidateFC: RadioValidate
        },
        Select: {
            Subtype: {
                type: 'Field',
                subtype: 'Select',
                id: 'select1',
                name: 'Select-1',
                label: 'Select1',
                value: '',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            } as SelectSubtype,
            SubtypeFC: SelectST,
            EditFC: SelectEdit,
            ValidateFC: SelectValidate
        },
        Phone: {
            Subtype: {
                id: 'phone1',
                type: 'Field',
                name: 'phone1',
                required: true,
                label: 'Phone 1',
                subtype: 'Phone',
                helperText: 'Helper text',
                placeholder: '(555) 555-5555',
            } as PhoneSubtype,
            SubtypeFC: PhoneST,
            EditFC: PhoneEdit,
            ValidateFC: PhoneValidate
        },
        Autocomplete: {
            Subtype: {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocomplete1',
                name: 'Autocomplete-1',
                label: 'Autocomplete1',
                value: '',
            } as AutocompleteSubtype,
            SubtypeFC: AutocompleteST,
            EditFC: AutocompleteEdit,
            ValidateFC: AutocompleteValidate
        }
    }
}

export default DefaultSubtypes;
