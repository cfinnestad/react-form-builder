import { Dispatch, SetStateAction } from "react";
import { Options } from "../Builder/Builder";
import { AllowedSubtypes } from "./Subtypes/DefaultSubTypes";
export declare const validateItem: (Item: object, index: number) => string[];
export type BaseItem = {
    id: string;
    type: string;
    filter?: GroupFilter;
    ClassName?: string;
    custom?: {
        [key: string]: any;
    };
};
export type Filter = {
    fieldName: string;
    comparison: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not in';
    value: string | number | boolean | string[];
};
export type GroupFilter = {
    type: 'and' | 'or' | 'not' | 'xor';
    filters: (GroupFilter | Filter)[];
};
export type NamedItem = BaseItem & {
    name: string;
};
export type Option = {
    checked: boolean;
    startChecked: boolean;
    fieldName: string;
    value: string;
};
export type HiddenItem = NamedItem & {
    type: 'Hidden';
    value: string;
};
export type HTMLItem = BaseItem & {
    type: 'HTML';
    content: string;
};
export type GroupItem = NamedItem & {
    type: 'Group';
    label: string;
    columns: number;
    Items: AnyItem[];
};
export type FieldItem = NamedItem & {
    required: boolean;
    label: string;
    deprecated: boolean;
    placeholder?: string;
    subtype: AnySubtype;
};
export type FieldSubType = {
    subtype: string;
    value?: string | number | boolean | string[];
    custom?: {
        [key: string]: any;
    };
};
export type OptionSubtype = FieldSubType & {
    value?: string | string[];
    options: Option[];
};
export type SelectSubtype = OptionSubtype & {
    subtype: 'Select';
    value?: string | string[];
    multiples: boolean;
};
export type RadioSubtype = OptionSubtype & {
    subtype: 'Radio';
    value?: string;
    inLine?: boolean;
};
export type CheckboxSubtype = OptionSubtype & {
    subtype: 'Checkbox';
    inLine?: boolean;
};
export type TextSubtype = FieldSubType & {
    subtype: 'Text';
    value?: string;
    multiline?: boolean;
    minLength?: number;
    maxLength?: number;
};
export type EmailSubtype = FieldSubType & {
    subtype: 'Email';
    value?: string;
    maxLength?: number;
};
export type NumberSubtype = FieldSubType & {
    subtype: 'Number';
    value?: number;
    min?: number;
    max?: number;
};
export type DateSubtype = FieldSubType & {
    subtype: 'Date';
    value?: string;
    minDate?: string;
    minDateOffsetDays?: number;
    maxDate?: string;
    maxDateOffsetDays?: number;
};
export type BooleanSubtype = FieldSubType & {
    subtype: 'Boolean';
    value: boolean;
};
export type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem;
export type AnySubtype = FieldSubType | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype;
export type ItemType = {
    Item: AnyItem;
    ItemFC: (props: any) => JSX.Element;
    EditFC: (props: any) => JSX.Element;
};
export type FieldType = {
    Subtype: AnySubtype;
    SubtypeFC: (props: any) => JSX.Element;
    EditFC: (props: any) => JSX.Element;
};
export type BaseItemProps = {
    Item: AnyItem;
    Items: AnyItem[];
    ItemFC: (props: any) => JSX.Element;
    IsBuild?: boolean;
    SetItems: Dispatch<SetStateAction<AnyItem[]>>;
    Options: Options;
    AllowedSubtypes: AllowedSubtypes;
};
export type FieldProps = BaseItemProps & {
    Item: FieldItem;
};
export type GroupProps = BaseItemProps & {
    Item: GroupItem;
};
export type HTMLProps = BaseItemProps & {
    Item: HTMLItem;
};
export type HiddenProps = BaseItemProps & {
    Item: HiddenItem;
};
export type ItemProps = BaseItemProps | FieldProps | GroupProps | HiddenProps | HTMLProps;
