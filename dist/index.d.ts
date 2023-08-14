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
    value?: string | number | boolean | undefined | (string | number | boolean | undefined)[];
};
declare const isFieldFilter: (filter: FilterType) => filter is FieldFilter;
type EqFilter = FieldFilter & {
    comparison: '=';
    value?: string | number | boolean | undefined;
};
declare const isEqFilter: (filter: FilterType) => filter is EqFilter;
type GtFilter = FieldFilter & {
    comparison: '>';
    value?: string | number | boolean | undefined;
};
declare const isGtFilter: (filter: FilterType) => filter is GtFilter;
type GteFilter = FieldFilter & {
    comparison: '>=';
    value?: string | number | boolean | undefined;
};
declare const isGteFilter: (filter: FilterType) => filter is GteFilter;
type LtFilter = FieldFilter & {
    comparison: '<';
    value?: string | number | boolean | undefined;
};
declare const isLtFilter: (filter: FilterType) => filter is LtFilter;
type LteFilter = FieldFilter & {
    comparison: '<=';
    value?: string | number | boolean | undefined;
};
declare const isLteFilter: (filter: FilterType) => filter is LteFilter;
type InFilter = FieldFilter & {
    comparison: 'in';
    value?: (string | number | boolean | undefined)[];
};
declare const isInFilter: (filter: FilterType) => filter is InFilter;
type ComparisonFilter = FilterType & {
    comparison: 'and' | 'or';
    filters: FilterType[];
};
declare const isComparisonFilter: (filter: FilterType) => filter is AndFilter;
type AndFilter = ComparisonFilter & {
    comparison: 'and';
};
declare const isAndFilter: (filter: FilterType) => filter is AndFilter;
type OrFilter = ComparisonFilter & {
    comparison: 'or';
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
type MultiplesSubtype = OptionSubtype & {
    multiples?: boolean;
};
type SelectSubtype = MultiplesSubtype & {
    subtype: 'Select';
    value?: string | string[];
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
type SelectProps = FieldProps & {
    item: SelectSubtype;
};
type RadioProps = FieldProps & {
    item: RadioSubtype;
};
type CheckboxProps = FieldProps & {
    item: CheckboxSubtype;
};
type TextProps = FieldProps & {
    item: TextSubtype;
};
type EmailProps = FieldProps & {
    item: EmailSubtype;
};
type NumberProps = FieldProps & {
    item: NumberSubtype;
};
type DateProps = FieldProps & {
    item: DateSubtype;
};
type BooleanProps = FieldProps & {
    item: BooleanSubtype;
};
type AutocompleteProps = FieldProps & {
    item: AutocompleteSubtype;
};
type PhoneProps = FieldProps & {
    item: PhoneSubtype;
};
type ItemProps = BaseItemProps | GroupProps | HiddenProps | HTMLProps | SubmitProps | FieldProps | SelectProps | RadioProps | CheckboxProps | TextProps | EmailProps | NumberProps | DateProps | BooleanProps | AutocompleteProps | PhoneProps;
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
declare function isNamed(item: AnyItem): item is NamedItem;

declare const ValidateFields: (items: AnyItem[], options: Options) => boolean;

declare const GetItem: (id: string | number, items: AnyItem[]) => FieldItem | HiddenItem | undefined;

declare const UpdateItemInItems: (item: AnyItem, items: AnyItem[], prefix?: string) => AnyItem[];

type validateNameChangeResponse = {
    validName?: string;
    errors?: string[];
};
declare const getSiblingItems: (item: AnyItem, items: AnyItem[]) => AnyItem[];
declare const validateNameChange: (props: ItemProps, newName?: string) => validateNameChangeResponse;

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
    custom?: {
        [key: string]: any;
    };
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

export { AllowedItems, AllowedSubtypes, AndFilter, AnyItem, AutocompleteProps, AutocompleteSubtype, BaseItem, BaseItemProps, BooleanProps, BooleanSubtype, Builder, BuilderOptions, BuilderProps, CheckboxProps, CheckboxSubtype, ComparisonFilter, DateProps, DateSubtype, EmailProps, EmailSubtype, EqFilter, ErrorType, Errors, FieldFilter, FieldItem, FieldProps, FieldType, FilterType, GetItem, GroupItem, GroupProps, GtFilter, GteFilter, HTMLItem, HTMLProps, HiddenItem, HiddenProps, InFilter, ItemProps, ItemType, LtFilter, LteFilter, MultiplesSubtype, NamedItem, NotFilter, NumberProps, NumberSubtype, Option, OptionSubtype, Options, OrFilter, PhoneProps, PhoneSubtype, RadioProps, RadioSubtype, Render, RenderOptions, RenderProps, RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject, SelectProps, SelectSubtype, UpdateItemInItems as SetItem, SubmitButtonElement, SubmitButtonProps, SubmitItem, SubmitProps, TextProps, TextSubtype, ValidateFields, getSiblingItems, isAndFilter, isAutocomplete, isBoolean, isCheckbox, isComparisonFilter, isDate, isEmail, isEqFilter, isField, isFieldFilter, isGroup, isGtFilter, isGteFilter, isHidden, isHtml, isInFilter, isLtFilter, isLteFilter, isNamed, isNotFilter, isNumber, isOption, isOrFilter, isPhone, isRadio, isSelect, isSubmit, isText, validateItem, validateNameChange };
