import React, {FC, useState} from "react";
import Actions, {ActionProps} from "../Actions/Actions";
import {Col, Container, Row} from "react-bootstrap";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import ShowItems from "../Items/ShowItems";
import ShowTypes from "../Items/ShowTypes";
import { AnyItem, ItemProps } from "../Items/Items";


export interface Options {
    Actions?: FC<ActionProps>[],
    ActionsAppend?: FC<ActionProps>[]
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    onSave?: (Items: AnyItem[]) => void,
    _SetItem?: (Item: AnyItem) => void,
    _AddItem?: (Item: AnyItem, index:number, groupId?: string) => void
}

export interface BuilderProps {
    Items?: AnyItem[],
    Options?: Options,
}

const Builder = ({ Items, Options}: BuilderProps) => {
    const [items, setItems] = useState(Items || [])
    const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {}) }
    const itemProps: ItemProps[] = items.map((row) => {
        return {
            Item: row,
            ItemFC: AllowedItems[row.type].ItemFC,
            SetItems: setItems,
            Options: Options || {}
        }
    })

    return <div className='builder'>
        <Actions Items={items} SetItems={setItems} Options={Options || {}}/>d
        <Container>
        <Row>
            <Col xs={8}><ShowItems ItemPropsArray={itemProps}/></Col>
            <Col ><ShowTypes AllowedItems={AllowedItems}/></Col>
        </Row>
        </Container>

    </div>
}

export default Builder