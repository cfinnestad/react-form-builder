import React, {useEffect, useState} from "react";
import ShowItem from "../ShowItem";
import {Button,  Grid, List, ListItem, ListItemIcon, Stack, Typography} from "@mui/material";
import {ListProps, ListItemProps, AnyItem, InListItem, ListItem as LI, isList, isListItem} from "../Items";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {cloneDeep} from "lodash";

const ShowListItem = ({item, items, options, errorHandler, index, parentItem}: ListItemProps) => {
    const [listItem, setListItem] = useState<AnyItem>(item);
    useEffect(() => {
        // console.log('parentItem', parentItem);
        // console.log('listItem', listItem);
        if (listItem.id === parentItem.baseItem.id) {
            options.SetItem({...parentItem, baseItem: listItem} as LI);
        } else {
            options.SetItem({...parentItem, baseItem: listItem} as LI);
        }
    },[listItem]);
    return <ShowItem item={item} items={items} options={{...options, SetItem: setListItem}} errorHandler={errorHandler}></ShowItem>
}

const ItemList = ({item, items, options, activeItem, setActiveItem, errorHandler}: ListProps) => {
    const genList = (): InListItem[] => {
        // console.log('genList item', item);
        const newList = item.list ? [...item.list] : [];
        // console.log('newList',newList);
        let index = newList.length
        while (index < item.minListSize ) {
            index = newList.push({
                ...cloneDeep(item.baseItem),
                id: item.baseItem.id + '-' + index.toString(),
                name: item.baseItem.name + '-' + index.toString()
            })
        }
        return newList
    }

    const [list, setList] = useState<InListItem[]>(genList());
    // const [listItem, setListItem] = useState<AnyItem>(item.baseItem);
    // useEffect(() => {
    //     console.log('parentItem', item);
    //     console.log('listItem', listItem);
    //     const regex= new RegExp('^' + item.baseItem.id + '(\\[\d+\\])?$')
    //     if(isListItem(listItem) && listItem.id === item.baseItem.id) {
    //         options.SetItem({...item, baseItem: listItem} as LI);
    //     } else {
    //         options.SetItem(listItem);
    //     }
    // },[listItem]);
    useEffect(() => {
        options.SetItem({...item, list: list} as LI)
    }, [list])

    const InListOptions = () => {
        // console.log('inListOptions', {...options, custom: {...options.custom, inList: true, parentItem: item}})
        return  {...options, custom: {...options.custom, inList: true, parentItem: item}}
    }

    if (options.Mode === "build") {
        return <>
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
        const lst = [...(item.list ?? [])]
        const itm = cloneDeep(item.baseItem);

        itm.id += '-' + lst.length.toString();
        itm.name += '-' + lst.length.toString();
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
            { item.label ? <Typography sx={{fontWeight: 'bold', fontSize: '1.25rem'}}>{item.label}</Typography> : undefined }
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