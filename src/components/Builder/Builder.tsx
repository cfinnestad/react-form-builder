import React, {Dispatch, FC, JSX, SetStateAction, useEffect, useState} from "react";
import Actions, {ActionFC, ActionProps} from "../Actions/Actions";
import DefaultItems from "../Items/DefaultItems";
import {AllowedItems, AllowedSubtypes, AnyItem, isGroup, Option, Options, SubmitButtonProps} from "../Items";
import {Box, Grid} from "@mui/material";
import DefaultSubtypes from "../Items/Subtypes/DefaultSubTypes";
import Transfer from "../Actions/Transfer/Transfer";
import Save from "../Actions/Save/Save";
import Clear from "../Actions/Clear/Clear";
import UpdateItemInItems from "../Items/UpdateItemInItems";
import onDragEnd from "./OnDragEnd";
import {
    DndContext,
    useSensor,
    PointerSensor,
    DragOverlay, defaultDropAnimation, DropAnimation, closestCorners, useDroppable
} from "@dnd-kit/core";
import Errors, {ErrorType, GetError} from "../Errors/Errors";
import {Theme, useTheme} from "@mui/material/styles";
import EditModal from "../Items/EditModal";
import ShowTypes from "../Items/ShowTypes";
import {DragStartEvent} from "@dnd-kit/core/dist/types";
import OnDragOver from "./OnDragOver";
import itemsSection, {ItemSectionsType} from "./ItemsSection";
import ItemsSection from "./ItemsSection";
import {SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableOverlay} from "../SortableOverlay";
import ShowItem from "../Items/ShowItem";
import {cloneDeep} from "lodash";
import findDragItem from "../Items/findDragItem";

export const droppableStyle = {
    padding: "5px",
    border: "1px solid black",
    borderRadius: "5px",
    minWidth: 200
};

export const MAIN = '-Main-'
export const TYPES = '-Types-'

export type BuilderUseOptions = {
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

export type BuilderOptions = Options & {
    // addItemSection: (id: string, items: AnyItem[]) => void,
    // deleteItemSection: (id: string) => void,
}

export type BuilderProps = {
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    Items?: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options?: BuilderUseOptions
}

// const initItemSections = (items: AnyItem[], groupId: string): ItemSectionsType => {
//     let sections = {[groupId]: items} as ItemSectionsType
//     items.map(item => {
//         if (isGroup(item)) {
//             sections = {...sections, ...initItemSections(item.items, item.id)}
//         }
//     })
//     return sections
// }

const Builder = ({ Items, SetItems, Options }: BuilderProps) => {
    const [items, setItems] = useState<AnyItem[]>(Items || [])
    const [modal, setModal] = useState( false )
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)
    // const [ItemSections, setItemSections] = useState(initItemSections(cloneDeep(items),MAIN));
    const { setNodeRef } = useDroppable({ id: MAIN });
    const sensors = [
        useSensor(PointerSensor),
    ]
    const dropAnimation: DropAnimation = {
        ...defaultDropAnimation,
    };
    const [activeItem, setActiveItem] = useState<AnyItem|undefined>(undefined);
    const defaultTheme = useTheme()

    // const addItemSection = (id: string, items: AnyItem[]) => {
    //     const sections = {...ItemSections}
    //     sections[id] = items
    //     setItemSections(sections)
    // }
    //
    // const deleteItemSection = (id: string) => {
    //     const sections = {...ItemSections}
    //     delete sections[id]
    //     setItemSections(sections)
    // }

    const options:BuilderOptions = {...(Options || {}),
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
        // addItemSection: addItemSection,
        // deleteItemSection: deleteItemSection,
        custom: Options?.custom
    }
    useEffect(() => {
        if(SetItems) {
            SetItems(items)
        }
        setActiveItem(undefined)
        // setItemSections(initItemSections(cloneDeep(items), MAIN))
    }, [items])

    useEffect(() => {
        console.log('SET ITEM', item)
        setItems(UpdateItemInItems(item, items))
    },[item])

    const onDragStart = ({active}: DragStartEvent) => {
        console.warn('DragStart:', active.id)

        const item = active.data.current?.hasOwnProperty('Items') ? active.data.current.Items[0] : undefined
        setActiveItem(item)
    }

    return <div className='builder'>
        <Actions Items={items} Options={options}/>
        <Box>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={(results) => onDragEnd(results, items, options, setActiveItem)}
                onDragStart={onDragStart}
                onDragOver={(request) => OnDragOver(request, items, options)}
                // autoScroll={{layoutShiftCompensation: false}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <SortableContext
                            key={MAIN}
                            id={MAIN}
                            items={items}
                            strategy={verticalListSortingStrategy}
                        >
                            <div ref={setNodeRef} style={droppableStyle}>
                                {items.map(item => <ShowItem key={item.id} item={item} items={items} options={options}/>)}
                            </div>
                        </SortableContext>
                        {/*<ItemsSection id={MAIN} type='sortable' items={items} options={options}/>*/}
                        {/*<SortableOverlay>*/}
                        {/*    {activeId ? (<>*/}
                        {/*        <Box>{activeId}</Box>*/}
                        {/*    </>) : undefined}*/}
                        {/*</SortableOverlay>*/}
                        {/*<DragOverlay dropAnimation={dropAnimation}>*/}
                        {/*    {activeItem ? <Box>activeItem.type</Box> : null}*/}
                        {/*</DragOverlay>*/}
                    </Grid>
                    <Grid item xs={2}>
                        <ShowTypes AllowedItems={options.AllowedItems}/>
                    </Grid>
                </Grid>
                {/*<DragOverlay>*/}
                {/*    {activeId ? (<>*/}
                {/*        <Box>{activeId}</Box>*/}
                {/*    </>) : undefined}*/}
                {/*</DragOverlay>*/}
            </DndContext>
            <EditModal showModal={modal} item={item} items={items} options={options}></EditModal>
        </Box>

    </div>
}

export default Builder