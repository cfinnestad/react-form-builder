import React from "react";
import {isField, isNamed, ItemProps} from "./Items";
import {Box} from "@mui/material";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ItemFC from "./ItemFC";
import {SortableItem, DragHandle} from "../SortableItem";
import Filter from "../Filter/Filter";
import FindDragItem from "./findDragItem";
import {updateItems} from "../Builder";
import {cloneDeep} from "lodash";
import {v4} from "uuid";
import {droppableStyle, MAIN} from "../Builder/Builder";
import {fixItemName} from "../Builder/OnDragEnd";

type ShowItemsProps = ItemProps & {
    key?: string|number
}

export const ShowItem = ({item, items, options}: ShowItemsProps) => {

    if (options.IsBuild) {
        const openModal = () => {
            options.SetItem(item)
            if(options.setModal) {
                options.setModal(true)
            }
        }

        const copyItem = (id:string) => {
            const itemRef = FindDragItem(id, items, MAIN)
            if (itemRef) {
                const item = fixItemName(cloneDeep(itemRef.item),itemRef)
                options.setItems(updateItems(items, itemRef.groupId, [
                    ...itemRef.items.slice(0,itemRef.index+1),
                    item,
                    ...itemRef.items.slice(itemRef.index+1,itemRef.items.length)
                ]))
            }
        }

        const deleteItem = (id:string) => {
            const itemRef = FindDragItem(id, items, MAIN)
            if (itemRef) {
                options.setItems(updateItems(items, itemRef.groupId, itemRef.items.filter(item => id !== item.id)))
            }
            // const deleteById = (id: string, items: AnyItem[]): AnyItem[] => {
            //     const item = items.find(itm => id === itm.id)
            //     if (item && isGroup(item) && options.deleteItemSection) {
            //         options.deleteItemSection(id)
            //     }
            //     return items.filter(item => item.id !== id).map(item => {
            //         if (isGroup(item)) {
            //             item.items = deleteById(id, item.items)
            //         }
            //         return {...item}
            //     })
            // }
            //
            // options.setItems(deleteById(id, items))
        }

        return (
            <SortableItem key={item.id} id={item.id}>
                <DragHandle>
                    <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                </DragHandle>
                <Box component="div" sx={{ flexGrow: 1 }}>
                    { ItemFC({item: item, items: items, options: options})}
                </Box>
                <ModeRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={openModal}/>
                <ContentCopyRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={() => copyItem(item.id)}/>
                <DeleteForeverRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={() => deleteItem(item.id)}/>
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
        <ItemFC key={item.id} item={item} items={items} options={options}/>
    </>

}

export default ShowItem