import React from "react";
import {ItemProps, NamedItem} from "./Items";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditFC from "./EditFC";
const EditModal = (itemProps: ItemProps) => {
    const Close = () => {
        if(itemProps.options.setModal != null) {
            itemProps.options.setModal(<></>)
        }
    }
    console.log('md', itemProps.item.id)
    return <>
        <Dialog
            maxWidth="lg"
            fullWidth={true}
            open={true}
            onClose={Close}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <DialogTitle>Edit {(itemProps.item as NamedItem)?.name} {itemProps.item.type} ({itemProps.item.id}) </DialogTitle>
            <DialogContent>
                <EditFC {...itemProps}/>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={Close}>Close</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default EditModal