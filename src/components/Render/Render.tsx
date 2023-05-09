import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {AnyItem, isField, isGroup, isHidden, isHtml} from "../Items/Items";
import ShowItem from "../Items/ShowItem";
import { Options } from '../Builder/Builder'
import SetItem from "../Items/SetItem";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import DefaultSubtypes, {AllowedSubtypes} from "../Items/Subtypes/DefaultSubTypes";

export type RenderProps = {
    Items: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options: RenderOptions,
    Submit: ( { Items } : { Items: [] | {} } ) => JSX.Element
}

type RenderOptions = {
    AllowedItems?: AllowedItems,
    AdditionalItems?: AllowedItems,
    AllowedSubtypes?: AllowedSubtypes,
    AdditionalSubtypes?: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    returnType?: 'object' | 'flatobject' | 'array' | 'flatarray'
}

const Render = ({ Items, SetItems, Options, Submit}: RenderProps ) => {
    const [items, setItems] = useState<AnyItem[]>(Items || [])
    const [item, setItem] = useState({id:'x', type:'test'} as AnyItem)
    const [submit, setSubmit] = useState(<Submit Items={ RenderedItem(items, 'array') } ></Submit>)

    const AllowedSubtypes: AllowedSubtypes = {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})}
    const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems(AllowedSubtypes)), ...(Options?.AdditionalItems || {})}

    const options: Options = {...(Options || {}),
        AllowedSubtypes: AllowedSubtypes,
        AllowedItems: AllowedItems,
        IsBuild: false,
        SetItem: setItem,
        setItems: setItems,
        renderType: Options.returnType ?? 'array'

    }

    useEffect(() => {
        console.log('Items Changes:', items)
        setSubmit(Submit({Items: RenderedItem(items, Options.returnType)} ) )
        if(SetItems) {
            SetItems(items)
        }
    }, [JSON.stringify(items)])
    useEffect(()=>{
        setItems(SetItem(item, items))
    },[item])

    return <>
        { items.map((item) => <ShowItem key={item.id} item={item} items={items} options={options}/>) }
        {/*<Submit Items={ RenderedItem(items) } ></Submit>*/}
        { submit }
    </>
}

const RenderedObject = ( Items: AnyItem[] ): {} => {
    let result: Record<string, any> = {}

    for (const item of Items) {

        if(isGroup(item)) {
            result[item.name] = RenderedObject(item.items)
        } else if(isHidden(item)) {
            result[item.name] = item.value
        } else if(isField(item)) {
            result[item.name] = item.subtype.value
        }
    }

    return result

}

const RenderedFlatObject = ( Items: AnyItem[], GroupName = '' ): {} => {
    let result: Record<string, any> = {}

    for (const item of Items) {

        if(isGroup(item)) {
            result = {...result, ...RenderedFlatObject(item.items, item.name + '_')}
        } else if(isHidden(item)) {
            result[GroupName + item.name] = item.value
        } else if(isField(item)) {
            result[GroupName + item.name] = item.subtype.value
        }
    }

    return result

}

const RenderedArray = ( Items: AnyItem[]): {} | [] => {
    let result = []

    for (const item of Items) {

        if(isGroup(item)) {
            result.push({
                name: item.name,
                value: RenderedArray(item.items)
            })
        } else if(isHidden(item)) {
            result.push({
                name: item.name,
                value: item.value
            })
        } else if(isField(item)) {
            result.push({
                name: item.name,
                value: item.subtype.value
            })
        }
    }

    return result

}

const RenderedFlatArray = ( Items: AnyItem[], GroupName = '' ): object[] => {
    let result: object[] = []

    for (const item of Items) {

        if(isGroup(item)) {
            result = [...result, ...RenderedFlatArray(item.items, item.name + '_')]
        } else if(isHidden(item)) {
            result.push({
                name: GroupName + item.name,
                value: item.value
            })
        } else if(isField(item)) {
            result.push({
                name: GroupName + item.name,
                value: item.subtype.value
            })
        }

    }

    return result

}

const RenderedItem = ( Items: AnyItem[], returnType: RenderOptions['returnType'] ): {} | [] => {

    switch(returnType) {
        case 'object': return RenderedObject(Items);
        case 'flatobject': return RenderedFlatObject(Items);
        case 'flatarray': return RenderedFlatArray(Items);
        default: return RenderedArray(Items);
    }

}

export default Render
