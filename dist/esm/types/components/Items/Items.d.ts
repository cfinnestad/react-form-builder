import { Dispatch, FC, JSX, SetStateAction } from "react";
import { ActionProps } from "../Actions";
import { SubmitButtonProps } from "./Submit";
import { Theme } from "@mui/material/styles";
export type AllowedSubtypes = {
    [key: string]: FieldType;
};
export type AllowedItems = {
    [key: string]: ItemType;
};
export type Options = {
    Actions?: FC<ActionProps>[];
    AllowedItems: AllowedItems;
    AllowedSubtypes: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    SetItem: Dispatch<SetStateAction<AnyItem>>;
    setItems: Dispatch<SetStateAction<AnyItem[]>>;
    setModal?: Dispatch<SetStateAction<JSX.Element>>;
    IsBuild: boolean;
    getError: (error: string, item: AnyItem) => string | undefined;
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element;
    };
    muiTheme: Theme;
    custom?: {
        [key: string]: any;
    };
};
export declare const validateItem: (Item: object, index: number) => string[];
export type BaseItem = {
    id: string;
    type: string;
    filter?: FilterType;
    ClassName?: string;
    custom?: {
        [key: string]: any;
    };
};
export type FilterType = {
    comparison: '=' | '>' | '>=' | '<' | '<=' | 'in' | 'and' | 'or' | 'not';
};
export type FieldFilter = FilterType & {
    comparison: '=' | '>' | '>=' | '<' | '<=' | 'in';
    fieldId: string;
    value?: string | number | boolean | string[];
};
export declare const isFieldFilter: (filter: FilterType) => filter is FieldFilter;
export type EqFilter = FieldFilter & {
    comparison: '=';
    value?: string | number | boolean;
};
export declare const isEqFilter: (filter: FilterType) => filter is EqFilter;
export type GtFilter = FieldFilter & {
    comparison: '>';
    value?: string | number | boolean;
};
export declare const isGtFilter: (filter: FilterType) => filter is GtFilter;
export type GteFilter = FieldFilter & {
    comparison: '>=';
    value?: string | number | boolean;
};
export declare const isGteFilter: (filter: FilterType) => filter is GteFilter;
export type LtFilter = FieldFilter & {
    comparison: '<';
    value?: string | number | boolean;
};
export declare const isLtFilter: (filter: FilterType) => filter is LtFilter;
export type LteFilter = FieldFilter & {
    comparison: '<=';
    value?: string | number | boolean;
};
export declare const isLteFilter: (filter: FilterType) => filter is LteFilter;
export type InFilter = FieldFilter & {
    comparison: 'in';
    value?: string[];
};
export declare const isInFilter: (filter: FilterType) => filter is InFilter;
export type AndFilter = FilterType & {
    comparison: 'and';
    filters: FilterType[];
};
export declare const isAndFilter: (filter: FilterType) => filter is AndFilter;
export type OrFilter = FilterType & {
    comparison: 'or';
    filters: FilterType[];
};
export declare const isOrFilter: (filter: FilterType) => filter is OrFilter;
export type NotFilter = FilterType & {
    comparison: 'not';
    filter: FilterType;
};
export declare const isNotFilter: (filter: FilterType) => filter is NotFilter;
export type NamedItem = BaseItem & {
    name: string;
};
export type Option = {
    selected?: boolean;
    label: string;
    value?: string;
};
export type HiddenItem = NamedItem & {
    type: 'Hidden';
    deprecated?: boolean;
    value: string;
};
export type HTMLItem = BaseItem & {
    type: 'HTML';
    content: string;
};
export type SubmitItem = BaseItem & {
    type: 'Submit';
    submitElementName?: string;
    label?: string;
};
export type GroupItem = NamedItem & {
    type: 'Group';
    label: string;
    deprecated?: boolean;
    items: AnyItem[];
};
export type FieldItem = NamedItem & {
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
export type OptionSubtype = FieldItem & {
    value?: string | string[];
    searchableOptionsName?: string;
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
    value?: string[];
    inLine?: boolean;
};
export type AutocompleteSubtype = OptionSubtype & {
    subtype: 'Autocomplete';
    allowAnyInput?: boolean;
    value?: string;
};
export type TextSubtype = FieldItem & {
    subtype: 'Text';
    value?: string;
    multiline?: boolean;
    minLength?: number;
    maxLength?: number;
};
export type EmailSubtype = FieldItem & {
    subtype: 'Email';
    value?: string;
    maxLength?: number;
};
export type NumberSubtype = FieldItem & {
    subtype: 'Number';
    value?: number;
    min?: number;
    max?: number;
};
export type PhoneSubtype = FieldItem & {
    subtype: 'Phone';
    value?: string;
    placeholder?: string;
};
export type DateSubtype = FieldItem & {
    subtype: 'Date';
    value?: string;
    minDate?: string;
    maxDate?: string;
    minDateOffsetDays?: number;
    minDateOffsetMonths?: number;
    minDateOffsetYears?: number;
    maxDateOffsetDays?: number;
    maxDateOffsetMonths?: number;
    maxDateOffsetYears?: number;
    dateFormat?: string;
};
export type BooleanSubtype = FieldItem & {
    subtype: 'Boolean';
    value?: boolean;
};
export type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype | AutocompleteSubtype;
export type ItemType = {
    Item: AnyItem;
    ItemFC: (props: ItemProps) => JSX.Element;
    EditFC: (props: ItemProps) => JSX.Element;
};
export type FieldType = {
    Subtype: FieldItem;
    SubtypeFC: (props: FieldProps) => JSX.Element;
    EditFC: (props: FieldProps) => JSX.Element;
    ValidateFC?: (item: FieldItem, options: Options) => boolean;
};
export type BaseItemProps = {
    item: AnyItem;
    items: AnyItem[];
    options: Options;
};
export type FieldProps = BaseItemProps & {
    item: FieldItem;
};
export type GroupProps = BaseItemProps & {
    item: GroupItem;
};
export type HTMLProps = BaseItemProps & {
    item: HTMLItem;
};
export type SubmitProps = BaseItemProps & {
    item: SubmitItem;
};
export type HiddenProps = BaseItemProps & {
    item: HiddenItem;
};
export type ItemProps = BaseItemProps | GroupProps | HiddenProps | HTMLProps | SubmitProps | FieldProps;
export declare function isGroup(item: AnyItem): item is GroupItem;
export declare function isHidden(item: AnyItem): item is HiddenItem;
export declare function isField(item: AnyItem): item is FieldItem;
export declare function isHtml(item: AnyItem): item is HTMLItem;
export declare function isSubmit(item: AnyItem): item is SubmitItem;
export declare function isSelect(item: AnyItem): item is SelectSubtype;
export declare function isRadio(item: AnyItem): item is RadioSubtype;
export declare function isCheckbox(item: AnyItem): item is CheckboxSubtype;
export declare function isText(item: AnyItem): item is TextSubtype;
export declare function isEmail(item: AnyItem): item is EmailSubtype;
export declare function isNumber(item: AnyItem): item is NumberSubtype;
export declare function isDate(item: AnyItem): item is DateSubtype;
export declare function isBoolean(item: AnyItem): item is BooleanSubtype;
export declare function isAutocomplete(item: AnyItem): item is AutocompleteSubtype;
export declare function isPhone(item: AnyItem): item is PhoneSubtype;
export declare function isOption(item: AnyItem): item is OptionSubtype;
