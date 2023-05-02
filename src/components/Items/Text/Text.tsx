import React from "react";
import {ItemProps} from "../Items";
import {Form, FormGroup, FormLabel, InputGroup} from "react-bootstrap"
import {Options} from ''

export interface TextItem extends FieldItem {
    type: 'text',
}

const Text = ({Item, SetItem, Options}: ItemProps) => {

    const onChange = (event: React.FormEvent<HTMLInputElement>, Item: TextItem) => {
        const value = event.currentTarget.value || null
        if (Item.required && value === null) {
            return false
        }
    }
    let Item;
    return <FieldItem {...props} >
         <FormLabel>
             { Item.label }
         </FormLabel>
        <Form.Control type="text" value={props.Item.value} onChange={(event) => onChange(event, props.Item)}/>
    </FieldItem>
}

export default Text