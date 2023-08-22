import React from "react";
import {ItemProps, NamedItem} from "./Items";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditFC from "./EditFC";

type EditModalProps = ItemProps & {showModal: boolean}
const EditModal = (itemProps: EditModalProps) => {

    const Close = () => {
        if(itemProps.options.setModal != null) {
            itemProps.options.setModal(false)
            itemProps.errorHandler.clearAllErrors() // we will be preventing save with errors, so clear them here
        }
    }
    // console.log('md', itemProps.item.id)

    if(itemProps.showModal) {
        return <>
            <Dialog
                maxWidth="lg"
                fullWidth={true}
                open={true}
                onClose={Close}
                aria-labelledby="example-modal-sizes-title-lg"
                disableEnforceFocus={true}
            >
                <DialogTitle>Edit {(itemProps.item as NamedItem)?.name} {itemProps.item.type} ({itemProps.item.id}) </DialogTitle>
                <DialogContent>
                    <EditFC
                        item={itemProps.item}
                        items={itemProps.items}
                        options={itemProps.options}
                        errorHandler={itemProps.errorHandler} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Close}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    } else {
        return <></>
    }

}

export default EditModal