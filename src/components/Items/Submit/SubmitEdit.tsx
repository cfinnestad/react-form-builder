import React, {ChangeEvent, useEffect, useState} from "react";
import {isSubmit, ItemProps, SubmitItem} from "../Items";
import {TextField, InputLabel, Stack} from "@mui/material";

const SubmitEdit = ({item, options}: ItemProps) => {
    if (!isSubmit(item)) return <></>

    const [stateItem, setStateItem] = useState(item)

    useEffect( ()=>{
        options.SetItem(stateItem)
    }, [stateItem])

    const onChangeLabel = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...stateItem} as SubmitItem

        itm.label = val
        setStateItem(itm)

        if(itm.label === undefined) {
            delete itm.label
        }
    }

    const onChangeSubmitElementName = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...stateItem} as SubmitItem

        itm.submitElementName = val
        setStateItem(itm)

        if(itm.submitElementName === undefined) {
            delete itm.submitElementName
        }
    }

    return (
        <>
            <Stack spacing={.5}>
                <InputLabel>Label</InputLabel>
                <TextField defaultValue={stateItem.label} onChange={onChangeLabel}/><br/>

                <InputLabel>submitElementName</InputLabel>
                <TextField defaultValue={stateItem.submitElementName} onChange={onChangeSubmitElementName}/>
            </Stack>
        </>
    );
}

export default SubmitEdit
