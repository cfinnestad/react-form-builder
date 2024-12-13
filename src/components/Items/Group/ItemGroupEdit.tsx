import React, {ChangeEvent} from "react";
import {GroupItem, GroupProps} from "../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
const ItemGroupEdit = ({item, options}: GroupProps) => {
    const onChangeLabel = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...item} as GroupItem

        itm.label = val

        if(itm.label === undefined) {
            delete itm.label
        }
        if(options.custom?.parentItem) {
            options.SetItem({...options.custom?.parentItem, baseItem: itm})
        } else {
            options.SetItem(itm)
        }
    }

    const onChangeDeprecated = (event: ChangeEvent<HTMLInputElement>) => {
        const itm = { ...item }
        const { target: { checked } } = event;
        itm.deprecated = checked

        if(!itm.deprecated) {
            itm.deprecated = undefined
            delete itm.deprecated
        }

        if(options.custom?.parentItem) {
            options.SetItem({...options.custom?.parentItem, baseItem: itm})
        } else {
            options.SetItem(itm)
        }
    }
    const onChangeBackendOnly = (event: ChangeEvent<HTMLInputElement>) => {
        const itm = { ...item }
        const { target: { checked } } = event;
        itm.backend_only = checked

        if(!itm.backend_only) {
            itm.backend_only = undefined
            delete itm.backend_only
        }

        if(options.custom?.parentItem) {
            options.SetItem({...options.custom?.parentItem, baseItem: itm})
        } else {
            options.SetItem(itm)
        }
    }

    return <>
        <Stack spacing={.5}>
            <FormGroup>
                <FormControlLabel control={ <Checkbox  defaultChecked={item.deprecated ?? false} onChange={onChangeDeprecated}/> } label="Deprecated"/>
                <FormHelperText sx = {{marginTop: -1}}>
                    Deprecated groups will not be removed from the database. They will still show in the builder interface with a red outline.
                </FormHelperText>
            </FormGroup>

            <FormGroup>
                <FormControlLabel control={ <Checkbox  defaultChecked={item.backend_only ?? false} onChange={onChangeBackendOnly}/> } label="Backend Only"/>
                <FormHelperText sx = {{marginTop: -1}}>
                    Similar to Deprecated. Backend only group will not be shown in the form, but will still be available on the backend.
                </FormHelperText>
            </FormGroup>
            <TextField sx={{marginTop:2}} label="Label" defaultValue={item.label} onChange={onChangeLabel}/>
        </Stack>
    </>
};

export default ItemGroupEdit