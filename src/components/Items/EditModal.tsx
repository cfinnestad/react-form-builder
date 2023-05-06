import React, {Dispatch, SetStateAction} from "react";
import {ItemProps, NamedItem} from "./Items";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

type EditModalProps = {
    setModal: Dispatch<SetStateAction<JSX.Element>>,
    ItemProps: ItemProps,
}
const EditModal = ({setModal, ItemProps}: EditModalProps) => {
    const Close = () => {
        setModal(<></>)
    }
    console.log('md', ItemProps.Item.id)
    return <>
        <Dialog
            maxWidth="lg"
            open={true}
            onClose={Close}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <DialogTitle>Edit {(ItemProps.Item as NamedItem)?.name} {ItemProps.Item.type} ({ItemProps.Item.id}) </DialogTitle>
            <DialogContent>
                { ItemProps.EditFC(ItemProps) }
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={Close}>Close</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default EditModal