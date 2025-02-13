import React, {Dispatch, FC, JSX, SetStateAction, useEffect, useState} from "react";
import Actions, {ActionFC, ActionProps} from "../Actions/Actions";
import DefaultItems from "../Items/DefaultItems";
import {
    AllowedItems,
    AllowedSubtypes,
    AnyItem,
    isGroup,
    BuildErrors,
    Option,
    Options,
    SubmitButtonProps,
    itemsCloneDeep, itemCloneDeep
} from "../Items";
import {Box, Grid, ThemeProvider, Typography} from "@mui/material";
import DefaultSubtypes from "../Items/Subtypes/DefaultSubTypes";
import Transfer from "../Actions/Transfer/Transfer";
import Save from "../Actions/Save/Save";
import Clear from "../Actions/Clear/Clear";
import UpdateItemInItems from "../Items/UpdateItemInItems";
import onDragEnd, {fixItemName, updateItems} from "./OnDragEnd";
import {
    DndContext,
    useSensor,
    PointerSensor,
    useDroppable,
    closestCenter
} from "@dnd-kit/core";
import Errors, {ErrorType, GetError} from "../Errors/Errors";
import {Theme, useTheme} from "@mui/material/styles";
import EditModal from "../Items/EditModal";
import ShowTypes from "../Items/ShowTypes";
import {DragStartEvent} from "@dnd-kit/core/dist/types";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import ShowItem from "../Items/ShowItem";
import findDragItem, {DragItem} from "../Items/findDragItem";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import FindDragItem from "../Items/findDragItem";

export const activeStyle = {
    backgroundColor: '#bbf'
}

export const MAIN = '-Main-'
export const TYPES = '-Types-'
import ErrorHandler from "../Items/ErrorHandler";
import {Preview} from "../Actions";
import Container from "../Collection";
import {Accept} from "react-dropzone";
import {FileTypes} from "../Items/Subtypes/File/FileTypes";

export type CollectionType = {
    name: string,
    items:AnyItem[]
}

export type ActiveType = {
    id: string|undefined,
    groupId: string
}

export type BuilderUseOptions = {
    Actions?: ActionFC[],
    ActionsAppend?: FC<ActionProps>[]
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    Errors?: ErrorType,
    collections?: CollectionType[],
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[]
    },
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element
    }
    muiTheme?: Theme,
    mode: string,
    custom?: {[key:string]: any},
    submitColors?: string[],
    fileTypes?: Accept
}

export type ModalProps = {
    item: AnyItem,
    inList?: boolean,
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
    Options?: BuilderUseOptions,
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
    const [items, setItems] = useState<AnyItem[]>(Items ?? [])
    const [modal, setModal] = useState<ModalProps|undefined>( undefined )
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)
    const { setNodeRef } = useDroppable({ id: MAIN });
    const [errors, setErrors] = useState<BuildErrors>({} as BuildErrors)

    const sensors = [
        useSensor(PointerSensor),
    ]
    const [activeItem, setActiveItem] = useState({id: undefined, groupId: MAIN} as ActiveType);
    const defaultTheme = useTheme()
    const theme = Options?.muiTheme ?? defaultTheme

    const getPalettes = (): string[] => {
        const palettes = []
        for (const [key, value] of Object.entries(theme.palette)) {
            if (value.hasOwnProperty('main')) {
                palettes.push(key);
            }
        }
        return palettes
    }


    const options:BuilderOptions = {...(Options ?? {}),
        Actions: [...(Options?.Actions ?? [Save,Transfer,Preview,Clear]), ...(Options?.ActionsAppend ?? [])],
        AllowedSubtypes: {...(Options?.AllowedSubtypes ?? DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})},
        AllowedItems: {...(Options?.AllowedItems ?? DefaultItems()), ...(Options?.AdditionalItems || {})},
        Mode: 'build',
        SetItem: setItem,
        setItems: setItems,
        setModal: setModal,
        getError: (error: string, item: AnyItem) => {
            return GetError(error, item, {...Errors(), ...(Options?.Errors ?? {})})
        },
        muiTheme: theme,
        submitColors: Options?.submitColors ?? getPalettes(),
        custom: Options?.custom ?? {},
        fileTypes: Options?.fileTypes ?? FileTypes,
    }
    useEffect(() => {
        // console.log('SetItems', items)
        if(SetItems) {
            SetItems(items)
        }
    }, [items])

    useEffect(() => {
        // console.log('SetItem', itemCloneDeep(item))
        const newItems = itemsCloneDeep(items)
        UpdateItemInItems(item, newItems)
        setItems(newItems)
    },[item])

    const addItems = (newItems: AnyItem[]) => {
        let activeRef = findDragItem(activeItem.id ?? activeItem.groupId, items, MAIN)
        // console.log('newItems',newItems)
        // console.log('addItems activeRef', activeRef)
        if (activeRef === undefined) {
            activeRef = {items: items, groupId: MAIN, index: 0} as DragItem
        } else if (activeItem.id === undefined) {
            if (!isGroup(activeRef.item)) return
            activeRef.index = 0
            activeRef.groupId = activeRef.item.id
            activeRef.items = activeRef.item.items
        } else {
            activeRef.index++
        }
        const cloneItems = newItems.map(item => fixItemName(itemCloneDeep(item),activeRef as DragItem))
        // console.log('cloneItems', cloneItems)
        setActiveItem({
            id: cloneItems[cloneItems.length-1].id,
            groupId: activeRef.groupId
        } as ActiveType)
        options.setItems(updateItems(items, activeRef.groupId, [
                ...activeRef.items.slice(0,activeRef.index),
                ...cloneItems,
                ...activeRef.items.slice(activeRef.index,activeRef.items.length)
            ])
        )
    }

    const onDragStart = ({active}: DragStartEvent) => {
        const dragItem = FindDragItem(active.id, items, MAIN)
        if (dragItem) {
            setActiveItem({id: active.id as string, groupId: dragItem.groupId as string})
        }
    }

    useEffect(() => {
        // console.log('SET ERRORS', errors)
    },[errors])

    const errorHandler = ErrorHandler(errors, setErrors)

    return <ThemeProvider theme={options.muiTheme}>
        <div className='builder'>
            <Actions Items={items} Options={options}/>
            <Box>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(results) => onDragEnd(results, items, options)}
                    onDragStart={onDragStart}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Box style={activeItem?.id === undefined && activeItem?.groupId === MAIN ? activeStyle : undefined}>
                                <DensitySmallIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 , display:'inline'}} onClick={() => setActiveItem({id: undefined, groupId: MAIN})} />
                                <Box component="span" sx={{ flexGrow: 1 }}>
                                    Add to top
                                </Box>
                            </Box>
                            <SortableContext
                                key={MAIN}
                                id={MAIN}
                                items={items.map(item => item.id)}
                                strategy={verticalListSortingStrategy}>
                                <div ref={setNodeRef}
                                     style={{
                                         maxHeight: 'calc(100vh - 100px)',
                                         overflowY: "auto"
                                     }}>
                                    {items.map(item => <ShowItem key={item.id} item={item} items={items} activeItem={activeItem} setActiveItem={setActiveItem} errorHandler={errorHandler} groupId={MAIN} options={options}/>)}
                                </div>
                            </SortableContext>
                        </Grid>
                            <Grid item xs={2}>
                                  <ShowTypes AllowedItems={options.AllowedItems} addItems={addItems}/>
                                  { Options?.collections && Options.collections.length > 0
                                     ? <>
                                           <Typography variant='overline' align='center' color='#1976d2'>Collections</Typography>
                                           {(Options?.collections ?? [] as CollectionType[]).map(template => <Container {...template} addItems={addItems}/>)}
                                       </>
                                     : undefined}
                              </Grid>
                    </Grid>
                </DndContext>
                { modal ? <EditModal
                    showModal={!!modal}
                    item={modal.item}
                    items={items}
                    options={options}
                    setActiveItem={setActiveItem}
                    errorHandler={errorHandler}
                    inList={modal.inList ?? false}
                ></EditModal> : <></>}
            </Box>
        </div>
    </ThemeProvider>
}

export default Builder