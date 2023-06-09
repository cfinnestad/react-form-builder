import React from "react";
import {Button, Typography} from '@mui/material';
import {ActionProps} from "../Actions";

const Clear = ({Options}: ActionProps) => {
    const clearItems = () => {
        Options.setItems([])
    }
    return <>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button color="inherit" onClick={clearItems}>Clear</Button>
        </Typography>
    </>
}

export default Clear