import React, { JSX, FC, Dispatch, SetStateAction } from 'react';
import { Theme } from '@mui/material/styles';
import { Accept } from 'react-dropzone';

declare const Transfer: ({ Items, Options }: ActionProps) => React.JSX.Element;

declare const Save: ({ Items, Options }: ActionProps) => React.JSX.Element;

declare const Clear: ({ Options }: ActionProps) => React.JSX.Element;

declare const Preview: ({ Items, Options }: ActionProps) => React.JSX.Element;

type SubmitButtonProps = {
    items: AnyItem[];
    options: Options;
    label?: string;
    color: string;
};
type SubmitButtonElement = (props: SubmitButtonProps) => JSX.Element;

type AllowedSubtypes = {
    [key: string]: AnyFieldType;
};
type AllowedItems = {
    [key: string]: ItemType | HTMLType | GroupType | ListType | FieldType | SubmitType | HiddenType;
};
type BuildErrors = {
    [key: string]: string;
};
type Options = {
    Actions?: FC<ActionProps>[];
    AllowedItems: AllowedItems;
    AllowedSubtypes: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    SetItem: Dispatch<SetStateAction<AnyItem>>;
    setItems: Dispatch<SetStateAction<AnyItem[]>>;
    setModal?: Dispatch<SetStateAction<ModalProps | undefined>>;
    Mode?: string;
    getError: (error: string, item: any) => string | undefined;
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
    submitColors: string[];
    fileTypes: Accept;
};
type BaseItem = {
    id: string;
    type: string;
    filter?: FilterType;
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
    value: string | number | boolean | undefined | (string | number | boolean | undefined)[];
};
declare const isFieldFilter: (filter: FilterType) => filter is FieldFilter;
type EqFilter = FieldFilter & {
    comparison: '=';
    value: string | number | boolean | undefined;
};
declare const isEqFilter: (filter: FilterType) => filter is EqFilter;
type GtFilter = FieldFilter & {
    comparison: '>';
    value: string | number | boolean | undefined;
};
declare const isGtFilter: (filter: FilterType) => filter is GtFilter;
type GteFilter = FieldFilter & {
    comparison: '>=';
    value: string | number | boolean | undefined;
};
declare const isGteFilter: (filter: FilterType) => filter is GteFilter;
type LtFilter = FieldFilter & {
    comparison: '<';
    value: string | number | boolean | undefined;
};
declare const isLtFilter: (filter: FilterType) => filter is LtFilter;
type LteFilter = FieldFilter & {
    comparison: '<=';
    value: string | number | boolean | undefined;
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
declare const isComparisonFilter: (filter: FilterType) => filter is ComparisonFilter;
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
    editable?: boolean;
    backend_only?: boolean;
};
type HTMLItem = BaseItem & {
    type: 'HTML';
    content: string;
};
type SubmitItem = BaseItem & {
    type: 'Submit';
    submitElementName?: string;
    label?: string;
    color?: string;
};
type ListItem = BaseItem & {
    type: 'List';
    label?: string;
    addButton?: string;
    addColor?: string;
    listItems?: InListItem[];
    deprecated?: boolean;
    minListSize: number;
    maxListSize: number;
    baseItem: InListItem;
    errorText?: string;
};
type GroupItem = NamedItem & {
    type: 'Group';
    label?: string;
    deprecated?: boolean;
    backend_only?: boolean;
    items: AnyItem[];
};
type FieldItem = NamedItem & {
    required?: boolean;
    label?: string;
    deprecated?: boolean;
    backend_only?: boolean;
    editable?: boolean;
    helperText?: string;
    subtype: string;
    custom?: {
        [key: string]: any;
    };
    value?: string | number | string[] | boolean | File[];
    errorText?: string;
};
type Files = {
    [key: string]: File[];
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
    emptyValueOption?: string;
    noOptionsFound?: string;
};
type TextSubtype = FieldItem & {
    label?: string;
    subtype: 'Text';
    value?: string;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    minLength?: number;
    maxLength?: number;
};
type FileSubtype = FieldItem & {
    label?: string;
    subtype: 'File';
    value?: File[];
    maxFiles: number;
    maxSizeBytes: number;
    fileTypes?: string[];
    content: string;
};
type EmailSubtype = FieldItem & {
    label?: string;
    subtype: 'Email';
    value?: string;
    maxLength?: number;
};
type NumberSubtype = FieldItem & {
    label?: string;
    subtype: 'Number';
    value?: number;
    min?: number;
    max?: number;
};
type PhoneSubtype = FieldItem & {
    label?: string;
    subtype: 'Phone';
    value?: string;
    placeholder?: string;
};
type DateSubtype = FieldItem & {
    label?: string;
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
    description: string;
    value?: boolean;
};
type AnyItem = BaseItem | FieldItem | GroupItem | ListItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | FileSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype | AutocompleteSubtype;
type InListItem = FieldItem | GroupItem;
type ItemType = {
    Item: AnyItem;
    ItemFC: (props: ItemProps | HiddenProps | FieldProps | SubmitProps | HTMLProps | GroupProps) => JSX.Element;
    EditFC: (props: ItemProps | HiddenProps | FieldProps | SubmitProps | HTMLProps | GroupProps) => JSX.Element;
};
type HiddenType = {
    Item: HiddenItem;
    ItemFC: (props: HiddenProps) => JSX.Element;
    EditFC: (props: HiddenProps) => JSX.Element;
};
type GroupType = {
    Item: GroupItem;
    ItemFC: (props: GroupProps) => JSX.Element;
    EditFC: (props: GroupProps) => JSX.Element;
};
type ListType = {
    Item: ListItem;
    ItemFC: (props: ListProps) => JSX.Element;
    EditFC: (props: ListProps) => JSX.Element;
};
type SubmitType = {
    Item: SubmitItem;
    ItemFC: (props: SubmitProps) => JSX.Element;
    EditFC: (props: SubmitProps) => JSX.Element;
};
type HTMLType = {
    Item: HTMLItem;
    ItemFC: (props: HTMLProps) => JSX.Element;
    EditFC: (props: HTMLProps) => JSX.Element;
};
type FieldType = ItemType & {
    Subtype: FieldItem;
    SubtypeFC: (props: FieldProps) => JSX.Element;
    ItemFC: (props: FieldProps) => JSX.Element;
    EditFC: (props: FieldProps) => JSX.Element;
    ValidateFC?: (item: FieldItem, options: Options) => boolean;
};
type SelectType = FieldType & {
    Subtype: SelectSubtype;
    SubtypeFC: (props: SelectProps) => JSX.Element;
    EditFC: (props: SelectProps) => JSX.Element;
    ValidateFC?: (item: SelectSubtype, options: Options) => boolean;
};
type RadioType = FieldType & {
    Subtype: RadioSubtype;
    SubtypeFC: (props: RadioProps) => JSX.Element;
    EditFC: (props: RadioProps) => JSX.Element;
    ValidateFC?: (item: RadioSubtype, options: Options) => boolean;
};
type CheckboxType = FieldType & {
    Subtype: CheckboxSubtype;
    SubtypeFC: (props: CheckboxProps) => JSX.Element;
    EditFC: (props: CheckboxProps) => JSX.Element;
    ValidateFC?: (item: CheckboxSubtype, options: Options) => boolean;
};
type TextType = FieldType & {
    Subtype: TextSubtype;
    SubtypeFC: (props: TextProps) => JSX.Element;
    EditFC: (props: TextProps) => JSX.Element;
    ValidateFC?: (item: TextSubtype, options: Options) => boolean;
};
type FileType = FieldType & {
    Subtype: FileSubtype;
    SubtypeFC: (props: FileProps) => JSX.Element;
    EditFC: (props: FileProps) => JSX.Element;
    ValidateFC?: (item: FileSubtype, options: Options) => boolean;
};
type EmailType = FieldType & {
    Subtype: EmailSubtype;
    SubtypeFC: (props: EmailProps) => JSX.Element;
    EditFC: (props: EmailProps) => JSX.Element;
    ValidateFC?: (item: EmailSubtype, options: Options) => boolean;
};
type NumberType = FieldType & {
    Subtype: NumberSubtype;
    SubtypeFC: (props: NumberProps) => JSX.Element;
    EditFC: (props: NumberProps) => JSX.Element;
    ValidateFC?: (item: NumberSubtype, options: Options) => boolean;
};
type DateType = FieldType & {
    Subtype: DateSubtype;
    SubtypeFC: (props: DateProps) => JSX.Element;
    EditFC: (props: DateProps) => JSX.Element;
    ValidateFC?: (item: DateSubtype, options: Options) => boolean;
};
type BooleanType = FieldType & {
    Subtype: BooleanSubtype;
    SubtypeFC: (props: BooleanProps) => JSX.Element;
    EditFC: (props: BooleanProps) => JSX.Element;
    ValidateFC?: (item: BooleanSubtype, options: Options) => boolean;
};
type AutocompleteType = FieldType & {
    Subtype: AutocompleteSubtype;
    SubtypeFC: (props: AutocompleteProps) => JSX.Element;
    EditFC: (props: AutocompleteProps) => JSX.Element;
    ValidateFC?: (item: AutocompleteSubtype, options: Options) => boolean;
};
type PhoneType = FieldType & {
    Subtype: PhoneSubtype;
    SubtypeFC: (props: PhoneProps) => JSX.Element;
    EditFC: (props: PhoneProps) => JSX.Element;
    ValidateFC?: (item: PhoneSubtype, options: Options) => boolean;
};
type AnyFieldType = SelectType | RadioType | CheckboxType | TextType | FileType | EmailType | NumberType | DateType | BooleanType | AutocompleteType | PhoneType;
type BaseItemProps = {
    item: AnyItem;
    items: AnyItem[];
    activeItem?: ActiveType;
    setActiveItem?: Dispatch<SetStateAction<ActiveType>>;
    groupId?: string;
    options: Options;
    errorHandler?: any;
};
type FieldProps = BaseItemProps & {
    item: FieldItem;
};
type GroupProps = BaseItemProps & {
    item: GroupItem;
};
type ListProps = BaseItemProps & {
    item: ListItem;
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
type FileProps = FieldProps & {
    item: FileSubtype;
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
type ListItemProps = ItemProps & {
    index: number;
    parentItem: ListItem;
};
type ItemProps = BaseItemProps | GroupProps | ListProps | HiddenProps | HTMLProps | SubmitProps | FieldProps | SelectProps | RadioProps | CheckboxProps | TextProps | EmailProps | NumberProps | DateProps | BooleanProps | AutocompleteProps | PhoneProps;
declare function isGroup(item: AnyItem): item is GroupItem;
declare function isHidden(item: AnyItem): item is HiddenItem;
declare function isField(item: AnyItem): item is FieldItem;
declare function isHtml(item: AnyItem): item is HTMLItem;
declare function isSubmit(item: AnyItem): item is SubmitItem;
declare function isSelect(item: AnyItem): item is SelectSubtype;
declare function isRadio(item: AnyItem): item is RadioSubtype;
declare function isCheckbox(item: AnyItem): item is CheckboxSubtype;
declare function isText(item: AnyItem): item is TextSubtype;
declare function isFile(item: AnyItem): item is FileSubtype;
declare function isEmail(item: AnyItem): item is EmailSubtype;
declare function isNumber(item: AnyItem): item is NumberSubtype;
declare function isDate(item: AnyItem): item is DateSubtype;
declare function isBoolean(item: AnyItem): item is BooleanSubtype;
declare function isAutocomplete(item: AnyItem): item is AutocompleteSubtype;
declare function isPhone(item: AnyItem): item is PhoneSubtype;
declare function isOption(item: AnyItem): item is OptionSubtype;
declare function isNamed(item: AnyItem): item is NamedItem;
declare function isList(item: AnyItem): item is ListItem;
declare function isListItem(item: AnyItem): item is InListItem;
declare function hasFiles(items: AnyItem[], allItems?: AnyItem[]): boolean;
declare function itemsCloneDeep(items: AnyItem[]): AnyItem[];
declare function itemCloneDeep(item: AnyItem): AnyItem;

declare const ValidateFields: (items: AnyItem[], options: Options, allItems?: AnyItem[]) => boolean;

declare const GetNamedItem: (id: string | number, items: AnyItem[]) => FieldItem | HiddenItem | undefined;

declare const UpdateItemInItems: (item: AnyItem, items: AnyItem[], prefix?: string) => void;

type validateNameChangeResponse = {
    validName: string;
    changeErrors: string[];
};
declare const getSiblingItems: (item: AnyItem, items: AnyItem[]) => AnyItem[];
declare const validateNameChange: (item: AnyItem, items: AnyItem[], newName?: string) => validateNameChangeResponse;

interface ActionProps {
    Items: AnyItem[];
    Options: Options;
}
type ActionFC = FC<ActionProps>;

type ErrorType = {
    [key: string]: string;
};
declare const Errors: () => ErrorType;

type CollectionType = {
    name: string;
    items: AnyItem[];
};
type ActiveType = {
    id: string | undefined;
    groupId: string;
};
type BuilderUseOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    Errors?: ErrorType;
    collections?: CollectionType[];
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[];
    };
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element;
    };
    muiTheme?: Theme;
    mode: string;
    custom?: {
        [key: string]: any;
    };
    submitColors?: string[];
    fileTypes?: Accept;
};
type ModalProps = {
    item: AnyItem;
    inList?: boolean;
};
type BuilderProps = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    Items?: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options?: BuilderUseOptions;
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
    mode?: "build" | "edit" | "render";
    submitColors?: string[];
    fileTypes?: Accept;
};
declare const Render: ({ Items, SetItems, Options }: RenderProps) => JSX.Element;
declare const RenderedObject: (items: AnyItem[], files?: Files, allItems?: AnyItem[]) => {};
declare const RenderedFlatObject: (items: AnyItem[], files?: Files, allItems?: AnyItem[]) => {};
declare const RenderedArray: (items: AnyItem[], files?: Files, allItems?: AnyItem[]) => {} | [];
declare const RenderedFlatArray: (items: AnyItem[], files?: Files, allItems?: AnyItem[]) => object[];

export { AllowedItems, AllowedSubtypes, AndFilter, AnyFieldType, AnyItem, AutocompleteProps, AutocompleteSubtype, AutocompleteType, BaseItem, BaseItemProps, BooleanProps, BooleanSubtype, BooleanType, BuildErrors, Builder, BuilderProps, BuilderUseOptions, CheckboxProps, CheckboxSubtype, CheckboxType, Clear, ComparisonFilter, DateProps, DateSubtype, DateType, EmailProps, EmailSubtype, EmailType, EqFilter, ErrorType, Errors, FieldFilter, FieldItem, FieldProps, FieldType, FileProps, FileSubtype, FileType, Files, FilterType, GetNamedItem as GetItem, GroupItem, GroupProps, GroupType, GtFilter, GteFilter, HTMLItem, HTMLProps, HTMLType, HiddenItem, HiddenProps, HiddenType, InFilter, InListItem, ItemProps, ItemType, ListItem, ListItemProps, ListProps, ListType, LtFilter, LteFilter, MultiplesSubtype, NamedItem, NotFilter, NumberProps, NumberSubtype, NumberType, Option, OptionSubtype, Options, OrFilter, PhoneProps, PhoneSubtype, PhoneType, Preview, RadioProps, RadioSubtype, RadioType, Render, RenderOptions, RenderProps, RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject, Save, SelectProps, SelectSubtype, SelectType, UpdateItemInItems as SetItem, SubmitButtonElement, SubmitButtonProps, SubmitItem, SubmitProps, SubmitType, TextProps, TextSubtype, TextType, Transfer, ValidateFields, getSiblingItems, hasFiles, isAndFilter, isAutocomplete, isBoolean, isCheckbox, isComparisonFilter, isDate, isEmail, isEqFilter, isField, isFieldFilter, isFile, isGroup, isGtFilter, isGteFilter, isHidden, isHtml, isInFilter, isList, isListItem, isLtFilter, isLteFilter, isNamed, isNotFilter, isNumber, isOption, isOrFilter, isPhone, isRadio, isSelect, isSubmit, isText, itemCloneDeep, itemsCloneDeep, validateNameChange };
