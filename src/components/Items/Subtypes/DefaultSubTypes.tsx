import React from "react";
import Text, { edit as TextEdit } from './Text/Text'
import {FieldType} from "../Items";

export type AllowedSubtypes = {
    [key: string]: FieldType,
}

const DefaultSubtypes = (): AllowedSubtypes => {
    return {
        Text: {
            Subtype: {
                subtype: 'Text',
                maxLength: 255
            },
            SubtypeFC: Text,
            EditFC: TextEdit,
        }
    }
}

export default DefaultSubtypes