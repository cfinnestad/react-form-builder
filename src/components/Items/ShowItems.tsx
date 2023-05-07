import React, {useState} from "react";
import {AnyItem, ItemProps} from "./Items";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import {Box} from "@mui/material";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditModal from './EditModal'
import {Options} from "../Builder/Builder";
import ItemFC from "./ItemFC";


type ShowItemsProps = {
    Items: AnyItem[],
    Options: Options,
    type: string
}
type ShowItemProps = {
    ItemProps: ItemProps,
    index: number,
    type: string
}

const grid:number = 3;
const getItemStyle = (draggableStyle: any, isDragging: boolean):{} => ({
    userSelect: 'none',
    padding: 2*grid,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'lightgrey',
    ...draggableStyle
});


const ShowItem = ({ItemProps, index, type}: ShowItemProps) => {

    const openModal = (ItemProps: ItemProps) => {
        console.log('ItemProps', ItemProps)
        console.log('IP', ItemProps)
        ItemProps.setModal(<EditModal {...ItemProps} />)
    }
    // @ts-ignore
    return <Draggable type={type} draggableId={ItemProps.Item.id} index={index}>
        {(providedDraggable: DraggableProvided, snapshotDraggable:DraggableStateSnapshot) => (
            <Box
                ref={providedDraggable.innerRef}
                {...providedDraggable.draggableProps}
                {...providedDraggable.dragHandleProps}
                style={getItemStyle(
                    providedDraggable.draggableProps.style,
                    snapshotDraggable.isDragging
                )}
                sx={{ display:'flex' }}
            >
                <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                <Box component="div" sx={{ flexGrow: 1 }}>
                    { ItemFC(ItemProps)}
                </Box>
                <ModeRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={()=>openModal(ItemProps)}/>
                <ContentCopyRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                <DeleteForeverRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
            </Box>
        )}
    </Draggable>
}

const ShowItems = ({Items, Options, type}: ShowItemsProps) => {
    const [modal, setModal] = useState( <></>)

    return <>
        {
            Items.map((Item, index) => <ShowItem key={index} ItemProps={{Item:Item, Items:Items, Options:Options, setModal:setModal}} index={index} type={type}/> )
        }
        {modal}
    </>
}

export default ShowItems