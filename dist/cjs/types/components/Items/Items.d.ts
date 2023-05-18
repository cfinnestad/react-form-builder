import { Options } from "../Builder/Builder";
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
    value: string | number | boolean | string[];
};
export declare const isFieldFilter: (filter: FilterType) => filter is FieldFilter;
export type EqFilter = FieldFilter & {
    comparison: '=';
    value: string | number | boolean;
};
export declare const isEqFilter: (filter: FilterType) => filter is EqFilter;
export type GtFilter = FieldFilter & {
    comparison: '>';
    value: string | number | boolean;
};
export declare const isGtFilter: (filter: FilterType) => filter is GtFilter;
export type GteFilter = FieldFilter & {
    comparison: '>=';
    value: string | number | boolean;
};
export declare const isGteFilter: (filter: FilterType) => filter is GteFilter;
export type LtFilter = FieldFilter & {
    comparison: '<';
    value: string | number | boolean;
};
export declare const isLtFilter: (filter: FilterType) => filter is LtFilter;
export type LteFilter = FieldFilter & {
    comparison: '<=';
    value: string | number | boolean;
};
export declare const isLteFilter: (filter: FilterType) => filter is LteFilter;
export type InFilter = FieldFilter & {
    comparison: 'in';
    value: string[];
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
    selected: boolean;
    startSelected: boolean;
    label: string;
    value: string;
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
export type PhoneSubtype = FieldSubType & {
    subtype: 'Phone';
    value?: string;
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
export type AnySubtype = FieldSubType | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype;
export type ItemType = {
    Item: AnyItem;
    ItemFC: (props: any) => JSX.Element;
    EditFC: (props: any) => JSX.Element;
};
export type FieldType = {
    Subtype: AnySubtype;
    SubtypeFC: (props: FieldProps) => JSX.Element;
    EditFC: (props: any) => JSX.Element;
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
    Item: GroupItem;
};
export type HTMLProps = BaseItemProps & {
    Item: HTMLItem;
};
export type HiddenProps = BaseItemProps & {
    Item: HiddenItem;
};
export type ItemProps = BaseItemProps | FieldProps | GroupProps | HiddenProps | HTMLProps;
export declare function isGroup(item: AnyItem): item is GroupItem;
export declare function isHidden(item: AnyItem): item is HiddenItem;
export declare function isField(item: AnyItem): item is FieldItem;
export declare function isHtml(item: AnyItem): item is HTMLItem;
export declare function isSelect(subtype: AnySubtype): subtype is SelectSubtype;
export declare function isRadio(subtype: AnySubtype): subtype is RadioSubtype;
export declare function isCheckbox(subtype: AnySubtype): subtype is CheckboxSubtype;
export declare function isText(subtype: AnySubtype): subtype is TextSubtype;
export declare function isEmail(subtype: AnySubtype): subtype is EmailSubtype;
export declare function isNumber(subtype: AnySubtype): subtype is NumberSubtype;
export declare function isDate(subtype: AnySubtype): subtype is DateSubtype;
export declare function isBoolean(subtype: AnySubtype): subtype is BooleanSubtype;
export declare function isPhone(subtype: AnySubtype): subtype is PhoneSubtype;
