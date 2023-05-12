import { Options } from "../Builder/Builder";
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
    selected: boolean;
    startSelected: boolean;
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
