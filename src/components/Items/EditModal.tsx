import React, {useEffect, useState} from "react";
import {isGroup, isList, ItemProps, NamedItem} from "./Items";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip} from "@mui/material";
import EditFC from "./EditFC";

type EditModalProps = ItemProps & {
    showModal: boolean,
    inList: boolean
}
const EditModal = (itemProps: EditModalProps) => {

    const [item, setItem] = useState({...itemProps.item})

    useEffect(() => {
        // console.log('*****************************************')
        // console.log('modal SetItem', item)
    }, [item])

    const Cancel = () => {
        if(itemProps.options.setModal != null) {
            itemProps.options.setModal(undefined)
            itemProps.errorHandler.clearAllErrors()
        }
    }

    const Save = () => {
        if (!itemProps.errorHandler.hasAnyErrors()) {
            itemProps.options.SetItem({...item})
            if(isList(item) && isGroup(item.baseItem) && itemProps.setActiveItem) {
                itemProps.setActiveItem({id: item.baseItem.items[0]?.id, groupId: item.baseItem.id})
            }

            if (itemProps.options.setModal) {
                itemProps.options.setModal(undefined)
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
                        options={{...itemProps.options, SetItem: setItem, custom:{...itemProps.options.custom, inList: itemProps.inList}}}
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