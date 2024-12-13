import React, {Dispatch,SetStateAction} from "react";
import {AnyItem, isField, isGroup, isOption,} from "../Items";
import {RenderOptions} from "../Render";
import {Render} from "../index";
import {isString} from "lodash";

export type EditorProps = {
    Data: {[key:string]: any},
    Items: AnyItem[],
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>,
    Options: RenderOptions,
}

const Editor = ({ Data, Items, SetItems, Options } : EditorProps) => {
    return <Render Items={setDefaults(Items, Data)} Options={{...Options, mode:"edit"}} SetItems={SetItems}/>
}

export const setDefaults = (items: AnyItem[], data: object): AnyItem[] => {
    // console.log("editor data: ", data);

    items.map(item => {

        if(isField(item)){
            const id = item.id;
            // @ts-ignore
            let value = data[id] ?? undefined;

            if(isOption(item)){
                if(isString(value)){
                    value = [value]
                } else if(value == undefined){
                    value = [];
                }
                item.options.map(option => {
                    const val = option.value ?? option.label
                    option.selected = value.includes(val);
                })
            } else {
                if(value == undefined){
                    delete item.value;
                } else {
                    item.value = value;
                }
            }
        } else if(isGroup(item)){
            item.items = setDefaults(item.items, data);
        }
    })

    return items;
}

export default Editor;