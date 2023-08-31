import React from 'react'
import {Card} from "@mui/material";
import {AnyItem} from "../Items";

type TemplateProps = {
    name: string,
    items: AnyItem[],
    addItems: (items: AnyItem[]) => void
}
const Template = ({name, items, addItems}:TemplateProps) => {
    return <>
        <Card variant="outlined" onClick={() => addItems(items)} style={{cursor: "cell", margin: "3px", padding: "2px"}}>
            {name}
        </Card>
    </>
}

export default Template