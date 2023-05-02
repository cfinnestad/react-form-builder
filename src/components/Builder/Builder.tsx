import React, {Dispatch, SetStateAction, useState} from "react";
import Actions, {AllowedItems, Options} from "../Actions/Actions";
import {Col, Container, Row} from "react-bootstrap";
import DefaultItems from "./BuildItems/DefaultItems";
import {ItemProps} from "../Items/Items";


interface BuilderProps {
    Items?: Item[],
    Options?: Options,
    SetOptions?: Dispatch<SetStateAction<Options>>
    SetItems?: Dispatch<SetStateAction<Item[]>>
}

const Builder = ({ Items, Options}: BuilderProps) => {
    const [items, setItems] = useState(Items || [])
    const [options, setOptions] = useState(Options || {})
    const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {} })
    const itemsProps = items.map((row, index) => {
        const [item, setItem] = useState(row)
        const mySetItem = (item: Item) => {
            setItem(item)
            items[index] = item
            setItems(items)
        }

        const props: ItemProps = {
            Item: row,
            ItemFC: AllowedItems[row.type].ItemFC,
            SetItem: mySetItem,
            Options: options
        }

        return props
    })

    return <div className='builder'>
        <Actions Items={items} SetItems={setItems} Options={options}/>d
        <Container>
        <Row>
            {/*<Col xs={8}><BuildItems Items={items} SetItems={setItems()} Options={options}/></Col>*/}
            {/*<Col ><ShowTypes ItemTypes={ItemTypes}></Col>*/}
        </Row>
        </Container>

    </div>
}

export default Builder