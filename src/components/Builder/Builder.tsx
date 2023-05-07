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
    // AddItem: (Item: AnyItem, index:number, groupId?: string) => void,
    IsBuild: boolean,
    // _reorder?: (list: AnyItem[], startIndex: number, endIndex: number) => AnyItem[] ,
    // _move?: (source: ListType, destination: ListType, droppableSource:DraggableLocation, droppableDestination:DraggableLocation) => AnyItem[],
    // _copy?: (destination: ListType, droppableDestination:DraggableLocation, type:string) => AnyItem[],
    // _updateItems?: ((list: AnyItem[], ids: string[], listPart: AnyItem[]) => AnyItem[],
    // _getList?: (id: string, curList: AnyItem[]) => ListType,
    onDragEnd?: (result: DropResult) => void,
}

export type BuilderProps = {
    Items?: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options?: BuilderOptions,
}

type ListType = {
    id: string[]
    list?: AnyItem[]
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
        onDragEnd: onDragEnd
    }


    useEffect(() => {
        console.log('items effect', items)
        if(SetItems) {
            SetItems(items)
        }
    }, [items])

    useEffect(()=>{
        setItems(SetItem(item, items))
    },[item])

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
        const item = {...options.AllowedItems[type].Item};
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
        curList.forEach((Item) => {
           if (!found) {
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
           }
        })
        return list
    }

    return <div className='builder'>
        <Actions Items={items} Options={options}/>
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
                                    <ShowItems Items={items} Options={options}/>
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