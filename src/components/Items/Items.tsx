import React, {Dispatch, SetStateAction} from "react";
import {Options} from "../Builder/Builder";

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

export type OptionItem = FieldItem & {
    value?: string|string[],
    options: Option[],
}

export type HiddenItem = NamedItem & {
    type: 'Hidden',
    value: string,
}

export type FieldItem = NamedItem & {
    required: boolean,
    label: string,
    deprecated: boolean,
    value?: string|number|boolean|Option[],
    placeholder?: string,
}

export type GroupItem = NamedItem & {
    type: 'Group',
    maxColumns: number,
    Items: AnyItem[],
}

export type SelectItem = OptionItem & {
    type: 'Select',
    multiples: boolean,
}

export type RadioItem = OptionItem & {
    type: 'Radio',
    value?: string,
    inLine?: boolean,
}

export type CheckboxItem = OptionItem & {
    type: 'Checkbox',
    inLine?: boolean,
}

export type TextItem = FieldItem & {
    type: 'Text',
    value?: string,
    multiline?: boolean
    minLength?: number,
    maxLength?: number,
}

export type EmailItem = FieldItem & {
    type: 'Email',
    value?: string,
    maxLength?: number,
}

export type NumberItem = FieldItem & {
    type: 'Number',
    value?: number,
    min?: number,
    max?: number,
}

export type DateItem = FieldItem & {
    type: 'Date',
    value?: string,
    minDate?: string,
    minDateOffsetDays?: number,
    maxDate?: string,
    maxDateOffsetDays?: number,
}

export type HTMLItem = BaseItem & {
    type: 'HTML',
    content: string,
}

export type BooleanItem = BaseItem & {
    type: 'Boolean',
    value: boolean,
}

export type AnyItem = BaseItem | FieldItem | GroupItem | OptionItem | SelectItem | HTMLItem | TextItem | EmailItem | NumberItem | DateItem | HiddenItem | CheckboxItem | BooleanItem | RadioItem


export type ItemType = {
    Item: AnyItem,
    ItemFC: (props: any) => JSX.Element,

}

export type BaseItemProps = {
    Item: AnyItem,
    Items: AnyItem[],
    ItemFC: (props: any) => JSX.Element,
    SetItems: Dispatch<SetStateAction<AnyItem[]>>
    Options: Options
}

export type FieldProps = BaseItemProps & { Item: FieldItem }
export type GroupProps = BaseItemProps & { Item: GroupItem }
export type SelectProps = BaseItemProps & { Item: SelectItem }
export type HTMLProps = BaseItemProps & { Item: HTMLItem }
export type TextProps = BaseItemProps & { Item: TextItem }
export type EmailProps = BaseItemProps & { Item: EmailItem }
export type NumberProps = BaseItemProps & { Item: NumberItem }
export type DateProps = BaseItemProps & { Item: DateItem }
export type HiddenProps = BaseItemProps & { Item: HiddenItem }
export type CheckboxProps = BaseItemProps & { Item: CheckboxItem }
export type BooleanProps = BaseItemProps & { Item: BooleanItem }
export type RadioProps = BaseItemProps & { Item: RadioItem }
export type ItemProps = BaseItemProps|FieldProps|GroupProps|SelectProps|HTMLProps|TextProps|EmailProps|NumberProps|DateProps|HiddenProps|CheckboxProps|BooleanProps|RadioProps
