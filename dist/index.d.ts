import { JSX, FC, Dispatch, SetStateAction } from 'react';
import { Theme } from '@mui/material/styles';

type SubmitButtonProps = {
    items: AnyItem[];
    options: Options;
    label?: string;
};
type SubmitButtonElement = (props: SubmitButtonProps) => JSX.Element;

type AllowedSubtypes = {
    [key: string]: FieldType;
};
type AllowedItems = {
    [key: string]: ItemType;
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
type SubmitItem = BaseItem & {
    type: 'Submit';
    submitElementName?: string;
    label?: string;
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
    searchableOptionsName?: string;
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
type AutocompleteSubtype = OptionSubtype & {
    subtype: 'Autocomplete';
    allowAnyInput?: boolean;
    value?: string;
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
    placeholder?: string;
};
type DateSubtype = FieldItem & {
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
type BooleanSubtype = FieldItem & {
    subtype: 'Boolean';
    value?: boolean;
};
type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype | AutocompleteSubtype;
type ItemType = {
    Item: AnyItem;
    ItemFC: (props: ItemProps) => JSX.Element;
    EditFC: (props: ItemProps) => JSX.Element;
};
type FieldType = {
    Subtype: FieldItem;
    SubtypeFC: (props: FieldProps) => JSX.Element;
    EditFC: (props: FieldProps) => JSX.Element;
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
type SubmitProps = BaseItemProps & {
    item: SubmitItem;
};
type HiddenProps = BaseItemProps & {
    item: HiddenItem;
};
type ItemProps = BaseItemProps | GroupProps | HiddenProps | HTMLProps | SubmitProps | FieldProps;
declare function isGroup(item: AnyItem): item is GroupItem;
declare function isHidden(item: AnyItem): item is HiddenItem;
declare function isField(item: AnyItem): item is FieldItem;
declare function isHtml(item: AnyItem): item is HTMLItem;
declare function isSubmit(item: AnyItem): item is SubmitItem;
declare function isSelect(item: AnyItem): item is SelectSubtype;
declare function isRadio(item: AnyItem): item is RadioSubtype;
declare function isCheckbox(item: AnyItem): item is CheckboxSubtype;
declare function isText(item: AnyItem): item is TextSubtype;
declare function isEmail(item: AnyItem): item is EmailSubtype;
declare function isNumber(item: AnyItem): item is NumberSubtype;
declare function isDate(item: AnyItem): item is DateSubtype;
declare function isBoolean(item: AnyItem): item is BooleanSubtype;
declare function isAutocomplete(item: AnyItem): item is AutocompleteSubtype;
declare function isPhone(item: AnyItem): item is PhoneSubtype;
declare function isOption(item: AnyItem): item is OptionSubtype;

declare const ValidateFields: (items: AnyItem[], options: Options) => boolean;

declare const GetItem: (id: string | number, items: AnyItem[]) => FieldItem | HiddenItem | undefined;

declare const SetItem: (item: AnyItem, items: AnyItem[]) => AnyItem[];

interface ActionProps {
    Items: AnyItem[];
    Options: Options;
}
type ActionFC = FC<ActionProps>;

type ErrorType = {
    [key: string]: string;
};
declare const Errors: () => ErrorType;

type BuilderOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element;
    };
    muiTheme?: Theme;
};
type BuilderProps = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    Items?: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options?: BuilderOptions;
    custom?: {
        [key: string]: any;
    };
};
declare const Builder: ({ Items, SetItems, Options }: BuilderProps) => JSX.Element;

type RenderProps = {
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
};
type RenderOptions = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element;
    };
    muiTheme?: Theme;
    custom?: {
        [key: string]: any;
    };
};
declare const Render: ({ Items, SetItems, Options }: RenderProps) => JSX.Element;
declare const RenderedObject: (items: AnyItem[]) => {};
declare const RenderedFlatObject: (items: AnyItem[]) => {};
declare const RenderedArray: (items: AnyItem[]) => {} | [];
declare const RenderedFlatArray: (items: AnyItem[]) => object[];

export { AllowedItems, AllowedSubtypes, AndFilter, AnyItem, AutocompleteSubtype, BaseItem, BaseItemProps, BooleanSubtype, Builder, BuilderOptions, BuilderProps, CheckboxSubtype, DateSubtype, EmailSubtype, EqFilter, ErrorType, Errors, FieldFilter, FieldItem, FieldProps, FieldType, FilterType, GetItem, GroupItem, GroupProps, GtFilter, GteFilter, HTMLItem, HTMLProps, HiddenItem, HiddenProps, InFilter, ItemProps, ItemType, LtFilter, LteFilter, NamedItem, NotFilter, NumberSubtype, Option, OptionSubtype, Options, OrFilter, PhoneSubtype, RadioSubtype, Render, RenderOptions, RenderProps, RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject, SelectSubtype, SetItem, SubmitButtonElement, SubmitButtonProps, SubmitItem, SubmitProps, TextSubtype, ValidateFields, isAndFilter, isAutocomplete, isBoolean, isCheckbox, isDate, isEmail, isEqFilter, isField, isFieldFilter, isGroup, isGtFilter, isGteFilter, isHidden, isHtml, isInFilter, isLtFilter, isLteFilter, isNotFilter, isNumber, isOption, isOrFilter, isPhone, isRadio, isSelect, isSubmit, isText, validateItem };
