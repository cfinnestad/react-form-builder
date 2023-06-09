import React, {FC} from "react"
import {AppBar, Box, Toolbar, IconButton} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import {AnyItem, Options} from "../Items";

export interface ActionProps {
    Items: AnyItem[],
    Options: Options,
}

export type ActionFC = FC<ActionProps>


const Actions = ({Items, Options}: ActionProps) => {
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                {Options.Actions?.map((Action, index) => <div key={index}><Action Items={Items} Options={Options}/></div>)}
            </Toolbar>
        </AppBar>
    </Box>
}
export default Actions
