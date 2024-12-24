import React, {useEffect, useState} from "react";
import ShowItem from "../ShowItem";
import {Button,  Grid, List, ListItem, ListItemIcon, Stack, Typography} from "@mui/material";
import {
    ListProps,
    ListItemProps,
    AnyItem,
    InListItem,
    ListItem as LI,
    itemCloneDeep, isGroup, isNamed
} from "../Items";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {cloneDeep} from "lodash";
import {v4} from "uuid";

const ItemList = ({item, items, options, activeItem, setActiveItem, errorHandler}: ListProps) => {
    const [list, setList] = useState<InListItem[]>(item?.listItems ?? []);

    const genList = (): InListItem[] => {
        const newList = [...item.listItems ?? []];
        let index = newList.length
        while (index < item.minListSize ) {
            const newItem = {
                ...cloneDeep(item.baseItem),
                id: item.baseItem.id + '-' + index.toString(),
            };
            if(isGroup(newItem)) {
                newItem.items.map((item) => {
                    if (isNamed(item)) {
                        item.id = newItem.id + '-' + item.name
                    } else {
                        item.id = v4()
                    }
                });
            }
            index = newList.push(newItem)

        }
        return newList
    }

    useEffect(() => {
        if(item?.listItems === undefined) {
            setList(genList())
        }
    }, []);

    useEffect(() => {
        if (options.Mode === "build") return
        if(item?.listItems === undefined) {
            setList(genList());
        } else if(JSON.stringify(item.listItems) !== JSON.stringify(list)) {
            setList(item.listItems);
        }
    }, [item]);

    useEffect(() => {
        if (options.Mode === "build") return
        if(JSON.stringify(item?.listItems ?? []) !== JSON.stringify(list)) {
            options.SetItem({...item, listItems: list} as LI)
        }
    }, [list])

    const InListOptions = () => {
        return  {...options, custom: {...options.custom, inList: true, parentItem: item}}
    }

    if (options.Mode === "build") {
        return <>
            { item.label ? <Typography sx={{fontWeight: 'bold', fontSize: isGroup(item.baseItem) ? '1.35rem' : '1.25rem'}}>{item.label}</Typography> : undefined }
            <ShowItem
                key={item.baseItem.id}
                item={item.baseItem}
                items={items}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                errorHandler={errorHandler}
                options={InListOptions()}/>
        </>
    }


    if (item.deprecated || item.baseItem.deprecated) return <></>

    const onDelete = (index: number) => {
        if (item.minListSize >= list.length ) return
        const lst = [...list]
        lst.splice(index, 1)
        setList(lst)
    }

    const addListItem = () => {
        const lst = itemCloneDeep(list)
        const itm = itemCloneDeep(item.baseItem);

        itm.id += '-' + lst.length.toString();
        if (isGroup(itm)) {
            itm.items.map((item,index) => {
                if (isNamed(item)) {
                    item.id = itm.id + '-' + item.name
                } else {
                    item.id = v4()
                }
            })
        }
        lst.push(itm)
        setList(lst)
    }

    const AddButton = () => {
        // @ts-ignore
        return <Button varient={"contained"} color={item?.addColor ?? options.submitColors[0]} fullWidth
            onClick={()=>addListItem()}
        >{item.addButton ?? 'Add'}</Button>
    }

    return <>
        <Stack>
            { item.label ? <Typography sx={{fontWeight: 'bold', fontSize: isGroup(item.baseItem) ? '1.35rem' : '1.25rem'}}>{item.label}</Typography> : undefined }
            <List dense sx={{padding: 0}}>
                {list.map((listItem, index) => <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={11} sx={{backgroundColor: index % 2 ? 'lightgray' : 'white'}}>
                        <ListItem sx={{display: 'block', padding: '0px'}}>
                            <ShowItem
                                key={listItem.id}
                                item={listItem}
                                items={items}
                                // parentItem={item}
                                // index={index}
                                options={{...options, custom: {...options.custom, inList: true}}}
                                errorHandler={errorHandler}
                            />
                        </ListItem>
                    </Grid>
                    <Grid item xs={1}>
                        { item.minListSize < list.length ?
                            <ListItemIcon
                                aria-label="delete"
                                onClick={() => onDelete(index)}
                                sx={{minWidth: '30px'}}
                            >
                                <DeleteForeverOutlinedIcon />
                            </ListItemIcon> : undefined}
                    </Grid>
                </Grid>)}
            </List>
            {list.length < item.maxListSize ? <>
                <AddButton/>
            </> : undefined}
        </Stack>
    </>
}

export default ItemList