import React from "react";
import NumberST from './Number/NumberST'
import NumberEdit from './Number/NumberEdit'
import TextST  from './Text/TextST'
import TextEdit  from './Text/TextEdit'
import {CheckboxSubtype, BooleanSubtype, EmailSubtype, FieldType, NumberSubtype, RadioSubtype, SelectSubtype, TextSubtype} from "../Items";
import EmailST from "./Email/EmailST";
import EmailEdit from "./Email/EmailEdit";
import CheckboxEdit from "./Checkbox/CheckboxEdit";
import CheckboxST from "./Checkbox/CheckboxST";
import BooleanEdit from "./Boolean/BooleanEdit";
import BooleanST from "./Boolean/BooleanST";
import RadioST from "./Radio/RadioST";
import RadioEdit from "./Radio/RadioEdit";
import SelectST from "./Select/SelectST";
import SelectEdit from "./Select/SelectEdit";


export type AllowedSubtypes = {
    [key: string]: FieldType,
}

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
            EditFC: NumberEdit
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
            EditFC: BooleanEdit
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
            EditFC: RadioEdit
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
                    {
                        label: 'Option 1',
                        value: '0'
                    },
                    {
                        label: 'Option 2',
                        value: '1'
                    },
                    {
                        label: 'Option 3',
                        value: '2'
                    }
                ]
            } as SelectSubtype,
            SubtypeFC: SelectST,
            EditFC: SelectEdit
        }
    }
}

export default DefaultSubtypes;