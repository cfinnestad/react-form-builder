import React, {FC, useState} from "react";
import Actions, {ActionProps} from "../Actions/Actions";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import ShowItems from "../Items/ShowItems";
import ShowTypes from "../Items/ShowTypes";
import { AnyItem, ItemProps } from "../Items/Items";
import {Box, Grid} from "@mui/material";


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

const Builder = ({ Items, Options }: BuilderProps) => {
    console.log('ITEMS::', Items)
    console.log('OPTIONS:::', Options)

    const [items, setItems] = useState(Items || [])
    const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {}) }



    const itemProps: ItemProps[] = items.map((row) => ({
        Item: row,
        Items: items,
        ItemFC: AllowedItems[row.type].ItemFC,
        SetItems: setItems,
        Options: Options || {}
    }))

    return <div className='builder'>
        <Actions Items={items} SetItems={setItems} Options={Options || {}}/>
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={10}><ShowItems ItemPropsArray={itemProps}/></Grid>
                <Grid item ><ShowTypes AllowedItems={AllowedItems}/></Grid>
            </Grid>
        </Box>

    </div>
}

export default Builder