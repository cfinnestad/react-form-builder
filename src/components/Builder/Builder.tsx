import React, {Dispatch, FC, JSX, SetStateAction, useEffect, useState} from "react";
import Actions, {ActionFC, ActionProps} from "../Actions/Actions";
import DefaultItems from "../Items/DefaultItems";
import ShowItem from "../Items/ShowItem";
import {AllowedItems, AllowedSubtypes, AnyItem, GetItem, Option, Options, SubmitButtonProps} from "../Items";
import {Box, Grid, Typography} from "@mui/material";
import DefaultSubtypes from "../Items/Subtypes/DefaultSubTypes";
import Transfer from "../Actions/Transfer/Transfer";
import Save from "../Actions/Save/Save";
import Clear from "../Actions/Clear/Clear";
import UpdateItemInItems from "../Items/UpdateItemInItems";
import onDragEnd from "./OnDragEnd";
import {closestCenter, DndContext, useSensor, PointerSensor, KeyboardSensor, DragOverlay} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Errors, {ErrorType, GetError} from "../Errors/Errors";
import {Theme, useTheme} from "@mui/material/styles";
import EditModal from "../Items/EditModal";
import {SortableOverlay} from "../SortableOverlay";
import ShowTypes from "../Items/ShowTypes";
import {DragStartEvent} from "@dnd-kit/core/dist/types";
import {cloneDeep} from "lodash";
import {SortableItem} from "../SortableItem";

export type BuilderOptions = {
    Actions?: ActionFC[],
    ActionsAppend?: FC<ActionProps>[]
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    Errors?: ErrorType,
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[]
    },
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element
    }
    muiTheme?: Theme,
    custom?: {[key:string]: any}
}

export type BuilderProps = {
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    Items?: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options?: BuilderOptions
}

const Builder = ({ Items, SetItems, Options }: BuilderProps) => {
    const [items, setItems] = useState<AnyItem[]>(Items || [])
    const [modal, setModal] = useState( false )
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)
    const sensors = [
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    ]
    const [activeItem, setActiveItem] = useState<AnyItem|undefined>(undefined);
    const defaultTheme = useTheme()

    const options:Options = {...(Options || {}),
        Actions: [...(Options?.Actions ?? [Transfer,Save,Clear]), ...(Options?.ActionsAppend ?? [])],
        AllowedSubtypes: {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})},
        AllowedItems: {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {})},
        IsBuild: true,
        SetItem: setItem,
        setItems: setItems,
        setModal: setModal,
        getError: (error: string, item: AnyItem) => {
            return GetError(error, item, {...Errors(), ...(Options?.Errors ?? {})})
        },
        muiTheme: Options?.muiTheme ?? defaultTheme,
        custom: Options?.custom
    }
    useEffect(() => {
        if(SetItems) {
            SetItems(items)
        }
        setActiveItem(undefined)
    }, [items])

    useEffect(() => {
        console.log('SET ITEM', item)
        setItems(UpdateItemInItems(item, items))
    },[item])

    const onDragStart = (event: DragStartEvent) => {
        const item = cloneDeep(event.active.data.current?.Item)
        setActiveItem(item)
    }

    return <div className='builder'>
        <Actions Items={items} Options={options}/>
        <Box>
            <DndContext
                sensors={sensors}
                // collisionDetection={closestCenter}
                onDragEnd={(results) => onDragEnd(results, items, options, setActiveItem)}
                // onDragStart={onDragStart}
            >
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <SortableContext
                            id="-Main-"
                            items={[...items.map(item => item.id),'-placeholder-']}
                            strategy={verticalListSortingStrategy}>
                            {items.map((item) => <ShowItem item={item} items={items} options={options}/>)}
                            <SortableItem id='-placeholder'>
                                <Box component="div" sx={{ flexGrow: 1 }}>Drop at end</Box>
                            </SortableItem>
                        </SortableContext>
                        <SortableOverlay>
                            {activeItem ? (<>
                                <Box>{activeItem.type}</Box>
                            </>) : undefined}
                        </SortableOverlay>
                    </Grid>
                    <Grid item xs={2}>
                        <ShowTypes AllowedItems={options.AllowedItems}/>
                    </Grid>
                </Grid>
                <DragOverlay>
                    {activeItem ? (<>
                        <Box>{activeItem.type}</Box>
                    </>) : undefined}
                </DragOverlay>
            </DndContext>
            <EditModal showModal={modal} item={item} items={items} options={options}></EditModal>
        </Box>

    </div>
}

export default Builder