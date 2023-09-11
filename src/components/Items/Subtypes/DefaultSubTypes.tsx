import {
    AllowedSubtypes,
    TextType,
    EmailType,
    CheckboxType,
    NumberType,
    BooleanType,
    DateType,
    RadioType,
    SelectType, PhoneType, AutocompleteType, Option,
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
                id: 'text',
                type: 'Field',
                label: 'Text',
                name: 'text',
                subtype: 'Text',
                maxLength: 255
            },
            SubtypeFC: TextST,
            EditFC: TextEdit,
            ValidateFC: TextValidate
        } as TextType,
        Email: {
            Subtype: {
                id: 'email',
                type: 'Field',
                label: 'Email',
                name: 'email',
                subtype: 'Email',
                maxLength: 255
            },
            SubtypeFC: EmailST,
            EditFC: EmailEdit,
            ValidateFC: EmailValidate
        } as EmailType,
        Checkbox: {
            Subtype: {
                id: 'checkbox',
                type: 'Field',
                label: 'Checkbox1',
                name: 'checkbox',
                subtype: 'Checkbox',
                options: [
                    {
                        label: 'Text 1',
                    },
                    {
                        label: 'Text 2'
                    }
                ]
            },
            SubtypeFC: CheckboxST,
            EditFC: CheckboxEdit,
            ValidateFC: CheckboxValidate
        } as CheckboxType,
        Number: {
            Subtype: {
                id: 'number',
                type: 'Field',
                label: 'Number',
                name: 'number',
                subtype: 'Number',
                min: 0,
                max: 5000
            },
            SubtypeFC: NumberST,
            EditFC: NumberEdit,
            ValidateFC: NumberValidate
        } as NumberType,
        Boolean: {
            Subtype: {
                id: 'boolean',
                type: 'Field',
                label: 'Boolean',
                name: 'boolean',
                subtype: 'Boolean',
            },
            SubtypeFC: BooleanST,
            EditFC: BooleanEdit,
            ValidateFC: BooleanValidate,
        } as BooleanType,
        Date: {
            Subtype: {
                id: 'date',
                type: 'Field',
                label: 'Date',
                name: 'date',
                subtype: 'Date',
            },
            SubtypeFC: DateST,
            EditFC: DateEdit,
            ValidateFC: DateValidate,
        } as DateType,
        Radio: {
            Subtype: {
                id: 'radio',
                type: 'Field',
                label: 'Radio1',
                name: 'radio',
                subtype: 'Radio',
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
            },
            SubtypeFC: RadioST,
            EditFC: RadioEdit,
            ValidateFC: RadioValidate
        } as RadioType,
        Select: {
            Subtype: {
                type: 'Field',
                subtype: 'Select',
                id: 'select',
                name: 'select',
                label: 'Select1',
                options: [
                    { label: 'Option 1' },
                    { label: 'Option 2' },
                    { label: 'Option 3' }
                ]
            },
            SubtypeFC: SelectST,
            EditFC: SelectEdit,
            ValidateFC: SelectValidate
        } as SelectType,
        Phone: {
            Subtype: {
                id: 'phone',
                type: 'Field',
                name: 'phone',
                required: true,
                label: 'Phone 1',
                subtype: 'Phone',
                helperText: 'Helper text',
                placeholder: '(555) 555-5555',
            },
            SubtypeFC: PhoneST,
            EditFC: PhoneEdit,
            ValidateFC: PhoneValidate
        } as PhoneType,
        Autocomplete: {
            Subtype: {
                type: 'Field',
                subtype: 'Autocomplete',
                id: 'autocomplete',
                name: 'autocomplete',
                label: 'Autocomplete1',
                options: [] as Option[],
                emptyValueOption: 'Please start typing to show options',
                noOptionsFound: 'No options found'
            },
            SubtypeFC: AutocompleteST,
            EditFC: AutocompleteEdit,
            ValidateFC: AutocompleteValidate
        } as AutocompleteType
    }
}

export default DefaultSubtypes;
