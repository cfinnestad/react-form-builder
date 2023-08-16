import React, {Dispatch, FC, JSX, SetStateAction, useEffect, useState} from "react";
import Actions, {ActionFC, ActionProps} from "../Actions/Actions";
import DefaultItems from "../Items/DefaultItems";
import ShowItem from "../Items/ShowItem";
import {AllowedItems, AllowedSubtypes, AnyItem, BuildErrors, Option, Options, SubmitButtonProps} from "../Items";
import {Box, Grid} from "@mui/material";
import DefaultSubtypes from "../Items/Subtypes/DefaultSubTypes";
import Transfer from "../Actions/Transfer/Transfer";
import Save from "../Actions/Save/Save";
import Clear from "../Actions/Clear/Clear";
import UpdateItemInItems from "../Items/UpdateItemInItems";
import onDragEnd from "./OnDragEnd";
import {closestCenter, DndContext, useSensor, PointerSensor, KeyboardSensor} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Errors, {ErrorType, GetError} from "../Errors/Errors";
import {Theme, useTheme} from "@mui/material/styles";
import EditModal from "../Items/EditModal";
import ErrorHandler from "../Items/ErrorHandler";

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
    const [errors, setErrors] = useState<BuildErrors[]>([] as BuildErrors[])

    const sensors = [
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    ]
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
    }, [items])

    useEffect(() => {
        console.log('SET ITEM', item)
        setItems(UpdateItemInItems(item, items))
    },[item])

    useEffect(() => {
        console.log('SET ERRORS', errors)
    },[errors])

    const errorHandler = ErrorHandler(errors, setErrors)

    return <div className='builder'>
        <Actions Items={items} Options={options}/>
        <Box>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(results) => onDragEnd(results, items, options)}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <SortableContext
                            id="Main"
                            items={items.map(item => item.id)}
                            strategy={verticalListSortingStrategy}>
                            {items.map((item) => <ShowItem
                                key={item.id}
                                item={item}
                                items={items}
                                options={options}
                                errorHandler={errorHandler}
                            />)}
                        </SortableContext>
                        {/*<SortableOverlay>*/}
                        {/*    {activeItem ? ShowItem( {item: activeItem, items: items, options:options}) : null}*/}
                        {/*</SortableOverlay>*/}
                    </Grid>
                    <Grid item xs={2}>
                        {/*<ShowTypes AllowedItems={options.AllowedItems}/>*/}
                        {/*<Droppable type='Item' droppableId="Types" isDropDisabled={true}>*/}
                        {/*    {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (*/}
                        {/*        <div*/}
                        {/*            ref={provided.innerRef}*/}
                        {/*            {...provided.droppableProps}*/}
                        {/*            style={getListStyle(snapshot.isDraggingOver)}*/}
                        {/*        >*/}
                        {/*            <ShowTypes AllowedItems={options.AllowedItems}/>*/}
                        {/*            {provided.placeholder}*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</Droppable>*/}
                    </Grid>
                </Grid>
            </DndContext>
            <EditModal
                showModal={modal}
                item={item}
                items={items}
                options={options}
                errorHandler={errorHandler}></EditModal>
        </Box>

    </div>
}

export default Builder