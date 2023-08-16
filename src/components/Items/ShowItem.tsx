import React from "react";
import {AnyItem, isField, isGroup, isNamed, ItemProps} from "./Items";
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
            const itemRef = FindDragItem(id, items, '-Main-')
            if (itemRef) {
                const item = cloneDeep(itemRef.item)
                if (isNamed(item)) {
                    const name = item.name
                    let cnt=1;
                    while (itemRef.items.filter(itm => isNamed(itm) && itm.name === item.name).length > 0) {
                        item.name = name + '_' + (cnt++).toString()
                    }
                    item.id = (itemRef.groupId === '-Main-' ? '' : itemRef.groupId + '-') + item.name
                } else {
                    item.id = v4()
                }
                updateItems(items, itemRef.groupId, itemRef.items.splice(itemRef.index, 0, item))
            }
        }

        const deleteItem = (id:string) => {
            const deleteById = (id: string, items: AnyItem[]): AnyItem[] => {
                return items.filter(item => item.id !== id).map(item => {
                    if (isGroup(item)) {
                        item.items = deleteById(id, item.items)
                    }
                    return {...item}
                })
            }

            options.setItems(deleteById(id, items))
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
        <ItemFC item={item} items={items} options={options}/>
    </>

}

export default ShowItem