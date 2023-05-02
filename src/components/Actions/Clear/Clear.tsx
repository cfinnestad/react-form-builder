import React, {FC,Dispatch, SetStateAction} from "react";
import {Nav} from "react-bootstrap";
import {ActionProps} from "../Actions";

const Clear = ({SetItems}: ActionProps) => {
    const clearItems = () => {
        SetItems([])
    }
    return <>
        <Nav.Item>
            <Nav.Link onClick={clearItems}>Clear</Nav.Link>
        </Nav.Item>
    </>
}

export default Clear