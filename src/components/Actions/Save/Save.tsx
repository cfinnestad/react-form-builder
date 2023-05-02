import React from "react";
import {Nav} from "react-bootstrap";
import {ActionProps} from '../Actions'

const Save = ({Items, Options}: ActionProps) => {
    const saveItems = () => {
        if (Options["onSave"]) {
            Options.onSave(Items)
        }
    }
    return <>
        <Nav.Item>
            <Nav.Link onClick={saveItems}>Save</Nav.Link>
        </Nav.Item>
    </>
}

export default Save