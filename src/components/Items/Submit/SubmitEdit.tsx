import React, {ChangeEvent, useEffect, useState} from "react";
import {SubmitItem, SubmitProps} from "../Items";
import {TextField, Stack} from "@mui/material";
import SelectOption from "../../SelectOption/SelectOption";

const SubmitEdit = ({item, options}: SubmitProps) => {
    const [stateItem, setStateItem] = useState(item)
    const [submitElement, setSubmitElement] = useState(item.submitElementName)
    const submitElements = Object.keys(options.submitElements ?? {})

    useEffect( ()=>{
        options.SetItem(stateItem)

        if (stateItem.submitElementName !== submitElement) {
            options.SetItem({...stateItem, submitElementName: submitElement} as SubmitItem)
        }
    }, [stateItem, submitElement])

    const onChangeLabel = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...stateItem} as SubmitItem

        itm.label = val
        setStateItem(itm)

        if(itm.label === undefined) {
            delete itm.label
        }
    }

    return (
        <>
            <Stack spacing={.5}>
                <TextField sx={{marginTop:2}} label="Label" defaultValue={stateItem.label} onChange={onChangeLabel}/><br/>

                <SelectOption
                    id={item.id}
                    label="submitElementName"
                    option={submitElement}
                    setOption={setSubmitElement}
                    options={submitElements}
                    none={'Use Listed Options'}/>
            </Stack>
        </>
    );
}

export default SubmitEdit
