import React, {ChangeEvent, useEffect, useState} from "react";
import {FieldItem, GroupItem, isGroup, isNamed, ListItem, ListProps, NumberSubtype} from "../Items";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, Stack, TextField} from "@mui/material";
import {ShowErrors} from "../Subtypes";
import DefaultItems from "../DefaultItems";
import {cloneDeep} from "lodash";
import SelectOption from "../../SelectOption/SelectOption";
const ItemListEdit = ({item, items, options, groupId, errorHandler}: ListProps) => {
    const [group,setGroup] = React.useState(isGroup(item.baseItem));
    const [color, setColor] = useState<string|undefined>(item?.addColor);

    useEffect(() => {
        const itm = {...item} as ListItem;
        if (group !== isGroup(item.baseItem)) {
            if (group) {
                itm.baseItem = cloneDeep(DefaultItems().Group.Item) as GroupItem;
            } else {
                itm.baseItem = cloneDeep(DefaultItems().Field.Item) as FieldItem;
            }
            const name = itm.baseItem.name
            let cnt = 1
            while (items.filter(i => isNamed(i) && i.name === itm.baseItem.name).length > 0) {
                itm.baseItem.name = name + '-' + (cnt++).toString()
            }
            itm.baseItem.id = (groupId ? groupId + '-' : '') + itm.baseItem.name
            options.SetItem(itm)
        }
    }, [group]);

    useEffect( ()=>{
        if (item.addColor !== color) {
            options.SetItem({...item, addColor: color ?? options.submitColors[0]} as ListItem)
        }
    }, [color])

    const handleGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGroup(event.target.checked);
    }
    const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (isNaN(val)) {
            errorHandler.setError('maxListSize', 'Max Value must be an integer!')
        }
        else if (val <= 0) {
            errorHandler.setError('maxListSize', 'Max Value must be greater than zero!')
        }
        else if (item.minListSize && (val < item.minListSize)) {
            errorHandler.setError('maxListSize', 'Max Value must not be less than Min Value!')
        }
        else {
            errorHandler.setError('maxListSize')

            const itm = { ...item, maxListSize: val };

            options.SetItem(itm);
        }
    };

    const handleChangeLabel = (event: ChangeEvent<HTMLInputElement>) => {
        const itm = { ...item }
        const { target: { value } } = event;
        itm.label = value
        if (!itm.label) {
            delete itm.label
        }

        options.SetItem(itm)
    }

    const handleChangeAddButton = (event: ChangeEvent<HTMLInputElement>) => {
        const itm = { ...item }
        const { target: { value } } = event;
        itm.addButton = value
        if (!itm.addButton) {
            delete itm.addButton
        }

        options.SetItem(itm)
    }

    const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(event.target.value);

        if (isNaN(val)) {
            errorHandler.setError('minListSize', 'Min Value must be an integer!')
        } else if (val < 0) {
            errorHandler.setError('minListSize', 'Min Value must be positive!')
        } else if (item.maxListSize && (val > item.maxListSize)) {
            errorHandler.setError('minListSize', 'Min Value must not be greater than Max Value!')
        } else {
            errorHandler.setError('minListSize')

            const itm = { ...item, min: val } as NumberSubtype;

            options.SetItem(itm);
        }
    };
    return <>
            <Stack spacing={.5}>
                <TextField
                    size="small"
                    label="Label"
                    type="text"
                    value={item.label}
                    onChange={handleChangeLabel}
                />
                <TextField
                    size="small"
                    label="Add Button Text"
                    type="text"
                    value={item.addButton}
                    onChange={handleChangeAddButton}
                />
                <SelectOption
                    id={item.id + '-color'}
                    label="Button Color"
                    option={color ?? options.submitColors[0]}
                    setOption={setColor}
                    options={options.submitColors}
                    none={'Use Listed Options'}/>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  checked={group} onChange={handleGroupChange}/> } label="Use Group"/>
                    <FormHelperText sx = {{marginTop: -1}}>
                        Select if you want a group list.
                    </FormHelperText>
                </FormGroup>
                <FormGroup>
                    <TextField
                        error={errorHandler.hasError('minListSize')}
                        id={`${item.id}-min-list-size`}
                        inputProps={{ min: 1, shrink: true }}
                        label="Min List Size"
                        onChange={handleMinValueChange}
                        size="small"
                        type="number"
                        defaultValue={item.minListSize}
                    />
                    <ShowErrors errors={errorHandler.getError('minListSize')} />
                </FormGroup>
                <FormGroup>
                    <TextField
                        error={errorHandler.hasError('maxListSize')}
                        id={`${item.id}-max-list-size`}
                        inputProps={{ min: 1, shrink: true }}
                        label="Max List Size"
                        onChange={handleMaxValueChange}
                        size="small"
                        type="number"
                        defaultValue={item.maxListSize}
                    />
                    <ShowErrors errors={errorHandler.getError('maxListSize')} />
                </FormGroup>
            </Stack>
        </>
};

export default ItemListEdit