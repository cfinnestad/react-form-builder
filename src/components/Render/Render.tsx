import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AnyItem, isField, isGroup, isHidden} from "../Items/Items";
import ShowItem from "../Items/ShowItem";
import { Options } from '../Builder/Builder'
import SetItem from "../Items/SetItem";
import DefaultItems, {AllowedItems} from "../Items/DefaultItems";
import DefaultSubtypes, {AllowedSubtypes} from "../Items/Subtypes/DefaultSubTypes";
import Filter from "../Filter/Filter";

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

    // const AllowedSubtypes: AllowedSubtypes = {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})}
    // const AllowedItems: AllowedItems = {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {})}

    const options: Options = {...(Options || {}),
        AllowedSubtypes: {...(Options?.AllowedSubtypes || DefaultSubtypes()), ...(Options?.AdditionalSubtypes || {})},
        AllowedItems: {...(Options?.AllowedItems || DefaultItems()), ...(Options?.AdditionalItems || {})},
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

const RenderedObject = ( items: AnyItem[] ): {} => {
    let result: Record<string, any> = {}

    for (const item of items) {

        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result[item.name] = RenderedObject(item.items)
            } else if (isHidden(item)) {
                result[item.name] = item.value
            } else if (isField(item)) {
                result[item.name] = item.value
            }
        }
    }

    return result

}

const RenderedFlatObject = ( items: AnyItem[], GroupName = '' ): {} => {
    let result: Record<string, any> = {}

    for (const item of items) {
        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result = {...result, ...RenderedFlatObject(item.items, item.name + '_')}
            } else if (isHidden(item)) {
                result[GroupName + item.name] = item.value
            } else if (isField(item)) {
                result[GroupName + item.name] = item.value
            }
        }
    }

    return result

}

const RenderedArray = ( items: AnyItem[]): {} | [] => {
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
                    value: item.value
                })
            }
        }
    }

    return result

}

const RenderedFlatArray = ( items: AnyItem[], GroupName = '' ): object[] => {
    let result: object[] = []

    for (const item of items) {

        if(Filter(item, items, item.filter)) {
            if (isGroup(item)) {
                result = [...result, ...RenderedFlatArray(item.items, item.name + '_')]
            } else if (isHidden(item)) {
                result.push({
                    name: GroupName + item.name,
                    value: item.value
                })
            } else if (isField(item)) {
                result.push({
                    name: GroupName + item.name,
                    value: item.value
                })
            }
        }

    }

    return result

}

const RenderedItem = ( items: AnyItem[], returnType: RenderOptions['returnType'] ): {} | [] => {

    switch(returnType) {
        case 'object': return RenderedObject(items);
        case 'flatobject': return RenderedFlatObject(items);
        case 'flatarray': return RenderedFlatArray(items);
        default: return RenderedArray(items);
    }

}

export default Render
