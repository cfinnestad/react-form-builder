import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import React, {useState} from "react"
import {ActionProps} from "../Actions";
import {Typography} from "@mui/material";


const jsonSpacing = 3

export const Transfer = ({Items, SetItems}: ActionProps) => {
    const [itemsText, setItemsText] = useState(JSON.stringify(Items, null, jsonSpacing))
    const [isOpen, setIsOpen] = useState(false)
    const [invalidJSON, setInvalidJSON] = useState(false)
    const [unchanged, setUnchanged] = useState(true)


    const Open = () => {
        setIsOpen(true)
    }
    const Close = () => {
        setIsOpen(false)
    }
    const SaveText = (event: any) => {
        try {
            JSON.parse(event.target.value)
            setInvalidJSON(false);
            setItemsText(event.target.value)
        } catch (error) {
            setInvalidJSON(true)
        }
        setUnchanged(true)
    }
    const Save = () => {
        if (!invalidJSON) {
            SetItems(JSON.parse(itemsText))
        }
    }
    const Copy = () => {
        if (!invalidJSON) {
            navigator.clipboard.writeText(itemsText)
        }
    }
    const Reset = () => {
        setItemsText(JSON.stringify(Items, null, jsonSpacing))
        setInvalidJSON(true)
        setUnchanged(false)
    }

    return <>

        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button color="inherit" onClick={Open}>Transfer</Button>
            <Dialog
                maxWidth="lg"
                open={isOpen}
                onClose={Close}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <DialogTitle>Export JSON Definition</DialogTitle>
                <DialogContent>
                    <TextField variant="standard" multiline minRows={15} error={invalidJSON} value={itemsText}
                               onChange={SaveText}/>
                    {invalidJSON ?? <p>JSON is invalid</p>}
                </DialogContent>
                <DialogActions>
                    <Button color="info" onClick={Copy} disabled={invalidJSON}>Copy</Button>
                    <Button color="success" onClick={Save} disabled={unchanged || invalidJSON}>Save</Button>
                    <Button color="warning" onClick={Reset} disabled={unchanged}>Reset</Button>
                    <Button color="secondary" onClick={Close}>Close</Button>
                </DialogActions>
            </Dialog>
        </Typography>
    </>
}

export default Transfer