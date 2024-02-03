import React, {ChangeEvent, useEffect, useState} from "react";
import {SubmitItem, SubmitProps} from "../Items";
import {TextField, Stack} from "@mui/material";
import SelectOption from "../../SelectOption/SelectOption";

const SubmitEdit = ({item, options}: SubmitProps) => {
    const [stateItem, setStateItem] = useState(item)
    const [submitElement, setSubmitElement] = useState(item.submitElementName)
    const submitElements = Object.keys(options.submitElements ?? {})
    const [color, setColor] = useState(item?.color)

    useEffect( ()=>{
        options.SetItem(stateItem)
    }, [stateItem])

    useEffect( ()=>{
        if (stateItem.submitElementName !== submitElement) {
            setStateItem({...stateItem, submitElementName: submitElement} as SubmitItem)
        }
    }, [submitElement])

    useEffect( ()=>{
        if (stateItem.color !== color) {
            setStateItem({...stateItem, color: color ?? options.submitColors[0]} as SubmitItem)
        }
    }, [color])

    const onChangeLabel = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...stateItem} as SubmitItem

        itm.label = val
        setStateItem(itm)

        if(itm.label === undefined) {
            delete itm.label
        }
    }

    return (<Stack spacing={.5}>
            <TextField sx={{marginTop: 2}} label="Label" defaultValue={stateItem.label} onChange={onChangeLabel}/><br/>

            <SelectOption
                id={item.id}
                label="submitElementName"
                option={submitElement}
                setOption={setSubmitElement}
                options={submitElements}
                none={'Use Listed Options'}/>

            <SelectOption
                id={item.id + '-color'}
                label="Color"
                option={color}
                setOption={setColor}
                options={options.submitColors}
                none={'Use Listed Options'}/>
        </Stack>
    );
}

export default SubmitEdit
