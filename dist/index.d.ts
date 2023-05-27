import React, { JSX as JSX$1, FC, Dispatch, SetStateAction } from 'react';

declare const validateItem: (Item: object, index: number) => string[];
type BaseItem = {
    id: string;
    type: string;
    filter?: FilterType;
    ClassName?: string;
    custom?: {
        [key: string]: any;
    };
};
type FilterType = {
    comparison: '=' | '>' | '>=' | '<' | '<=' | 'in' | 'and' | 'or' | 'not';
};
type FieldFilter = FilterType & {
    comparison: '=' | '>' | '>=' | '<' | '<=' | 'in';
    fieldId: string;
    value?: string | number | boolean | string[];
};
declare const isFieldFilter: (filter: FilterType) => filter is FieldFilter;
type EqFilter = FieldFilter & {
    comparison: '=';
    value?: string | number | boolean;
};
declare const isEqFilter: (filter: FilterType) => filter is EqFilter;
type GtFilter = FieldFilter & {
    comparison: '>';
    value?: string | number | boolean;
};
declare const isGtFilter: (filter: FilterType) => filter is GtFilter;
type GteFilter = FieldFilter & {
    comparison: '>=';
    value?: string | number | boolean;
};
declare const isGteFilter: (filter: FilterType) => filter is GteFilter;
type LtFilter = FieldFilter & {
    comparison: '<';
    value?: string | number | boolean;
};
declare const isLtFilter: (filter: FilterType) => filter is LtFilter;
type LteFilter = FieldFilter & {
    comparison: '<=';
    value?: string | number | boolean;
};
declare const isLteFilter: (filter: FilterType) => filter is LteFilter;
type InFilter = FieldFilter & {
    comparison: 'in';
    value?: string[];
};
declare const isInFilter: (filter: FilterType) => filter is InFilter;
type AndFilter = FilterType & {
    comparison: 'and';
    filters: FilterType[];
};
declare const isAndFilter: (filter: FilterType) => filter is AndFilter;
type OrFilter = FilterType & {
    comparison: 'or';
    filters: FilterType[];
};
declare const isOrFilter: (filter: FilterType) => filter is OrFilter;
type NotFilter = FilterType & {
    comparison: 'not';
    filter: FilterType;
};
declare const isNotFilter: (filter: FilterType) => filter is NotFilter;
type NamedItem = BaseItem & {
    name: string;
};
type Option = {
    selected?: boolean;
    label: string;
    value?: string;
};
type HiddenItem = NamedItem & {
    type: 'Hidden';
    deprecated?: boolean;
    value: string;
};
type HTMLItem = BaseItem & {
    type: 'HTML';
    content: string;
};
type GroupItem = NamedItem & {
    type: 'Group';
    label: string;
    deprecated?: boolean;
    items: AnyItem[];
};
type FieldItem = NamedItem & {
    required?: boolean;
    label: string;
    deprecated?: boolean;
    helperText?: string;
    subtype: string;
    custom?: {
        [key: string]: any;
    };
    value?: string | number | string[] | boolean;
    errorText?: string;
};
type OptionSubtype = FieldItem & {
    value?: string | string[];
    options: Option[];
};
type SelectSubtype = OptionSubtype & {
    subtype: 'Select';
    value?: string | string[];
    multiples: boolean;
};
type RadioSubtype = OptionSubtype & {
    subtype: 'Radio';
    value?: string;
    inLine?: boolean;
};
type CheckboxSubtype = OptionSubtype & {
    subtype: 'Checkbox';
    value?: string[];
    inLine?: boolean;
};
type TextSubtype = FieldItem & {
    subtype: 'Text';
    value?: string;
    multiline?: boolean;
    minLength?: number;
    maxLength?: number;
};
type EmailSubtype = FieldItem & {
    subtype: 'Email';
    value?: string;
    maxLength?: number;
};
type NumberSubtype = FieldItem & {
    subtype: 'Number';
    value?: number;
    min?: number;
    max?: number;
};
type PhoneSubtype = FieldItem & {
    subtype: 'Phone';
    value?: string;
};
type DateSubtype = FieldItem & {
    subtype: 'Date';
    value?: string;
    minDate?: string;
    minDateOffsetDays?: number;
    maxDate?: string;
    maxDateOffsetDays?: number;
};
type BooleanSubtype = FieldItem & {
    subtype: 'Boolean';
    value?: boolean;
};
type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype;
type ItemType = {
    Item: AnyItem;
    ItemFC: (props: ItemProps) => JSX$1.Element;
    EditFC: (props: ItemProps) => JSX$1.Element;
};
type FieldType = {
    Subtype: FieldItem;
    SubtypeFC: (props: FieldProps) => JSX$1.Element;
    EditFC: (props: FieldProps) => JSX$1.Element;
    ValidateFC?: (item: FieldItem, options: Options) => boolean;
};
type BaseItemProps = {
    item: AnyItem;
    items: AnyItem[];
    options: Options;
};
type FieldProps = BaseItemProps & {
    item: FieldItem;
};
type GroupProps = BaseItemProps & {
    item: GroupItem;
};
type HTMLProps = BaseItemProps & {
    item: HTMLItem;
};
type HiddenProps = BaseItemProps & {
    item: HiddenItem;
};
type ItemProps = BaseItemProps | GroupProps | HiddenProps | HTMLProps | FieldProps;
declare function isGroup(item: AnyItem): item is GroupItem;
declare function isHidden(item: AnyItem): item is HiddenItem;
declare function isField(item: AnyItem): item is FieldItem;
declare function isHtml(item: AnyItem): item is HTMLItem;
declare function isSelect(item: AnyItem): item is SelectSubtype;
declare function isRadio(item: AnyItem): item is RadioSubtype;
declare function isCheckbox(item: AnyItem): item is CheckboxSubtype;
declare function isText(item: AnyItem): item is TextSubtype;
declare function isEmail(item: AnyItem): item is EmailSubtype;
declare function isNumber(item: AnyItem): item is NumberSubtype;
declare function isDate(item: AnyItem): item is DateSubtype;
declare function isBoolean(item: AnyItem): item is BooleanSubtype;
declare function isPhone(item: AnyItem): item is PhoneSubtype;

interface ActionProps {
    Items: AnyItem[];
    Options: Options;
}
type ActionFC = FC<ActionProps>;

type AllowedItems = {
    [key: string]: ItemType;
};

type AllowedSubtypes = {
    [key: string]: FieldType;
};

type ErrorType = {
    [key: string]: string;
};

type BuilderOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
};
type Options = {
    Actions?: FC<ActionProps>[];
    AllowedItems: AllowedItems;
    AllowedSubtypes: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    SetItem: Dispatch<SetStateAction<AnyItem>>;
    setItems: Dispatch<SetStateAction<AnyItem[]>>;
    setModal?: Dispatch<SetStateAction<JSX.Element>>;
    IsBuild: boolean;
    renderType?: 'object' | 'flatobject' | 'array' | 'flatarray';
    getError: (error: string, item: AnyItem) => string | undefined;
};
type BuilderProps = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    Items?: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options?: BuilderOptions;
};
declare const Builder: ({ Items, SetItems, Options }: BuilderProps) => React.JSX.Element;

type SubmitProps = {
    items: AnyItem[];
    options: Options;
    results: Array<Object> | Object;
};
type RenderProps = {
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
    Submit: (props: SubmitProps) => JSX$1.Element;
};
type RenderOptions = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    returnType?: 'object' | 'flatobject' | 'array' | 'flatarray';
    Errors?: ErrorType;
};
declare const Render: ({ Items, SetItems, Options, Submit }: RenderProps) => JSX$1.Element;

export { AndFilter, AnyItem, BaseItem, BaseItemProps, BooleanSubtype, Builder, CheckboxSubtype, DateSubtype, EmailSubtype, EqFilter, FieldFilter, FieldItem, FieldProps, FieldType, FilterType, GroupItem, GroupProps, GtFilter, GteFilter, HTMLItem, HTMLProps, HiddenItem, HiddenProps, InFilter, ItemProps, ItemType, LtFilter, LteFilter, NamedItem, NotFilter, NumberSubtype, Option, OptionSubtype, OrFilter, PhoneSubtype, RadioSubtype, Render, SelectSubtype, TextSubtype, isAndFilter, isBoolean, isCheckbox, isDate, isEmail, isEqFilter, isField, isFieldFilter, isGroup, isGtFilter, isGteFilter, isHidden, isHtml, isInFilter, isLtFilter, isLteFilter, isNotFilter, isNumber, isOrFilter, isPhone, isRadio, isSelect, isText, validateItem };
