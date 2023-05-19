import React, {JSX} from "react";
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
    filter?: FilterType,
    ClassName?: string,
    custom?: {[key:string]: any},
}

export type FilterType = {
    comparison: '='|'>'|'>='|'<'|'<='|'in'|'and'|'or'|'not'
}
export type FieldFilter = FilterType & {
    comparison: '='|'>'|'>='|'<'|'<='|'in',
    fieldId: string,
    value: string|number|boolean|string[],
}
export const isFieldFilter = (filter: FilterType): filter is FieldFilter => { return ['=','>','>=','<','<=','in'].includes(filter.comparison) }

export type EqFilter = FieldFilter & {
    comparison: '=',
    value: string|number|boolean,
}
export const isEqFilter = (filter: FilterType): filter is EqFilter => { return filter.comparison === '=' }

export type GtFilter = FieldFilter & {
    comparison: '>',
    value: string|number|boolean,
}
export const isGtFilter = (filter: FilterType): filter is GtFilter => { return filter.comparison === '>' }

export type GteFilter = FieldFilter & {
    comparison: '>=',
    value: string|number|boolean,
}
export const isGteFilter = (filter: FilterType): filter is GteFilter => { return filter.comparison === '>=' }

export type LtFilter = FieldFilter & {
    comparison: '<',
    value: string|number|boolean,
}
export const isLtFilter = (filter: FilterType): filter is LtFilter => { return filter.comparison === '<' }

export type LteFilter = FieldFilter & {
    comparison: '<=',
    value: string|number|boolean,
}
export const isLteFilter = (filter: FilterType): filter is LteFilter => { return filter.comparison === '<=' }

export type InFilter = FieldFilter & {
    comparison: 'in',
    value: string[],
}
export const isInFilter = (filter: FilterType): filter is InFilter => { return filter.comparison === 'in' }

export type AndFilter = FilterType & {
    comparison: 'and',
    filters: FilterType[],
}
export const isAndFilter = (filter: FilterType): filter is AndFilter => { return filter.comparison === 'and' }

export type OrFilter = FilterType & {
    comparison: 'or',
    filters: FilterType[],
}
export const isOrFilter = (filter: FilterType): filter is OrFilter => { return filter.comparison === 'or' }

export type NotFilter = FilterType & {
    comparison: 'not',
    filter: FilterType,
}
export const isNotFilter = (filter: FilterType): filter is NotFilter => { return filter.comparison === 'not' }

export type NamedItem = BaseItem & {
    name: string,
}

export type Option = {
    selected: boolean,
    label: string,
    value?: string,
}

export type HiddenItem = NamedItem & {
    type: 'Hidden',
    deprecated?: boolean,
    value: string,
}

export type HTMLItem = BaseItem & {
    type: 'HTML',
    content: string,
}

export type GroupItem = NamedItem & {
    type: 'Group',
    label: string,
    deprecated?: boolean,
    items: AnyItem[],
}

export type FieldItem = NamedItem & {
    required?: boolean,
    label: string,
    deprecated?: boolean,
    helperText?: string,
    subtype: 'Select' | 'Radio' | 'Checkbox' | 'Text' | 'Email' | 'Number' | 'Phone' | 'Date' | 'Boolean'
    custom?: { [key:string]: any }
    value?: string | number | string[] | boolean,
    errorText?: string
}

// export type BaseSubType = {
//     subtype: string,
//     // value?: string|number|boolean|string[],
//
// }

export type OptionSubtype = FieldItem & {
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

export type TextSubtype = FieldItem & {
    subtype: 'Text',
    value?: string,
    multiline?: boolean
    minLength?: number,
    maxLength?: number,
}

export type EmailSubtype = FieldItem & {
    subtype: 'Email',
    value?: string,
    maxLength?: number,
}

export type NumberSubtype = FieldItem & {
    subtype: 'Number',
    value?: number,
    min?: number,
    max?: number,
}

export type PhoneSubtype = FieldItem & {
    subtype: 'Phone',
    value?: string,
}

export type DateSubtype = FieldItem & {
    subtype: 'Date',
    value?: string,
    minDate?: string,
    minDateOffsetDays?: number,
    maxDate?: string,
    maxDateOffsetDays?: number,
    // TODO add year min/max offset?
}

export type BooleanSubtype = FieldItem & {
    subtype: 'Boolean',
    value: boolean,
}

export type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype

export type ItemType = {
    Item: AnyItem,
    ItemFC: (props: ItemProps) => JSX.Element,
    EditFC: (props: ItemProps) => JSX.Element,
}

export type FieldType = {
    Subtype: FieldItem,
    SubtypeFC: (props: FieldProps) => JSX.Element,
    EditFC: (props: FieldProps) => JSX.Element,
}

export type BaseItemProps = {
    item: AnyItem,
    items: AnyItem[],
    options: Options
}

export type FieldProps = BaseItemProps & { item: FieldItem }
export type GroupProps = BaseItemProps & { item: GroupItem }
export type HTMLProps = BaseItemProps & { item: HTMLItem }
export type HiddenProps = BaseItemProps & { item: HiddenItem }
export type ItemProps =
    | BaseItemProps
    | GroupProps
    | HiddenProps
    | HTMLProps
    | FieldProps


export function isGroup(item: AnyItem): item is GroupItem { return item.type === "Group" }
export function isHidden(item: AnyItem): item is HiddenItem { return item.type === "Hidden" }
export function isField(item: AnyItem): item is FieldItem { return item.type === "Field" }
export function isHtml(item: AnyItem): item is HTMLItem { return item.type === "HTML" }
export function isSelect(item: AnyItem): item is SelectSubtype { return isField(item) && item.subtype === "Select"}
export function isRadio(item: AnyItem): item is RadioSubtype { return isField(item) && item.subtype === "Radio"}
export function isCheckbox(item: AnyItem): item is CheckboxSubtype { return isField(item) && item.subtype === "Checkbox"}
export function isText(item: AnyItem): item is TextSubtype { return isField(item) && item.subtype === "Text"}
export function isEmail(item: AnyItem): item is EmailSubtype { return isField(item) && item.subtype === "Email"}
export function isNumber(item: AnyItem): item is NumberSubtype { return isField(item) && item.subtype === "Number"}
export function isDate(item: AnyItem): item is DateSubtype { return isField(item) && item.subtype === "Date"}
export function isBoolean(item: AnyItem): item is BooleanSubtype { return isField(item) && item.subtype === "Boolean"}
export function isPhone(item: AnyItem): item is PhoneSubtype { return isField(item) && item.subtype === "Phone"}
