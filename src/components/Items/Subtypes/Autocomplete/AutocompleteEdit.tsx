import React, {ChangeEvent, useEffect, useState} from 'react';
import {AutocompleteProps, AutocompleteSubtype, OptionSubtype} from "../../Items";
import SelectOption from "../../../SelectOption/SelectOption";
import {Checkbox, FormControlLabel, FormGroup, FormHelperText, FormLabel, Stack, TextField,} from "@mui/material";
import Options, {SelectedType} from "../../../Options/Options";

const AutocompleteEdit = ({item, options}: AutocompleteProps) => {
    const [searchableOption, setSearchableOption] = useState(item.searchableOptionsName)
    const [itemOptions, setItemOptions] = useState(item.options);

    const searchableOptions = Object.keys(options.searchableOptions ?? [] as string[])

    useEffect( ()=>{
        const optionsEqual = item.options.length == itemOptions.length
            && item.options.every(function(u, i) {
                return u === itemOptions[i];
            })

        if (item.searchableOptionsName !== searchableOption || !optionsEqual) {
            options.SetItem({...item, searchableOptionsName: searchableOption, options:(searchableOption === undefined ? [] : itemOptions)} as AutocompleteSubtype)
        }
    }, [item, searchableOption])

    useEffect(() => {
        options.SetItem({ ...item, options: itemOptions } as OptionSubtype)
    }, [itemOptions]);

    const handleAllowAnyInputChange = () => {
        item.allowAnyInput = !item.allowAnyInput;
        options.SetItem(item);
    }

    const onChangeEmptyValueOption = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item, emptyValueOption: value} as AutocompleteSubtype

        if (!value) {
            delete itm.value
        }

        options.SetItem(itm)
    }

    const onChangeNoOptionsFound = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value || undefined
        const itm = {...item, noOptionsFound: value} as AutocompleteSubtype

        if (!value) {
            delete itm.value
        }

        options.SetItem(itm)
    }

    return (
        <>
            <Stack spacing={2}>
                <FormGroup>
                    <FormControlLabel control={ <Checkbox  defaultChecked={item.allowAnyInput ?? false} onChange={handleAllowAnyInputChange}/> } label="Allow Any Input"/>
                    <FormHelperText sx = {{marginTop: -1}}>
                        Allow text that is not an autocomplete suggestion to be entered
                    </FormHelperText>
                </FormGroup>
                <FormGroup>
                    <TextField
                        size='small'
                        fullWidth={true}
                        label='Empty Value Message'
                        type="text"
                        defaultValue={item.emptyValueOption}
                        onChange={onChangeEmptyValueOption}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        size='small'
                        fullWidth={true}
                        label='No Options Found Message'
                        type="text"
                        defaultValue={item.noOptionsFound}
                        onChange={onChangeNoOptionsFound}
                    />
                </FormGroup>
                <SelectOption
                    id={item.id}
                    label="Autocomplete suggestions source"
                    option={searchableOption}
                    setOption={setSearchableOption}
                    options={searchableOptions}
                    none={"Use custom list"}
                /><br/>

                {item.searchableOptionsName == undefined ?
                    <>
                        <FormLabel id="control-options-group">
                            Custom AutoComplete List
                        </FormLabel>
                        <Options
                            options={item.options ?? []}
                            setOptions={setItemOptions}
                            selectedType={SelectedType.Single}
                        />
                    </>
                :""}
            </Stack>
        </>
    );
}

export default AutocompleteEdit;