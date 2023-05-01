import {Button, Form, Modal, Nav} from "react-bootstrap"
import React, {Dispatch, SetStateAction, useState} from "react";

const jsonSpacing = 3
interface TransferProps {
    Items: Item[]
    SetItems: Dispatch<SetStateAction<Item[]>>
}

export const Transfer = ({Items, SetItems}: TransferProps) => {
    const [itemsText, setItemsText] = useState( JSON.stringify(Items, null, jsonSpacing))
    const [isOpen, setIsOpen] = useState(false)
    const [invalidJSON, setInvalidJSON] = useState(false)
    const [unchanged, setUnchanged] = useState(true)
    const Open = () => {
        setIsOpen(true)
    }
    const Close = () => {
        setIsOpen(false)
    }
    const SaveText = (event: { target: { value: React.SetStateAction<string> } }) => {
        let text = event.target.value.toString()
        setItemsText(text)
        try {
            JSON.parse(text)
            setInvalidJSON(false);
        } catch (error) {
            setInvalidJSON(true)
        }
        setUnchanged(text === JSON.stringify(Items,null,jsonSpacing))
    }
    const Save = () => {
        if (! invalidJSON) {
            SetItems(JSON.parse(itemsText))
        }
    }
    const Copy = () => {
        if (! invalidJSON) {
            window.navigator.clipboard.writeText(itemsText);
        }
    }
    const Reset = () => {
        setItemsText(JSON.stringify(Items,null,jsonSpacing))
        setInvalidJSON(true)
        setUnchanged(false)
    }

    return <>
        <Nav.Item>
            <Nav.Link onClick={Open}>Export</Nav.Link>
            <Modal
                size="lg"
                show={isOpen}
                onHide={Close}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Export JSON Definition
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control as='textarea' rows={20} value={ itemsText } onChange={SaveText}/>
                    {invalidJSON ?? <p>JSON is invalid</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={Copy} disabled={invalidJSON}>Copy</Button>
                    <Button variant="success" onClick={Save} disabled={ unchanged || invalidJSON}>Save</Button>
                    <Button variant="light" onClick={Reset} disabled={unchanged}>Reset</Button>
                    <Button variant="secondary" onClick={Close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Nav.Item>
    </>
}

export default Transfer