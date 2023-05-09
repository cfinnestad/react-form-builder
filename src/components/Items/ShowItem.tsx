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

export const ShowItem = ({item, items, options}: ShowItemsProps) => {
    const itemProps: ItemProps = {
        items: items,
        item: item,
        options: options
    }

    const openModal = (ItemProps: ItemProps) => {
        console.log('ItemProps', ItemProps)
        console.log('IP', ItemProps)
        options.setModal(<EditModal {...ItemProps} />)
    }
    // @ts-ignore


        if (options.IsBuild) {
            return (
                <SortableItem id={item.id}>
                    <DragHandle>
                        <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                    </DragHandle>
                    <Box component="div" sx={{ flexGrow: 1 }}>
                        { ItemFC(itemProps)}
                    </Box>
                    <ModeRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={()=>openModal(itemProps)}/>
                    <ContentCopyRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                    <DeleteForeverRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                </SortableItem>
            )
        }

        return <Box className="py-4" component="div" sx={{ flexGrow: 1 }} marginTop={1} marginBottom={1}>
            { ItemFC(itemProps)}
        </Box>

}

export default ShowItem