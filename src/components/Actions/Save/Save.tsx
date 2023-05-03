import React from "react";
import {ActionProps} from '../Actions'
import {Button, Typography} from "@mui/material";

const Save = ({Items, Options}: ActionProps) => {
    const saveItems = () => {
        if (Options["onSave"]) {
            Options.onSave(Items)
        }
    }
    return <>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button color="inherit" onClick={saveItems}>Save</Button>
        </Typography>
    </>
}

export default Save