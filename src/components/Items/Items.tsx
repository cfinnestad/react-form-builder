import React from "react";
import {Options} from "../Builder/Builder";


export const validateItem = (Item: object, index: number): string[] => {
    const messages: string[] = []
    const ids: string[] = []
    const prefix = "Item #" + index + " has "

    if (!('id' in Item)) { messages.push(prefix+"id missing") }
    else if (typeof Item.id !== 'string') { messages.push(prefix+"invalid property 'id' should be a string") }
    else if (ids.includes(Item.id)) { messages.push(prefix+"a duplicate id") }
    else {ids.push(Item.id)}

    if (!('type' in Item)) { messages.push(prefix+"type missing") }
    else if (typeof Item.type !== 'string') { messages.push(prefix+"invalid property 'type' should be a string") }
    // TODO finish validations for all types calling the validate for each specific type
    return messages
}

export type BaseItem = {
    id: string,
    type: string,
    filter?: GroupFilter,
    ClassName?: string,
    custom?: {[key:string]: any},
}

export type Filter = {
    fieldName: string,
    comparison: '='|'!='|'>'|'>='|'<'|'<='|'in'|'not in',
    value: string|number|boolean|string[],
}

export type GroupFilter = {
    type: 'and'|'or'|'not'|'xor',
    filters: (GroupFilter | Filter)[],
}

export type NamedItem = BaseItem & {
    name: string,
}

export type Option = {
    checked: boolean,
    startChecked: boolean,
    fieldName: string,
    value: string,
}

export type HiddenItem = NamedItem & {
    type: 'Hidden',
    value: string,
}

export type HTMLItem = BaseItem & {
    type: 'HTML',
    content: string,
}

export type GroupItem = NamedItem & {
    type: 'Group',
    label: string,
    items: AnyItem[],
}

export type FieldItem = NamedItem & {
    required: boolean,
    label: string,
    deprecated: boolean,
    placeholder?: string,
    subtype: AnySubtype
}

export type FieldSubType = {
    subtype: string,
    value?: string|number|boolean|string[],
    custom?: { [key:string]: any }
}

export type OptionSubtype = FieldSubType & {
    value?: string|string[],
    options: Option[],
}

export type SelectSubtype = OptionSubtype & {
    subtype: 'Select',
    value?: string | string[],
    multiples: boolean,
}

export type RadioSubtype = OptionSubtype & {
    subtype: 'Radio',
    value?: string,
    inLine?: boolean,
}

export type CheckboxSubtype = OptionSubtype & {
    subtype: 'Checkbox',
    inLine?: boolean,
}

export type TextSubtype = FieldSubType & {
    subtype: 'Text',
    value?: string,
    multiline?: boolean
    minLength?: number,
    maxLength?: number,
}

export type EmailSubtype = FieldSubType & {
    subtype: 'Email',
    value?: string,
    maxLength?: number,
}

export type NumberSubtype = FieldSubType & {
    subtype: 'Number',
    value?: number,
    min?: number,
    max?: number,
}

export type DateSubtype = FieldSubType & {
    subtype: 'Date',
    value?: string,
    minDate?: string,
    minDateOffsetDays?: number,
    maxDate?: string,
    maxDateOffsetDays?: number,
    // TODO add year min/max offset?
}

export type BooleanSubtype = FieldSubType & {
    subtype: 'Boolean',
    value: boolean,
}

export type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem

export type AnySubtype = FieldSubType | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype

export type ItemType = {
    Item: AnyItem,
    ItemFC: (props: any) => JSX.Element,
    EditFC: (props: any) => JSX.Element,
}

export type FieldType = {
    Subtype: AnySubtype,
    SubtypeFC: (props: FieldProps) => JSX.Element,
    EditFC: (props: any) => JSX.Element,
}

export type BaseItemProps = {
    item: AnyItem,
    items: AnyItem[],
    options: Options
}

export type FieldProps = BaseItemProps & { item: FieldItem }
export type GroupProps = BaseItemProps & { Item: GroupItem }
export type HTMLProps = BaseItemProps & { Item: HTMLItem }
export type HiddenProps = BaseItemProps & { Item: HiddenItem }
export type ItemProps = BaseItemProps|FieldProps|GroupProps|HiddenProps|HTMLProps
