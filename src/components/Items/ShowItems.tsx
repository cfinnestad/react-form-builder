import React, {Dispatch, SetStateAction, useState} from "react";
import { ItemProps } from "./Items";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import {Box} from "@mui/material";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditModal from './EditModal'


type ShowItemsProps = {
    ItemPropsArray: ItemProps[]
}
type ShowItemProps = {
    ItemProps: ItemProps,
    setModal: Dispatch<SetStateAction<JSX.Element>>,
    index: number
}

const grid:number = 3;
const getItemStyle = (draggableStyle: any, isDragging: boolean):{} => ({
    userSelect: 'none',
    padding: 2*grid,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'lightgrey',
    ...draggableStyle
});


const ShowItem = ({ItemProps, index, setModal}: ShowItemProps) => {

    const openModal = (ItemProps: ItemProps) => {
        console.log('ItemProps', ItemProps)
        console.log('IP', ItemProps)
        setModal(<EditModal ItemProps={ItemProps} setModal={setModal} />)
    }
    // @ts-ignore
    return <Draggable type='Item' draggableId={ItemProps.Item.id} index={index}>
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
                    { ItemProps.ItemFC({...ItemProps})}
                </Box>
                <ModeRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={()=>openModal(ItemProps)}/>
                <ContentCopyRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                <DeleteForeverRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
            </Box>
        )}
    </Draggable>
}

const ShowItems = ({ItemPropsArray}: ShowItemsProps) => {
    const [modal, setModal] = useState( <></>)

    return <>
        {
            ItemPropsArray.map((ItemProp, index) => <ShowItem key={index} setModal={setModal} ItemProps={ItemProp} index={index}/> )
        }
        {modal}
    </>
}

export default ShowItems