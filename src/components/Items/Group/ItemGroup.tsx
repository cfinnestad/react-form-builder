import React from "react";
import {GroupProps} from "../Items";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import ShowItem from "../ShowItem";
import {List, ListItem, Stack, Typography} from "@mui/material";

const ItemGroup = ({item, items, options}: GroupProps) => {
    if (options.IsBuild) {
        return <>
            <Typography variant="h5">{item.label}</Typography>
            <SortableContext
                items={item.items.map(item => item.id)}
                strategy={verticalListSortingStrategy}>
                {item.items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>)}
            </SortableContext>
        </>
    }
    if (item.deprecated) return <></>
    return <>
        <Stack>
            <Typography sx={{marginBottom: -1, fontWeight: 'bold', fontSize: '1.25rem'}}>{item.label}</Typography>
            <List dense sx={{padding: 0}}>
                <ListItem sx={{display: 'block', padding: '0px'}}>
                    {item.items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>)}
                </ListItem>
            </List>
        </Stack>
    </>
}

export default ItemGroup