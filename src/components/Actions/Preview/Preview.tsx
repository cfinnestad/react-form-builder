import {ActionProps} from "../Actions";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from "@mui/material";
import React, {useState} from "react";
import Render, {RenderOptions} from "../../Render";
import {itemsCloneDeep} from "../../Items";


const Preview = ({Items, Options}: ActionProps) => {
    const items = itemsCloneDeep(Items)
    const [modal, setModal] = useState(<></>)

    const options = {
        searchableOptions : Options.searchableOptions,
        submitElements : Options.submitElements,
        muiTheme : Options.muiTheme,
        Mode : 'render'
    } as RenderOptions

    const Close = () => {
        setModal(<></>)
    }
    const Open = () => {
        setModal(
        <Dialog
            maxWidth="md"
            fullWidth={true}
            open={true}
            onClose={Close}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <DialogTitle>Export JSON Definition</DialogTitle>
            <DialogContent>
                <Render Items={items} Options={options}/>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={Close}>Close</Button>
            </DialogActions>
        </Dialog>
        )
    }

    return <>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button color="inherit" onClick={Open}>Preview</Button>
            {modal}
        </Typography>
    </>
}

export default Preview