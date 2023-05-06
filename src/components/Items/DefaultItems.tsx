import React from "react";
import {ItemType} from "./Items";
import Field from "./Field/Field";
import FieldEdit from "./Field/FieldEdit";
import { AllowedSubtypes } from "./Subtypes/DefaultSubTypes";

export type AllowedItems = {
    [key: string]: ItemType,
}

const DefaultItems = (allowedSubtypes: AllowedSubtypes): AllowedItems => {
    return {
        Field: {
            Item: {
                // TODO add comments to explain these.
                id: 'Field',
                type: 'Field',
                required: false,
                label: 'Text',
                name: 'text',
                deprecated: false,
                subtype: allowedSubtypes.Text.Subtype
            },
            ItemFC: Field,
            EditFC: FieldEdit
        }
    }
}

export default DefaultItems