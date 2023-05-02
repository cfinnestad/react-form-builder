import React, {Dispatch, FC, SetStateAction} from "react"
import {Container, Navbar, Nav} from 'react-bootstrap'
import Transfer from "./Transfer/Transfer"
import Save from "./Save/Save"
import Clear from "./Clear/Clear"
import {ItemProps, ItemType} from "../Items/Items";

export interface ActionProps {
    Items: Item[],
    Options: Options,
    SetItems: Dispatch<SetStateAction<Item[]>>
}

export interface AllowedItems {
    [key: string]: ItemType,
}
export interface Options {
    Actions?: FC<ActionProps>[],
    ActionsAppend?: FC<ActionProps>[]
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    onSave?: (Items: Item[]) => void
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
