import React from "react";
import {ItemType} from "./Items";
import Field, { edit as FieldEdit } from "./Field/Field";
import DefaultSubtypes, { AllowedSubtypes } from "./Subtypes/DefaultSubTypes";

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
                name: 'text-1',
                deprecated: false,
                subtype: allowedSubtypes.Text.Subtype
            },
            ItemFC: Field,
            EditFC: FieldEdit
        },
        Hidden: {
            Item: {
                id: 'Hidden',
                type: 'Hidden',
                required: false,
                label: 'Hidden',
                name: 'hidden-1',
                deprecated: false,
                value: 'Hidden value'
            },
            ItemFC: Hidden,
            EditFC: HiddenEdit
        }
    }
}

export default DefaultItems