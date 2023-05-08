import React, {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from "react";
import Actions, {ActionFC, ActionProps} from "../Actions/Actions";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import ShowItem from "../Items/ShowItem";
import ShowTypes from "../Items/ShowTypes";
import {AnyItem} from "../Items/Items";
import {Box, Grid} from "@mui/material";
import DefaultSubtypes, {AllowedSubtypes} from "../Items/Subtypes/DefaultSubTypes";
import Transfer from "../Actions/Transfer/Transfer";
import Save from "../Actions/Save/Save";
import Clear from "../Actions/Clear/Clear";
import SetItem from "../Items/SetItem";
import onDragEnd from "./OnDragEnd";
import {closestCenter, DndContext, useSensor, PointerSensor, KeyboardSensor, Active,} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableOverlay} from "../SortableOverlay";

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
    SetModal: Dispatch<SetStateAction<JSX.Element>>,
    IsBuild: boolean,
    // onDragEnd?: (result: DropResult) => void,
}

export type BuilderProps = {
    Items?: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options?: BuilderOptions,
}

const Builder = ({ Items, SetItems, Options }: BuilderProps) => {
    const [active, setActive] = useState<null | Active>(null)
    const [items, setItems] = useState<AnyItem[]>(Items || [])
    const [modal, setModal] = useState( <></>)
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)

    const sensors = [useSensor(PointerSensor),useSensor(KeyboardSensor)]

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
        SetModal: setModal,
    }

    const activeItem = useMemo(
        () => items.find((item) => item.id === active?.id),
        [items, active?.id]
    );

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
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={({ active }) => {
                    setActive(active);
                }}
                onDragCancel={() => {
                    setActive(null);
                }}
                onDragEnd={(results) => onDragEnd(results, items, options)}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <SortableContext
                            items={items.map(item => item.id)}
                            strategy={verticalListSortingStrategy}>
                            {items.map((item) => <ShowItem key={item.id} Item={item} Items={items} Options={options}/>)}
                        </SortableContext>
                        <SortableOverlay>
                            {activeItem ? ShowItem({Item: activeItem, Items: items, Options:options}) : null}
                        </SortableOverlay>
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
            {modal}
        </Box>

    </div>
}

export default Builder