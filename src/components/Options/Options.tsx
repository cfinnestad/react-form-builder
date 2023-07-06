import React, {useEffect, useState} from 'react'
import {isAutocomplete, isCheckbox, isSelect, Option, OptionSubtype, Options as BuildOptions} from '../Items'
import {Button, ButtonGroup} from "@mui/material";
import {closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DragHandle, SortableItem} from '../SortableItem';
import OptionItem from "./OptionItem";
import SelectOption from "../SelectOption/SelectOption";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";

export enum SelectedType {
    None,
    Single,
    Multiple,
}
export type OptionsProps = {
    item: OptionSubtype,
    options: BuildOptions,
    selectedType?: SelectedType,
    useSearchableOptions?: boolean
}

export type OptionItemType = {
    id: string,
    option: Option
}

const Options = (props: OptionsProps) => {
    const [searchableOption, setSearchableOption] = useState(props.item.searchableOptionsName)
    const searchableOptions = Object.keys(props.options)
    const [item, setItem] = useState(props.item as OptionSubtype)
    const selectedType = props.selectedType ?? (
        isAutocomplete(item) ? SelectedType.None : (
            (isCheckbox(item) || (isSelect(item) && item.multiples)) ? SelectedType.Multiple : SelectedType.Single
        )
    )
    const [optionItems, setOptionItems] = useState(item.options.map((option, index) => { return {id: "o" + index.toString(), option: option} as OptionItemType}))
    const sensors = [
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    ]

    useEffect(()=>{
        props.options.SetItem(item)
    },[item])

    useEffect(()=>{
            const itm = {...item} as OptionSubtype
            itm.options = optionItems.map(optionItem => optionItem.option)
            console.log('options',itm.options)
            setItem(itm)
    }, [optionItems])

    useEffect(()=>{
        if (item.searchableOptionsName !== searchableOption) {
            const itm = {...item}
            itm.searchableOptionsName = searchableOption
            setItem(itm)
            if (searchableOption !== undefined) {
                itm.options = []
                setOptionItems(itm.options.map((option, index) => {
                    return {id: "o" + index.toString(), option: option}
                }))
            } else if (itm.options.length === 0) {
                itm.options = [{label: "Option 1"}, {label: "Option 2"}]
                setOptionItems(itm.options.map((option, index) => {
                    return {id: "o" + index.toString(), option: option}
                }))
            }
        }
    },[searchableOption])

    const addOption = () => {
        const num = optionItems.length + 1
        const opts = [...optionItems , {id: "o"+num.toString(), option:{label:"Option " + num.toString()} as Option}]
        setOptionItems(opts)
    }

    const deleteOption = (id: string) => {
        setOptionItems(optionItems.filter((optionItem) => optionItem.id !== id))
    }

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (!over) return;
        if (active.id !== over.id) {
            const from = optionItems.findIndex(x => x.id === active.id)
            const to = optionItems.findIndex(x => x.id === over.id)
            setOptionItems(arrayMove(optionItems, from, to));
        }
    }

    return <>
        { props.useSearchableOptions
            ? <SelectOption
                id={item.id+'searchable-option'}
                label="Searchable Option"
                option={searchableOption}
                setOption={setSearchableOption}
                options={searchableOptions}
                none={'Use Listed Options'}/>
            : <></>
        }
        <ButtonGroup>
            <Button onClick={addOption}>Add</Button>
        </ButtonGroup>
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={optionItems.map((x) => x.id)}
                strategy={verticalListSortingStrategy}
            >

                {optionItems.map((optionItem)=> <SortableItem key={optionItem.id} id={optionItem.id}>
                    <DragHandle>
                        <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                    </DragHandle>
                    <OptionItem options={optionItems} setOptions={setOptionItems} selectedType={selectedType} optionId={optionItem.id}/>
                    { item.options.length > 2 ? <Button onClick={() => deleteOption(optionItem.id)} sx={{display: "inline", color:'red'}}>X</Button> : '' }
                </SortableItem>)}
            </SortableContext>
        </DndContext>
    </>
}

export default Options