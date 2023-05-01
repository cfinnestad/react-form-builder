import React, {Dispatch, SetStateAction} from "react";
import {Nav} from "react-bootstrap";

interface ClearProps {
    SetItems: Dispatch<SetStateAction<Item[]>>
}
const Clear = ({SetItems}: ClearProps) => {
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