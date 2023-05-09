import React from "react";
import {GroupItem, isGroup, ItemProps} from "../Items";
// import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from "react-beautiful-dnd";
import ShowItems from "../ShowItem";
import onDragEnd from "../../Builder/OnDragEnd";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import ShowItem from "../ShowItem";
import {Box, FormLabel, List, ListItem, Typography} from "@mui/material";

const grid = 3
const getListStyle = (isDraggingOver: boolean):{} => ({
    background: isDraggingOver ? 'lightblue' : 'grey',
    padding: grid,
    minHeight: 40
});

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
    return <>
        <Box marginTop={2} marginBottom={1}>
            <FormLabel sx={{marginLeft: "0.71em", marginTop: "-0.75em", zIndex: 2, paddingX: 0.5, backgroundColor: "#fff", position: "absolute", fontSize: "0.75em", fontWeight: 400}}>
                {item.label}
            </FormLabel>
            <List dense sx={{ borderRadius: 1, border: 1, borderColor: 'grey.600', "&:hover": { borderColor: 'grey.200' }}}>
                <ListItem>
                    {item.items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>)}
                </ListItem>
            </List>
        </Box>

    </>
}

export default ItemGroup