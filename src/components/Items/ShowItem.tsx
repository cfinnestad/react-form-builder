import React from "react";
import {ItemProps} from "./Items";
import {Box} from "@mui/material";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditModal from './EditModal'
import ItemFC from "./ItemFC";
import {SortableItem, DragHandle} from "../SortableItem";

type ShowItemsProps = ItemProps & {
    key?: string|number
}

export const ShowItem = ({Item, Items, Options}: ShowItemsProps) => {
    const ItemProps:ItemProps = {
        Items: Items,
        Item: Item,
        Options: Options
    }

    const openModal = (ItemProps: ItemProps) => {
        console.log('ItemProps', ItemProps)
        console.log('IP', ItemProps)
        Options.SetModal(<EditModal {...ItemProps} />)
    }
    // @ts-ignore
    return (
        <SortableItem id={Item.id}>
            <DragHandle>
                <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
            </DragHandle>
            <Box component="div" sx={{ flexGrow: 1 }}>
                { ItemFC(ItemProps)}
            </Box>
            <ModeRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={()=>openModal(ItemProps)}/>
            <ContentCopyRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
            <DeleteForeverRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
         </SortableItem>
    )
}

export default ShowItem