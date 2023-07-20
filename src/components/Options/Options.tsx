import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Option} from '../Items'
import {Button, ButtonGroup, Checkbox} from "@mui/material";
import {closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DragHandle, SortableItem} from '../SortableItem';
import OptionItem from "./OptionItem";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import {v4} from 'uuid'

export enum SelectedType {
    None,
    Single,
    Multiple,
}
export type OptionsProps = {
    options: Option[],
    setOptions: Dispatch<SetStateAction<Option[]>>,
    selectedType: SelectedType,
}
export type OptionItemType = {
    id: string,
    option: Option,
}

const Options = ({options,setOptions,selectedType}: OptionsProps) => {
    const [itemOptions, setItemOptions] = useState(options.map(option => {
        return {
            id: v4(),
            option: {...option, selected: option.selected ?? false} as Option
        } as OptionItemType
    }))
    const sensors = [
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    ]

    useEffect(()=>{
        const opts = itemOptions.map(itemOption => {
            const opt = {...itemOption.option} as Option
            if (!opt.selected) {
                delete opt.selected
            }
            return opt
        })
        console.log('opts', opts)
        if (JSON.stringify(opts) !== JSON.stringify(options)) {
            setOptions(opts)
        }
    }, [itemOptions])

    useEffect(()=>{
        setItemOptions(options.map((option,index) => {
            return {
                ...itemOptions[index]??{id: v4()},
                option: {...option, selected: option.selected ?? false} as Option
            } as OptionItemType
        }))
    },[options])

    const addOption = () => {
        let num = itemOptions.length
        let label = ""
        do {
            num++
            label = "Option " + num.toString()
        } while (itemOptions.filter(itemOption => itemOption.option.label === label).length > 0)
        setItemOptions([...itemOptions, {id: v4(), option:{label: label, selected: false}}] )
    }

    const deleteOption = (id: string) => {
        const opts = itemOptions.filter(opt => opt.id !== id)
        console.log('opts')
        setItemOptions(opts)
    }

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
        const itmOptions = [...itemOptions]
        if (!over) return;
        if (active.id !== over.id) {
            const from = itemOptions.findIndex(itemOption => itemOption.id === active.id)
            const to = itemOptions.findIndex(itemOption => itemOption.id === over.id)
            console.log('from: ', from)
            console.log('to: ', to)
            setItemOptions(arrayMove(itmOptions, from, to));
        }
    }

    const onChangeSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const optionId = event.target.value
        console.log('optionId: ', optionId)
        if (selectedType === SelectedType.None) {
            return;
        }
        const newOptions = itemOptions.map((optionItem) => {
            const opt = {...optionItem.option} as Option
            if (selectedType === SelectedType.Single && optionItem.id !== optionId) {
                console.log('Unselecting: ', optionItem)
                opt.selected = false
            } else if (optionItem.id === optionId){
                opt.selected = !opt.selected
            }
            return {...optionItem, option:opt} as OptionItemType
        })
        console.log('newOptions: ',newOptions)
        setItemOptions(newOptions)
    }

    return <>
        <ButtonGroup>
            <Button onClick={addOption}>Add</Button>
        </ButtonGroup>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={itemOptions.map((optionItem) => optionItem.id)}
                strategy={verticalListSortingStrategy}
            >

                {itemOptions.map((optionItem)=> <SortableItem key={optionItem.id} id={optionItem.id}>
                    <DragHandle>
                        <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                    </DragHandle>
                    { selectedType !== SelectedType.None
                        ? <Checkbox
                            checked={optionItem.option.selected}
                            onChange={onChangeSelected}
                            value={optionItem.id}
                            sx={{display: "inline"}}
                          />
                        : ''
                    }
                    <OptionItem options={itemOptions} setOptions={setItemOptions} optionId={optionItem.id}/>
                    { itemOptions.length > 2 ? <Button onClick={() => deleteOption(optionItem.id)} sx={{display: "inline", color:'red'}}>X</Button> : '' }
                </SortableItem>)}
            </SortableContext>
        </DndContext>
    </>
}

export default Options