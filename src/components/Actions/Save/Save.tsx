import React from "react";
import {Nav} from "react-bootstrap";

interface SaveProps {
    Items: Item[],
    Options: Options
}
const Save = ({Items, Options}: SaveProps) => {
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