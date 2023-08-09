import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Snackbar} from '@mui/material';
import React, {useState} from "react"
import {ActionProps} from "../Actions";
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';


const jsonSpacing = 2

const Transfer = ({Items, Options}: ActionProps) => {
    let text = JSON.stringify(Items, null, jsonSpacing)
    let items = Items
    const [itemsText, setItemsText] = useState(text)
    const [modal, setModal] = useState(<></>)
    const [open, setOpen] = useState(false)
    const [invalidJSON, setInvalidJSON] = useState(false)

    const Close = () => {
        setModal(<></>)
    }
    const SaveText = (event: any) => {
        try {
            items = JSON.parse(event.target.value)
            setInvalidJSON(false);
            setItemsText(event.target.value)
            text = event.target.value
        } catch (error) {
            setInvalidJSON(true)
        }
    }
    const Save = () => {
        if (!invalidJSON) {
            Options.setItems(items)
        }
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
                    {/*<TextField type="hidden" value={itemsText}/>*/}
                    <TextField id='transfer-text' fullWidth={true} variant="standard" multiline minRows={15} error={invalidJSON} defaultValue={itemsText}
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
                    <Button color="secondary" onClick={Close}>Close</Button>
                </DialogActions>
            </Dialog>)
    }

    return <>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button color="inherit" onClick={Open}>Transfer</Button>
            {modal}
        </Typography>
    </>
}

export default Transfer