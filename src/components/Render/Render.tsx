import React, {Dispatch, SetStateAction, useEffect, useState, JSX} from 'react';
import {AnyItem, isField, isGroup, isHidden, Option} from "../Items";
import ShowItem from "../Items/ShowItem";
import { Options } from '../Builder'
import SetItem from "../Items/SetItem";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import DefaultSubtypes, {AllowedSubtypes} from "../Items/Subtypes/DefaultSubTypes";
import Filter from "../Filter/Filter";
import Errors, {ErrorType, GetError} from "../Errors/Errors";
import {ThemeProvider} from "@mui/material";
import {Theme, useTheme} from "@mui/material/styles";
import GetValue from "../Items/GetValue";

export type SubmitProps = {
    items: AnyItem[],
    options: Options,
    results: Array<Object> | Object
}

export type RenderProps = {
    Items: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options: RenderOptions,
    Submit: ( props: SubmitProps ) => JSX.Element
}

export type RenderOptions = {
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    returnType?: 'object' | 'flatobject' | 'array' | 'flatarray',
    Errors?: ErrorType,
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[]
    },
    muiTheme?: Theme,
    custom?: {[key:string]: any}
}

const Render = ({ Items, SetItems, Options, Submit}: RenderProps ) => {
    const [items, setItems] = useState<AnyItem[]>(Items || [])
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)

    const defaultTheme = useTheme()

    const options: Options = {...(Options || {}),
        AllowedSubtypes: {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})},
        AllowedItems: {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {})},
        IsBuild: false,
        SetItem: setItem,
        setItems: setItems,
        renderType: Options.returnType ?? 'array',
        getError: (error: string, item: AnyItem) => {
           return GetError(error, item, {...Errors(), ...(Options.Errors ?? {})})
        },
        muiTheme: Options.muiTheme ?? defaultTheme
    }

    const [submit, setSubmit] = useState(<Submit items={ items } options={options} results={RenderedItem(items, options.renderType)} ></Submit>)

    // const AllowedSubtypes: AllowedSubtypes = {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})}
    // const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {})}



    useEffect(() => {
        setSubmit(Submit({items: items, options: options, results: RenderedItem(items, options.renderType)} ) )
        if(SetItems) {
            SetItems(items)
        }
    }, [items])
    useEffect(()=>{
        setItems(SetItem(item, items))
    },[item])

    return <>
        <ThemeProvider theme={options.muiTheme}>
            { items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>) }
            {/*<Submit items={items} options={options} results={ RenderedItem(items, options.renderType) }></Submit>*/}
            { submit }
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

const RenderedItem = ( items: AnyItem[], returnType: RenderOptions['returnType'] ): Array<Object> | Object => {
    switch(returnType) {
        case 'object': return RenderedObject(items);
        case 'flatobject': return RenderedFlatObject(items);
        case 'flatarray': return RenderedFlatArray(items);
        default: return RenderedArray(items);
    }
}

export default Render
