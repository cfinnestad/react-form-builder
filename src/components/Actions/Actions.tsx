import React, {Dispatch, SetStateAction} from "react"
import {Container, Navbar, Nav} from 'react-bootstrap'
import Transfer from "./Transfer/Transfer"
import Save from "./Save/Save"
import Clear from "./Clear/Clear"
import {AnyItem} from "../Items/Items";
import {Options} from "../Builder/Builder"

export interface ActionProps {
    Items: AnyItem[],
    Options: Options,
    SetItems: Dispatch<SetStateAction<AnyItem[]>>
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
