import React from "react";
import {isGroup, ItemProps} from "../Items";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import ShowItem from "../ShowItem";
import {Box, FormLabel, List, ListItem, Stack, Typography} from "@mui/material";

const ItemGroup = ({item, items, options}: ItemProps) => {
    if (!isGroup(item)) return <></>
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
        <Stack spacing={2}>
            <div>{item.label}</div>
            <List dense>
                <ListItem sx={{display: 'block'}}>
                    {item.items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>)}
                </ListItem>
            </List>
        </Stack>
    </>
}

export default ItemGroup