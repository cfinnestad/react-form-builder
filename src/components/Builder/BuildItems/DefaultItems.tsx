import React, {FC} from "react";
import Text from '../../Items/Text/Text'
import {AllowedItems} from "../../Actions/Actions";


const DefaultItems = (): AllowedItems => {
    let defaultItems: AllowedItems = {}
    defaultItems.Text = {
        Item: {
            type: 'Text',
            required: false
        },
        ItemFC: Text
    }
    return defaultItems
}

export default DefaultItems