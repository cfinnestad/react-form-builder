import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Option} from "../Items";
import {Grid, TextField} from "@mui/material";
import {OptionItemType} from "./Options";

type OptionItemProps = {
    options: OptionItemType[]
    setOptions: Dispatch<SetStateAction<OptionItemType[]>>
    optionId: string
}

const OptionItem = ({options, setOptions, optionId}:OptionItemProps) => {
    const [labelError, setLabelError] = useState<string|undefined>(undefined)
    const optionIndex = options.findIndex(optionItem => optionItem.id === optionId)
    const [option, setOption] = useState(options[optionIndex].option)

    useEffect(()=>{
            const opts = [...options] as OptionItemType[]
            opts[optionIndex] = {id: optionId, option:option}
            setOptions(opts)
    }, [option])

    const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        const opt = {...options[optionIndex].option} as Option
        if (value === '' || value === undefined) {
            delete opt.value
        } else {
            opt.value = value
        }
        setOption(opt)
    }

    const onChangeLabel = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        if (value === '' || value === undefined) {
            setLabelError('Label is required')
            return
        }
        if (options.filter(({id, option}) => (id !== optionId) && (option.label === value)).length > 0) {
            setLabelError('Label must be unique')
            return
        }
        const opt = {...options[optionIndex].option} as Option
        opt.label = value
        setOption(opt)
    }
    return <>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    required = {true}
                    size='small'
                    fullWidth={true}
                    label='Label'
                    type="text"
                    error={labelError !== undefined}
                    helperText={labelError}
                    defaultValue={option.label}
                    onChange={onChangeLabel}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    size='small'
                    fullWidth={true}
                    label='Value'
                    type="text"
                    defaultValue={option.value}
                    onChange={onChangeValue}
                />
            </Grid>
        </Grid>
    </>

}

export default OptionItem