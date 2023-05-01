import React, {Dispatch, SetStateAction} from "react";
import {Container, Navbar, Nav} from 'react-bootstrap';
import {Transfer} from "./Transfer/Transfer";
import {Save} from "./Save/Save";
import Clear from "./Clear/Clear";

const Actions = ({Items, Options, SetItems} : ActionProps) => {
    let actions = Options.Actions || <>
        <Transfer Items={Items} SetItems={SetItems}/>
        <Save Items={Items} Options={Options}/>
        <Clear SetItems={SetItems}/>
    </>
    return <Navbar bg="light" variant="light">
        <Container>
            <Nav>
                { Options['Actions'] ? Options.Actions() : }
            </Nav>
        </Container>
    </Navbar>
}
export default Actions