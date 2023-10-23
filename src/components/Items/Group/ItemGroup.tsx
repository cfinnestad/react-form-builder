import React from "react";
import {GroupProps} from "../Items";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import ShowItem from "../ShowItem";
import {Box, List, ListItem, Stack, Typography} from "@mui/material";
import {activeStyle} from "../../Builder/Builder";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

const ItemGroup = ({item, items, options, activeItem, setActiveItem, errorHandler}: GroupProps) => {
    if (options.Mode === "build") {
        return <>
            <Typography variant="h5">{item.label}</Typography>
            <Box style={activeItem?.id === undefined && activeItem?.groupId === item.id ? activeStyle : undefined}>
                <DensitySmallIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} onClick={() => setActiveItem && setActiveItem({id: undefined, groupId: item.id})} />
                <Box component="span" sx={{ flexGrow: 1 }}>
                    Add to top of this group
                </Box>
            </Box>
            <SortableContext
                items={item.items.map(item => item.id)}
                strategy={verticalListSortingStrategy}>
                {item.items.map((itm) => <ShowItem key={itm.id} item={itm} items={items} activeItem={activeItem} setActiveItem={setActiveItem} errorHandler={errorHandler} groupId={item.id} options={options}/>)}
            </SortableContext>
        </>
    }
    if (item.deprecated) return <></>
    return <>
        <Stack>
            <Typography sx={{marginBottom: -1, fontWeight: 'bold', fontSize: '1.25rem'}}>{item.label}</Typography>
            <List dense sx={{padding: 0}}>
                <ListItem sx={{display: 'block', padding: '0px'}}>
                    {item.items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options} />)}
                </ListItem>
            </List>
        </Stack>
    </>
}

export default ItemGroup