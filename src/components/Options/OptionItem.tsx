import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Option} from "../Items";
import {Checkbox, Grid, TextField} from "@mui/material";
import {OptionItemType, SelectedType} from "./Options";

type OptionItemProps = {
    options: OptionItemType[]
    setOptions: Dispatch<SetStateAction<OptionItemType[]>>
    optionId: string
    selectedType: SelectedType
}

const OptionItem = ({options, setOptions, optionId, selectedType}:OptionItemProps) => {
    const [labelError, setLabelError] = useState<string|undefined>(undefined)
    const optionIndex = options.findIndex(x => x.id === optionId)
    const [option, setOption] = useState(options[optionIndex].option)

    useEffect(()=>{
        if (options[optionIndex].option !== option) {
            const opts = [...options] as OptionItemType[]
            opts[optionIndex].option = option
            setOptions(opts)
        }
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
        if (options.filter(o => (o.id !== optionId) && (o.option.label === value)).length > 0) {
            setLabelError('Label must be unique')
            return
        }
        const opt = {...options[optionIndex].option} as Option
        opt.label = value
        setOption(opt)
    }

    const onClickSelected = () => {
        const opts = options.map((optionItem) => {return {...optionItem} as OptionItemType})
        if (selectedType === SelectedType.None) {
            return;
        }
        const newOptions = opts.map((optionItem) => {
            const opt = {...optionItem.option} as Option
            if (selectedType === SelectedType.Single && optionItem.id !== optionId) {
                delete opt.selected
            } else if (optionItem.id === optionId){
                opt.selected = !opt.selected
                if (!opt.selected) {
                    delete opt.selected
                }
            }
            return {...optionItem, option: opt}
        })
        setOptions(newOptions)
    }
    return <>
        { selectedType !== SelectedType.None
            ? <Checkbox defaultChecked={option.selected} onClick={onClickSelected} sx={{display: "inline"}}/>
            : ''
        }
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
                    value={option.label}
                    onChange={onChangeLabel}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    size='small'
                    fullWidth={true}
                    label='Value'
                    type="text"
                    value={option.value}
                    onChange={onChangeValue}
                />
            </Grid>
        </Grid>
    </>

}

export default OptionItem