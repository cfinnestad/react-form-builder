import React from "react";
import Text from './Text/Text'
import {ItemType} from "./Items";

type AllowedItems = {
    [key: string]: ItemType,
}

const DefaultItems = () : AllowedItems  => {
    return {
        Text: {
            Item: {
                id: 'Text',
                type: 'Text',
                required: false,
                label: 'Text',
                name: 'text',
                deprecated:false,
            },
            ItemFC: Text
        }
    }
}

export default DefaultItems