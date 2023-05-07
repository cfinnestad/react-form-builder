import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import Actions, {ActionFC, ActionProps} from "../Actions/Actions";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import ShowItems from "../Items/ShowItems";
import ShowTypes from "../Items/ShowTypes";
import {AnyItem, GroupItem} from "../Items/Items";
import {Box, Grid} from "@mui/material";
import {v4 as uuid} from "uuid"
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult, DraggableLocation} from "react-beautiful-dnd"
import DefaultSubtypes, {AllowedSubtypes} from "../Items/Subtypes/DefaultSubTypes";
import Transfer from "../Actions/Transfer/Transfer";
import Save from "../Actions/Save/Save";
import Clear from "../Actions/Clear/Clear";
import SetItem from "../Items/SetItem";
import onDragEnd from "./OnDragEnd";

type BuilderOptions = {
    Actions?: ActionFC[],
    ActionsAppend?: FC<ActionProps>[]
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
}
export type Options = {
    Actions: FC<ActionProps>[],
    AllowedItems: AllowedItems,
    AllowedSubtypes: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    SetItem: Dispatch<SetStateAction<AnyItem>>,
    SetItems: Dispatch<SetStateAction<AnyItem[]>>,
    IsBuild: boolean,
    // onDragEnd?: (result: DropResult) => void,
}

export type BuilderProps = {
    Items?: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options?: BuilderOptions,
}

const grid:number = 2;
const getListStyle = (isDraggingOver: boolean):{} => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    minHeight: 400
});

const Builder = ({ Items, SetItems, Options }: BuilderProps) => {
    const [items, setItems] = useState(Items || [])
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)

    const AllowedSubtypes: AllowedSubtypes = {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})}
    const AllowedItems:AllowedItems = {...(Options?.AllowedItems || DefaultItems(AllowedSubtypes)), ...(Options?.AdditionalItems || {})}
    const MyActions:ActionFC[] = [Transfer, Save, Clear]
        //{...(Options?.Actions || [Transfer, Save, Clear]), ...(Options?.ActionsAppend || [] as FC<ActionProps>[])}
    const options:Options = {...(Options || {}),
        Actions: MyActions,
        AllowedSubtypes: AllowedSubtypes,
        AllowedItems: AllowedItems,
        IsBuild: true,
        SetItem: setItem,
        SetItems: setItems,
        // options._reorder= reorder
        // options._move = move
        // options._copy = copy
        // options._updateItems = updateItems
        // options._getList = getList
        // onDragEnd: onDragEnd
    }


    useEffect(() => {
        if(SetItems) {
            SetItems(items)
        }
    }, [items])

    useEffect(()=>{
        setItems(SetItem(item, items))
    },[item])

    return <div className='builder'>
        <Actions Items={items} Options={options}/>
        <Box>
            <DragDropContext onDragEnd={(results) => onDragEnd(results, items, options)}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Droppable type='Item' droppableId="mainItems">
                            {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <ShowItems Items={items} Options={options} type="Item"/>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Grid>
                    <Grid item xs={2}>
                        <Droppable type='Item' droppableId="Types" isDropDisabled={true}>
                            {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <ShowTypes AllowedItems={options.AllowedItems}/>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Grid>
                </Grid>
            </DragDropContext>
        </Box>

    </div>
}

export default Builder