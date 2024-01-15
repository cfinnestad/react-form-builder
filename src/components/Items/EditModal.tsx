import React, {useState} from "react";
import {ItemProps, NamedItem} from "./Items";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip} from "@mui/material";
import EditFC from "./EditFC";

type EditModalProps = ItemProps & {showModal: boolean}
const EditModal = (itemProps: EditModalProps) => {

    const [item, setItem] = useState(itemProps.item)

    const Cancel = () => {
        if(itemProps.options.setModal != null) {
            itemProps.options.setModal(false)
            itemProps.errorHandler.clearAllErrors()
        }
    }

    const Save = () => {
        if (!itemProps.errorHandler.hasAnyErrors()) {
            itemProps.options.SetItem({...item})

            if(itemProps.options.setModal != null) {
                itemProps.options.setModal(false)
                itemProps.errorHandler.clearAllErrors()
            }
        }
    }

        return <>
            <Dialog
                maxWidth="lg"
                fullWidth={true}
                open={itemProps.showModal}
                onClose={Cancel}
                aria-labelledby="example-modal-sizes-title-lg"
                disableEnforceFocus={true}
            >
                <DialogTitle>Edit {(item as NamedItem)?.name} {item.type}</DialogTitle>
                <DialogContent>
                    <EditFC
                        item={item}
                        items={itemProps.items}
                        options={{...itemProps.options, SetItem: setItem}}
                        errorHandler={itemProps.errorHandler} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={Cancel}>Cancel</Button>
                    <Tooltip title={itemProps.errorHandler.hasAnyErrors() ? 'Please correct form errors' : ''}>
                        <span>
                            <Button
                                color="primary"
                                onClick={Save}
                                disabled={itemProps.errorHandler.hasAnyErrors()}
                            >
                                Save
                            </Button>
                        </span>
                    </Tooltip>

                </DialogActions>
            </Dialog>
        </>


}

export default EditModal