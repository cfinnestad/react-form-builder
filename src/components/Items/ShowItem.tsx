import React from "react";
import {AnyItem, isField, ItemProps} from "./Items";
import {Box} from "@mui/material";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ItemFC from "./ItemFC";
import {SortableItem, DragHandle} from "../SortableItem";
import Filter from "../Filter/Filter";
import FindDragItem from "./findDragItem";
import {cloneDeep} from "lodash";
import {activeStyle, MAIN} from "../Builder/Builder";
import {fixItemName, updateItems} from "../Builder/OnDragEnd";
import DeleteItem from "./DeleteItem";

type ShowItemsProps = ItemProps & {
    key?: string|number
}

export const ShowItem = ({item, items, options, activeItem, setActiveItem, groupId}: ShowItemsProps) => {
    if (options.IsBuild) {
        const openModal = () => {
            options.SetItem(item)
            if(options.setModal) {
                options.setModal(true)
            }
        }

        const copyItem = (id:string, items:AnyItem[]) => {
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

        const deleteItem = (id:string, items:AnyItem[]) => {
            // console.log('deleteItem', items)
            options.setItems(DeleteItem(id, items))
        }

        return <>
            <SortableItem key={item.id} id={item.id} style={activeItem?.id === item.id && activeItem?.groupId === groupId ? activeStyle : undefined}>
                <DragHandle>
                    <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                </DragHandle>
                <Box component="div" sx={{ flexGrow: 1 }}>
                    { ItemFC({item: item, items: items, activeItem: activeItem, setActiveItem: setActiveItem, groupId: groupId, options: options})}
                </Box>
                <ModeRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={openModal}/>
                <ContentCopyRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={() => copyItem(item.id, items)}/>
                <DeleteForeverRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={() => deleteItem(item.id, items)}/>
            </SortableItem>
        </>
    }

    if (isField(item) && (item.deprecated || item.backend_only)) {
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