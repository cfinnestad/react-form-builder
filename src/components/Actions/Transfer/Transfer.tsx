import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar} from '@mui/material';
import React, {useState} from "react"
import {ActionProps} from "../Actions";
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';


const jsonSpacing = 3

export const Transfer = ({Items, Options}: ActionProps) => {
    const text = JSON.stringify(Items, null, jsonSpacing)
    const [items, setItems] = useState(Items)
    const [itemsText, setItemsText] = useState(text)
    const [modal, setModal] = useState(<></>)
    const [open, setOpen] = useState(false)
    const [invalidJSON, setInvalidJSON] = useState(false)

    console.log('Transfer', Items)
    if (text !== itemsText) {
        console.log('init text')
        setItemsText(text)
        setItems(Items)
    }

    const Open = () => {
        setModal(
            <Dialog
                maxWidth="lg"
                open={true}
                onClose={Close}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <DialogTitle>Export JSON Definition</DialogTitle>
                <DialogContent>
                    <TextField id='transfer-text' variant="standard" multiline minRows={15} error={invalidJSON} defaultValue={itemsText}
                               onChange={SaveText}/>
                    {invalidJSON ?? <p>JSON is invalid</p>}
                </DialogContent>
                <DialogActions>
                    <CopyToClipboard text={itemsText} onCopy={() => setOpen(true)}>
                        <Button color="primary">Copy</Button>
                    </CopyToClipboard>
                    <Snackbar
                        open={open}
                        onClose={() => setOpen(false)}
                        autoHideDuration={2000}
                        message="Copied to clipboard"
                    />
                    <Button color="success" onClick={Save} >Save</Button>
                    <Button color="warning" onClick={Reset} >Reset</Button>
                    <Button color="secondary" onClick={Close}>Close</Button>
                </DialogActions>
            </Dialog>)
    }
    const Close = () => {
        setModal(<></>)
    }
    const SaveText = (event: any) => {
        try {
            console.log('save text')
            const items = JSON.parse(event.target.value)
            console.log('save items',items)
            setInvalidJSON(false);
            setItemsText(event.target.value)
            setItems(items)
            console.log('saved')
        } catch (error) {
            console.log('save failed')
            setInvalidJSON(true)
        }
    }
    const Save = () => {
        console.log('save',items)
        if (!invalidJSON) {
            Options.SetItems(items)
            console.log('saved')
        }
    }
    const Reset = () => {
        console.log('reset')
        setItemsText(text)
        Close()
        Open()
        setInvalidJSON(false)
    }

    return <>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button color="inherit" onClick={Open}>Transfer</Button>
            {modal}
        </Typography>
    </>
}

export default Transfer