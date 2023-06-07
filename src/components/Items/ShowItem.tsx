import React from "react";
import {isField, ItemProps} from "./Items";
import {Box} from "@mui/material";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditModal from './EditModal'
import ItemFC from "./ItemFC";
import {SortableItem, DragHandle} from "../SortableItem";
import Filter from "../Filter/Filter";

type ShowItemsProps = ItemProps & {
    key?: string|number
}

export const ShowItem = ({item, items, options}: ShowItemsProps) => {
    const itemProps: ItemProps = {
        items: items,
        item: item,
        options: options
    }

    // @ts-ignore


        if (options.IsBuild) {
            const openModal = (ItemProps: ItemProps) => {
                console.log('ItemProps', ItemProps)
                console.log('IP', ItemProps)
                if(options.setModal) {
                    options.setModal(<EditModal {...ItemProps} />)
                }
            }

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

        if (isField(item) && item.deprecated) {
            return <></>
        }
        if (!Filter(item, items, item.filter)) {
            return <></>
        }
        return <>
            <ItemFC {...itemProps}/>
        </>

}

export default ShowItem