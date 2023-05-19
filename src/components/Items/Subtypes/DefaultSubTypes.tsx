import React from "react";
import NumberST from './Number/NumberST'
import NumberEdit from './Number/NumberEdit'
import Text  from './Text/Text'
import TextEdit  from './Text/TextEdit'
import {EmailSubtype, FieldType, NumberSubtype, TextSubtype} from "../Items";
import Email from "./Email/Email";
import EmailEdit from "./Email/EmailEdit";

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
            SubtypeFC: Text,
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
            SubtypeFC: Email,
            EditFC: EmailEdit,
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
        }
    }
}

export default DefaultSubtypes