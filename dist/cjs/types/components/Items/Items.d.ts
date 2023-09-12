import { Dispatch, FC, JSX, SetStateAction } from "react";
import { ActionProps } from "../Actions";
import { SubmitButtonProps } from "./Submit";
import { Theme } from "@mui/material/styles";
import { ActiveType } from "../Builder/Builder";
export type AllowedSubtypes = {
    [key: string]: AnyFieldType;
};
export type AllowedItems = {
    [key: string]: ItemType | HTMLType | GroupType | FieldType | SubmitType | HiddenType;
};
export type BuildErrors = {
    [key: string]: string;
};
export type Options = {
    Actions?: FC<ActionProps>[];
    AllowedItems: AllowedItems;
    AllowedSubtypes: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    SetItem: Dispatch<SetStateAction<AnyItem>>;
    setItems: Dispatch<SetStateAction<AnyItem[]>>;
    setModal?: Dispatch<SetStateAction<boolean>>;
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
    value?: string | number | boolean | undefined | (string | number | boolean | undefined)[];
};
export declare const isFieldFilter: (filter: FilterType) => filter is FieldFilter;
export type EqFilter = FieldFilter & {
    comparison: '=';
    value?: string | number | boolean | undefined;
};
export declare const isEqFilter: (filter: FilterType) => filter is EqFilter;
export type GtFilter = FieldFilter & {
    comparison: '>';
    value?: string | number | boolean | undefined;
};
export declare const isGtFilter: (filter: FilterType) => filter is GtFilter;
export type GteFilter = FieldFilter & {
    comparison: '>=';
    value?: string | number | boolean | undefined;
};
export declare const isGteFilter: (filter: FilterType) => filter is GteFilter;
export type LtFilter = FieldFilter & {
    comparison: '<';
    value?: string | number | boolean | undefined;
};
export declare const isLtFilter: (filter: FilterType) => filter is LtFilter;
export type LteFilter = FieldFilter & {
    comparison: '<=';
    value?: string | number | boolean | undefined;
};
export declare const isLteFilter: (filter: FilterType) => filter is LteFilter;
export type InFilter = FieldFilter & {
    comparison: 'in';
    value?: (string | number | boolean | undefined)[];
};
export declare const isInFilter: (filter: FilterType) => filter is InFilter;
export type ComparisonFilter = FilterType & {
    comparison: 'and' | 'or';
    filters: FilterType[];
};
export declare const isComparisonFilter: (filter: FilterType) => filter is AndFilter;
export type AndFilter = ComparisonFilter & {
    comparison: 'and';
};
export declare const isAndFilter: (filter: FilterType) => filter is AndFilter;
export type OrFilter = ComparisonFilter & {
    comparison: 'or';
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
    label?: string;
    deprecated?: boolean;
    backend_only?: boolean;
    items: AnyItem[];
};
export type FieldItem = NamedItem & {
    required?: boolean;
    label?: string;
    deprecated?: boolean;
    backend_only?: boolean;
    helperText?: string;
    subtype: string;
    custom?: {
        [key: string]: any;
    };
    value?: string | number | string[] | boolean;
    errorText?: string;
};
export type OptionSubtype = FieldItem & {
    label: string;
    value?: string | string[];
    editable?: boolean;
    searchableOptionsName?: string;
    options: Option[];
};
export type MultiplesSubtype = OptionSubtype & {
    multiples?: boolean;
};
export type SelectSubtype = MultiplesSubtype & {
    subtype: 'Select';
    value?: string | string[];
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
    emptyValueOption?: string;
    noOptionsFound?: string;
};
export type TextSubtype = FieldItem & {
    label: string;
    subtype: 'Text';
    value?: string;
    multiline?: boolean;
    minLength?: number;
    maxLength?: number;
    editable?: boolean;
};
export type EmailSubtype = FieldItem & {
    label: string;
    subtype: 'Email';
    value?: string;
    maxLength?: number;
};
export type NumberSubtype = FieldItem & {
    label: string;
    subtype: 'Number';
    value?: number;
    min?: number;
    max?: number;
};
export type PhoneSubtype = FieldItem & {
    label: string;
    subtype: 'Phone';
    value?: string;
    placeholder?: string;
};
export type DateSubtype = FieldItem & {
    label: string;
    subtype: 'Date';
    value?: string;
    defaultToday?: boolean;
    minDate?: string;
    maxDate?: string;
    minDateComputed?: string;
    maxDateComputed?: string;
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
    description: string;
    value?: boolean;
    editable?: boolean;
};
export type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype | AutocompleteSubtype;
export type ItemType = {
    Item: AnyItem;
    ItemFC: (props: ItemProps | HiddenProps | FieldProps | SubmitProps | HTMLProps | GroupProps) => JSX.Element;
    EditFC: (props: ItemProps | HiddenProps | FieldProps | SubmitProps | HTMLProps | GroupProps) => JSX.Element;
};
export type HiddenType = {
    Item: HiddenItem;
    ItemFC: (props: HiddenProps) => JSX.Element;
    EditFC: (props: HiddenProps) => JSX.Element;
};
export type GroupType = {
    Item: GroupItem;
    ItemFC: (props: GroupProps) => JSX.Element;
    EditFC: (props: GroupProps) => JSX.Element;
};
export type SubmitType = {
    Item: SubmitItem;
    ItemFC: (props: SubmitProps) => JSX.Element;
    EditFC: (props: SubmitProps) => JSX.Element;
};
export type HTMLType = {
    Item: HTMLItem;
    ItemFC: (props: HTMLProps) => JSX.Element;
    EditFC: (props: HTMLProps) => JSX.Element;
};
export type FieldType = ItemType & {
    Subtype: FieldItem;
    SubtypeFC: (props: FieldProps) => JSX.Element;
    ItemFC: (props: FieldProps) => JSX.Element;
    EditFC: (props: FieldProps) => JSX.Element;
    ValidateFC?: (item: FieldItem, options: Options) => boolean;
};
export type SelectType = {
    Subtype: SelectSubtype;
    SubtypeFC: (props: SelectProps) => JSX.Element;
    EditFC: (props: SelectProps) => JSX.Element;
    ValidateFC?: (item: SelectSubtype, options: Options) => boolean;
};
export type RadioType = {
    Subtype: RadioSubtype;
    SubtypeFC: (props: RadioProps) => JSX.Element;
    EditFC: (props: RadioProps) => JSX.Element;
    ValidateFC?: (item: RadioSubtype, options: Options) => boolean;
};
export type CheckboxType = {
    Subtype: CheckboxSubtype;
    SubtypeFC: (props: CheckboxProps) => JSX.Element;
    EditFC: (props: CheckboxProps) => JSX.Element;
    ValidateFC?: (item: CheckboxSubtype, options: Options) => boolean;
};
export type TextType = {
    Subtype: TextSubtype;
    SubtypeFC: (props: TextProps) => JSX.Element;
    EditFC: (props: TextProps) => JSX.Element;
    ValidateFC?: (item: TextSubtype, options: Options) => boolean;
};
export type EmailType = {
    Subtype: EmailSubtype;
    SubtypeFC: (props: EmailProps) => JSX.Element;
    EditFC: (props: EmailProps) => JSX.Element;
    ValidateFC?: (item: EmailSubtype, options: Options) => boolean;
};
export type NumberType = {
    Subtype: NumberSubtype;
    SubtypeFC: (props: NumberProps) => JSX.Element;
    EditFC: (props: NumberProps) => JSX.Element;
    ValidateFC?: (item: NumberSubtype, options: Options) => boolean;
};
export type DateType = {
    Subtype: DateSubtype;
    SubtypeFC: (props: DateProps) => JSX.Element;
    EditFC: (props: DateProps) => JSX.Element;
    ValidateFC?: (item: DateSubtype, options: Options) => boolean;
};
export type BooleanType = {
    Subtype: BooleanSubtype;
    SubtypeFC: (props: BooleanProps) => JSX.Element;
    EditFC: (props: BooleanProps) => JSX.Element;
    ValidateFC?: (item: BooleanSubtype, options: Options) => boolean;
};
export type AutocompleteType = {
    Subtype: AutocompleteSubtype;
    SubtypeFC: (props: AutocompleteProps) => JSX.Element;
    EditFC: (props: AutocompleteProps) => JSX.Element;
    ValidateFC?: (item: AutocompleteSubtype, options: Options) => boolean;
};
export type PhoneType = FieldType & {
    Subtype: PhoneSubtype;
    SubtypeFC: (props: PhoneProps) => JSX.Element;
    EditFC: (props: PhoneProps) => JSX.Element;
    ValidateFC?: (item: PhoneSubtype, options: Options) => boolean;
};
export type AnyFieldType = SelectType | RadioType | CheckboxType | TextType | EmailType | NumberType | DateType | BooleanType | AutocompleteType | PhoneType;
export type BaseItemProps = {
    item: AnyItem;
    items: AnyItem[];
    activeItem?: ActiveType;
    setActiveItem?: Dispatch<SetStateAction<ActiveType>>;
    groupId?: string;
    options: Options;
    errorHandler?: any;
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
export type SelectProps = FieldProps & {
    item: SelectSubtype;
};
export type RadioProps = FieldProps & {
    item: RadioSubtype;
};
export type CheckboxProps = FieldProps & {
    item: CheckboxSubtype;
};
export type TextProps = FieldProps & {
    item: TextSubtype;
};
export type EmailProps = FieldProps & {
    item: EmailSubtype;
};
export type NumberProps = FieldProps & {
    item: NumberSubtype;
};
export type DateProps = FieldProps & {
    item: DateSubtype;
};
export type BooleanProps = FieldProps & {
    item: BooleanSubtype;
};
export type AutocompleteProps = FieldProps & {
    item: AutocompleteSubtype;
};
export type PhoneProps = FieldProps & {
    item: PhoneSubtype;
};
export type ItemProps = BaseItemProps | GroupProps | HiddenProps | HTMLProps | SubmitProps | FieldProps | SelectProps | RadioProps | CheckboxProps | TextProps | EmailProps | NumberProps | DateProps | BooleanProps | AutocompleteProps | PhoneProps;
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
export declare function isNamed(item: AnyItem): item is NamedItem;
