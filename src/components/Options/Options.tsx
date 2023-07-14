import React, {useEffect, useState} from 'react'
import {Option, OptionSubtype, Options as BuildOptions, MultiplesSubtype, isMultiples} from '../Items'
import {Button, ButtonGroup, Checkbox, FormControl, FormControlLabel} from "@mui/material";
import {closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DragHandle, SortableItem} from '../SortableItem';
import OptionItem from "./OptionItem";
import SelectOption from "../SelectOption/SelectOption";
import FormatLineSpacingRoundedIcon from "@mui/icons-material/FormatLineSpacingRounded";
import {uuid} from "uuidv4";

export enum SelectedType {
    None,
    Single,
    Multiple,
}
export type OptionsProps = {
    item: OptionSubtype,
    options: BuildOptions,
    selectedType?: SelectedType,
    useSearchableOptions?: boolean,
    useMultiples?: boolean,
}
export type OptionItemType = {
    id: string,
    option: Option,
}

const Options = ({item,options,selectedType,useSearchableOptions,useMultiples}: OptionsProps) => {
    const [searchableOptionsName, setSearchableOptionsName] = useState(item.searchableOptionsName)
    const searchableOptions = Object.keys(options.searchableOptions ?? [] as string[])
    const [type, setType] = useState(selectedType)
    const [multiples, setMultiples] = useState( isMultiples(item) ? (item.multiples ?? false) : false )
    const [itemOptions, setItemOptions] = useState(item.options.map(option => {
        return {
            id: uuid(),
            option: {...option, selected: option.selected ?? false} as Option
        } as OptionItemType
    }))
    const sensors = [
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    ]

    useEffect(()=>{
        if (useMultiples) {
            const itm = {...item} as MultiplesSubtype
            itm.multiples = multiples
            setType(multiples ? SelectedType.Multiple : SelectedType.Single)
            options.SetItem(itm)
            if(!multiples) {
                let firstSet = false
                const opts = itemOptions.map(optionItem => {
                    const opt = {...optionItem, option: {...optionItem.option}} as OptionItemType
                    if (!firstSet && optionItem.option.selected) {
                        firstSet = true
                    } else {
                        opt.option.selected = false
                    }
                    return opt
                })
                setItemOptions(opts)
            }
        }
    }, [multiples])

    useEffect(()=>{
            const itm = {...item} as OptionSubtype
            itm.options = itemOptions.map(itemOption => {
                const opt = {...itemOption.option} as Option
                if (!opt.selected) {
                    delete opt.selected
                }
                return opt
            })
            console.log('options',itm.options)
            options.SetItem(itm)
    }, [itemOptions])

    useEffect(()=>{
        if (item.searchableOptionsName !== searchableOptionsName) {
            const itm = {...item, searchableOptionsName: searchableOptionsName}
            if (searchableOptionsName !== undefined) {
                itm.options = []
                setItemOptions([])
            } else if (itemOptions.length === 0) {
                itm.options = [{label: "Option 1"}, {label: "Option 2"}] as Option[]
                setItemOptions(itm.options.map((option) => {
                    const opt = {...option} as Option
                    opt.selected = opt.selected ?? false
                    return {id: uuid(), option: opt} as OptionItemType
                }))
            }

            options.SetItem(itm)
        }
    },[searchableOptionsName])

    const addOption = () => {
        let num = itemOptions.length
        let label = ""
        do {
            num++
            label = "Option " + num.toString()
        } while (itemOptions.filter(itemOption => itemOption.option.label === label).length > 0)
        setItemOptions([...itemOptions, {id: uuid(), option:{label: label, selected: false}}] )
    }

    const deleteOption = (id: string) => {
        const opts = [...itemOptions]
        const index = opts.findIndex(opt => opt.id === id)
        delete opts[index]
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

    const onClickMultiples = () => {
        setMultiples(!multiples)
    }

    const onChangeSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const optionId = event.target.value
        console.log('optionId: ', optionId)
        if (type === SelectedType.None) {
            return;
        }
        const newOptions = itemOptions.map((optionItem) => {
            const opt = {...optionItem.option} as Option
            if (type === SelectedType.Single && optionItem.id !== optionId) {
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
        { useSearchableOptions
            ? <SelectOption
                id={item.id+'searchable-option'}
                label="Searchable Option"
                option={searchableOptionsName}
                setOption={setSearchableOptionsName}
                options={searchableOptions}
                none={'Use Listed Options'}/>
            : <></>
        }
        { useMultiples
            ? <div><FormControl>
                <FormControlLabel control={<Checkbox checked={multiples} onClick={onClickMultiples}/>} label="Multiples"/>
            </FormControl><br/></div>
            : ''
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
                items={itemOptions.map((optionItem) => optionItem.id)}
                strategy={verticalListSortingStrategy}
            >

                {itemOptions.map((optionItem)=> <SortableItem key={optionItem.id} id={optionItem.id}>
                    <DragHandle>
                        <FormatLineSpacingRoundedIcon sx={{ fontSize: 'large', verticalAlign:'center', m: 1 }} />
                    </DragHandle>
                    { type !== SelectedType.None
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