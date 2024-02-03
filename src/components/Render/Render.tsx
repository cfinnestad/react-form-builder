import React, {Dispatch, SetStateAction, useEffect, useState, JSX} from 'react';
import {AnyItem, isField, isGroup, isHidden, Option, Options, AllowedItems, AllowedSubtypes} from "../Items";
import ShowItem from "../Items/ShowItem";
import DefaultItems from "../Items/DefaultItems";
import DefaultSubtypes from "../Items/Subtypes/DefaultSubTypes";
import Filter from "../Filter/Filter";
import Errors, {ErrorType, GetError} from "../Errors/Errors";
import {List, ListItem, Stack, ThemeProvider} from "@mui/material";
import {Theme, useTheme} from "@mui/material/styles";
import GetValue from "../Items/GetValue";
import {SubmitButtonProps} from "../Items";
import {cloneDeep} from "lodash";
import updateItemInItems from "../Items/UpdateItemInItems";

export type RenderProps = {
    Items: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options: RenderOptions,
}

export type RenderOptions = {
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    Errors?: ErrorType,
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[]
    },
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element
    }
    muiTheme?: Theme,
    custom?: {[key:string]: any},
    mode?: "build" | "edit" | "render",
    submitColors?: string[],
}

const Render = ({ Items, SetItems, Options }: RenderProps ) => {
    const [items, setItems] = useState<AnyItem[]>(Items ?? [])
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)

    const defaultTheme =  useTheme()
    const theme = Options.muiTheme ?? defaultTheme

    const getPalettes = (): string[] => {
        const palettes = []
        for (const [key, value] of Object.entries(theme.palette)) {
            if (value.hasOwnProperty('main')) {
                palettes.push(key);
            }
        }
        return palettes
    }

    //is build gets switched to mode
    const options: Options = {...(Options || {}),
        AllowedSubtypes: {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})},
        AllowedItems: {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {})},
        Mode: Options?.mode,
        SetItem: setItem,
        setItems: setItems,
        getError: (error: string, item: AnyItem) => {
           return GetError(error, item, {...Errors(), ...(Options.Errors ?? {})})
        },
        muiTheme: theme,
        submitColors: Options.submitColors ?? getPalettes(),
    }

    useEffect(() => {
        if(SetItems) {
            SetItems(items)
        }
    }, [items])
    useEffect(()=>{
        updateItemInItems(item, items)
        setItems(cloneDeep(items))
    },[item])


    return <>
        <ThemeProvider theme={options.muiTheme}>
            <Stack>
                <List dense sx={{padding: 0}}>
                    <ListItem sx={{display: 'block', padding: '0px'}}>
                        { items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>) }
                    </ListItem>
                </List>
            </Stack>
        </ThemeProvider>
    </>
}

export const RenderedObject = ( items: AnyItem[] ): {} => {
    let result: Record<string, any> = {}

    for (const item of items) {

        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result[item.name] = RenderedObject(item.items)
            } else if (isHidden(item)) {
                result[item.name] = item.value
            } else if (isField(item)) {
                result[item.name] = GetValue(item)
            }
        }
    }

    return result
}

export const RenderedFlatObject = ( items: AnyItem[]): {} => {
    let result: Record<string, any> = {}

    for (const item of items) {
        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result = {...result, ...RenderedFlatObject(item.items)}
            } else if (isHidden(item)) {
                result[item.id] = item.value
            } else if (isField(item)) {
                result[item.id] = GetValue(item)
            }
        }
    }

    return result
}

export const RenderedArray = ( items: AnyItem[]): {} | [] => {
    let result = []

    for (const item of items) {

        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result.push({
                    name: item.name,
                    value: RenderedArray(item.items)
                })
            } else if (isHidden(item)) {
                result.push({
                    name: item.name,
                    value: item.value
                })
            } else if (isField(item)) {
                result.push({
                    name: item.name,
                    value: GetValue(item)
                })
            }
        }
    }

    return result
}

export const RenderedFlatArray = ( items: AnyItem[]): object[] => {
    let result: object[] = []

    for (const item of items) {

        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result = [...result, ...RenderedFlatArray(item.items)]
            } else if (isHidden(item)) {
                result.push({
                    name: item.id,
                    value: item.value
                })
            } else if (isField(item)) {
                result.push({
                    name: item.id,
                    value: GetValue(item)
                })
            }
        }
    }

    return result
}

export default Render
