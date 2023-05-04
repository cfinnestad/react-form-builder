import React, {FC, useEffect, useState} from "react";
import Actions, {ActionProps} from "../Actions/Actions";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import ShowItems from "../Items/ShowItems";
import ShowTypes from "../Items/ShowTypes";
import { AnyItem, ItemProps } from "../Items/Items";
import {Box, Grid} from "@mui/material";
import {uuid} from "uuidv4"
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult, DraggableLocation} from "react-beautiful-dnd"

export type Options = {
    Actions?: FC<ActionProps>[],
    ActionsAppend?: FC<ActionProps>[]
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    onSave?: (Items: AnyItem[]) => void,
    _SetItem?: (Item: AnyItem) => void,
    _AddItem?: (Item: AnyItem, index:number, groupId?: string) => void
}

export type BuilderProps = {
    Items?: AnyItem[],
    Options?: Options,
}

type ListType = {
    id: string[]
    list?: AnyItem[]
}

const grid:number = 2;
const getListStyle = (isDraggingOver: boolean):{} => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    minHeight: 400
});

const Builder = ({ Items, Options }: BuilderProps) => {
    // console.log('ITEMS::', Items)
    // console.log('OPTIONS:::', Options)

    const [items, setItems] = useState(Items || [])
    const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {}) }
    const itemProps: ItemProps[] = items.map((row) => ({
        Item: row,
        Items: items,
        ItemFC: AllowedItems[row.type].ItemFC,
        SetItems: setItems,
        Options: Options || {}
    }))

    useEffect(() => {
        console.log('Effect', items)
    }, [items])

    const reorder = (list: AnyItem[], startIndex: number, endIndex: number):AnyItem[] => {
        const result: AnyItem[] = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        console.log('Reorder', result)
        return result;
    };

    const move = (source: ListType, destination: ListType, droppableSource:DraggableLocation, droppableDestination:DraggableLocation):AnyItem[] => {
        const sourceClone = [...source.list || []];
        const destClone = [...destination.list || []];
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        let newItems = updateItems(items, source.id, sourceClone)
        return updateItems(newItems, destination.id, destClone)
    };

    const copy = (destination: ListType, droppableDestination:DraggableLocation, type:string) => {
        console.log('==> dest', destination);

        const destClone = [...destination.list || []];
        const item = {...AllowedItems[type].Item};
        item.id = uuid()

        destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
        return updateItems(items, destination.id, destClone)
    };

    const updateItems = (list: AnyItem[], ids: string[], listPart: AnyItem[]): AnyItem[] => {
        const id = ids.pop()
        if (id === undefined) {
            return listPart
        }
        return list.map(AnyItem => {
            if (AnyItem.id === id) {
                (AnyItem as GroupItem).Items = updateItems((AnyItem as GroupItem).Items, ids, listPart)
            }
            return AnyItem
        })
    }

    const getList = (id: string, curList: AnyItem[]): ListType => {
        const list: ListType = {
            id: [],
        }
        if (id === 'mainItems') {
            list.list = curList
        }
        let found = false
        do {
           curList.forEach((Item) => {
               if (Item.id === id) {
                   list.id.push(id)
                   list.list = (Item as GroupItem).Items
                   found = true
               } else if (Item.type === "Group") {
                   let nextList = getList(id, (Item as GroupItem).Items)
                   if (nextList.list !== undefined) {
                       list.id.push(id)
                       list.list = nextList.list
                       found = true
                   }
               }
           })

        } while (!found)
        return list
    }

    const onDragEnd = (result: DropResult):void => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                if (source.index === destination.index) {
                    return
                }
                setItems(reorder(
                        items,
                        source.index,
                        destination.index
                    )
                );
                break;
            case 'Types':
                setItems(
                    copy(
                        getList(destination.droppableId, items),
                        destination,
                        draggableId
                    )
                );
                break;
            default:
                setItems(
                    move(
                        getList(source.droppableId, items),
                        getList(destination.droppableId, items),
                        source,
                        destination
                    )
                );
                break;
        }
    }

    return <div className='builder'>
        <Actions Items={items} SetItems={setItems} Options={Options || {}}/>
        <Box>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Droppable type='Item' droppableId="mainItems">
                            {(provided:DroppableProvided, snapshot:DroppableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    <ShowItems ItemPropsArray={itemProps}/>
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
                                    <ShowTypes AllowedItems={AllowedItems}/>
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