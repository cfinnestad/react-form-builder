import React from "react";
import {Form,  FormLabel} from "react-bootstrap"
import {TextItem, TextProps} from "../Items";

const Text = ({Item, SetItems, Options}: TextProps) => {

    const onChange = (event: React.ChangeEvent<any>, item: TextItem) => {
        const value = event.currentTarget.value || null
        if (item.required && value === null) {
            return false
        }

    }
    return <>
         <FormLabel>
             { Item.label }
         </FormLabel>
        <Form.Control type="text" value={Item.value} onChange={(event) => {onChange(event, Item)}}/>
    </>
}

export default Text