import React, {Dispatch, SetStateAction} from "react"
import {Container, Navbar, Nav} from 'react-bootstrap'
import Transfer from "./Transfer/Transfer"
import Save from "./Save/Save"
import Clear from "./Clear/Clear"
import {ItemType} from "../Items/ShowItems";
import {Options} from "../Builder/Builder"

export interface ActionProps {
    Items: Item[],
    Options: Options,
    SetItems: Dispatch<SetStateAction<Item[]>>
}

const Actions = (ActionProps : ActionProps) => {
        const Actions = ActionProps.Options.Actions || [Transfer, Save, Clear]
        const ActionsAppend = ActionProps.Options.ActionsAppend || []
    return <Navbar bg="light" variant="light">
        <Container>
            <Nav>
                { Actions.map(Action => (Action(ActionProps))) }
                { ActionsAppend.map(Action => (Action(ActionProps))) }
            </Nav>
        </Container>
    </Navbar>
}
export default Actions
