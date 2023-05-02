import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {BuildProps} from "../Builder/BuildItems/BuildItems";
import {Options} from "../Actions/Actions";

interface NamedItem {
    Item: Item,
}

export interface ItemType {
    Item: Item,
    ItemFC: (ItemProps: ItemProps) => {},
}

export interface ItemTypes {
    [key:string]: ItemType
}
export interface ItemProps extends ItemType {
    SetItem: (Item: Item) => void
    Options: Options
}
const Items = ({Items, Options}:BuildProps) => {

    return <></>
}