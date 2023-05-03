import React, {Dispatch, SetStateAction} from "react"
import {AppBar, Box, Toolbar, IconButton, Typography} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Transfer from "./Transfer/Transfer"
import Save from "./Save/Save"
import Clear from "./Clear/Clear"
import {AnyItem} from "../Items/Items";
import {Options} from "../Builder/Builder"

export interface ActionProps {
    Items: AnyItem[],
    Options: Options,
    SetItems: Dispatch<SetStateAction<AnyItem[]>>
}

const Actions = (ActionProps : ActionProps) => {
        const Actions = ActionProps.Options.Actions || [Transfer, Save, Clear]
        const ActionsAppend = ActionProps.Options.ActionsAppend || []
    return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                { [...Actions, ...ActionsAppend].map(Action => <Action {...ActionProps}/>) }
            </Toolbar>
        </AppBar>
    </Box>
}
export default Actions
