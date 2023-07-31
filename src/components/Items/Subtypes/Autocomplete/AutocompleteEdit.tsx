import React, {ChangeEvent, useEffect, useState} from 'react';
import {AutocompleteProps, AutocompleteSubtype, CheckboxSubtype, OptionSubtype, SubmitItem} from "../../Items";
import SelectOption from "../../../SelectOption/SelectOption";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import Options, {SelectedType} from "../../../Options/Options";

const AutocompleteEdit = ({item, options}: AutocompleteProps) => {
    const [stateItem, setStateItem] = useState(item)
    const [searchableOption, setSearchableOption] = useState(item.searchableOptionsName)
    const [itemOptions, setItemOptions] = useState(item.options);

    // Handles layout state for the edit modal
    const [value, setValue] = useState(item.useQuery ? 'query' : 'custom');
    // Handles source state for the builder
    const [source, setSource] = useState(item.useQuery || false);

    const searchableOptions = Object.keys(options.searchableOptions ?? [] as string[])

    useEffect( ()=>{
        options.SetItem(stateItem)

        if (stateItem.searchableOptionsName !== searchableOption) {
            options.SetItem({...stateItem, searchableOptionsName: searchableOption} as AutocompleteSubtype)
        }
    }, [stateItem, searchableOption])

    useEffect(() => {
        options.SetItem({ ...item, options: itemOptions } as OptionSubtype)
    }, [itemOptions]);

    useEffect(() => {
        const autocomplete = { ...item } as AutocompleteSubtype;
        if (source)
            autocomplete.useQuery = true;
        else
            delete autocomplete.useQuery;

        options.SetItem(autocomplete);
    }, [source]);

    const onChangeLabel = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = event.target.value || undefined
        const itm = {...stateItem} as AutocompleteSubtype

        itm.label = val
        setStateItem(itm)

        if(itm.label === undefined) {
            delete itm.label
        }
    }

    const sourceClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the modal so the user has a good experience when choosing the default source option
        setValue((event.target as HTMLInputElement).value);
        // Update the builder to reflect the user's choice for source option
        setSource(!source);
    }

    return (
        <>
            <Stack spacing={.5}>
                <TextField sx={{marginTop:2}} label="Label" defaultValue={stateItem.label} onChange={onChangeLabel}/><br/>


                <FormControl>
                    <FormLabel id="control-layout-radio-buttons-group">Autocomplete dropdown source</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="control-layout-radio-buttons-group"
                        name="layout-radio-buttons-group"
                        value={value}
                        onChange={sourceClickHandler}
                    >
                        <FormControlLabel
                            control={<Radio />}
                            value="query"
                            label="Query"
                        />
                        <FormControlLabel
                            control={<Radio />}
                            value="custom"
                            label="Custom List"
                        />
                    </RadioGroup>
                </FormControl>

                {/*{(() => {*/}
                {/*    if(item.useQuery) {*/}
                {/*        return (*/}
                {/*            <SelectOption*/}
                {/*                id={item.id}*/}
                {/*                label="searchableOptions"*/}
                {/*                option={searchableOption}*/}
                {/*                setOption={setSearchableOption}*/}
                {/*                options={searchableOptions}*/}
                {/*                none={"Use listed options"}/>*/}
                {/*        )*/}
                {/*    } else {*/}
                {/*        return (*/}
                {/*            <>*/}
                {/*                <FormLabel id="control-options-group">Choices</FormLabel>*/}
                {/*                <Options*/}
                {/*                    options={itemOptions}*/}
                {/*                    setOptions={setItemOptions}/>*/}
                {/*            </>*/}
                {/*        )}*/}
                {/*    })*/}
                {/*}*/}


                {
                    item.useQuery ? (
                        <SelectOption
                            id={item.id}
                            label="searchableOptions"
                            option={searchableOption}
                            setOption={setSearchableOption}
                            options={searchableOptions}
                            none={"Use listed options"}
                        />
                    ):(
                        <>
                            <FormLabel id="control-options-group">
                                Choices
                            </FormLabel>

                            <Options
                                options={itemOptions}
                                setOptions={setItemOptions}
                            />
                        </>
                    )
                }


            </Stack>
        </>
    );
}

export default AutocompleteEdit;