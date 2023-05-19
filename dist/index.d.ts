import React, { JSX as JSX$1, FC, Dispatch, SetStateAction } from 'react';

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
type NamedItem = BaseItem & {
    name: string;
};
type Option = {
    selected: boolean;
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
    subtype: 'Select' | 'Radio' | 'Checkbox' | 'Text' | 'Email' | 'Number' | 'Phone' | 'Date' | 'Boolean';
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
    value: boolean;
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

type BuilderOptions = {
    Actions?: ActionFC[];
    ActionsAppend?: FC<ActionProps>[];
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
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
};
type BuilderProps = {
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
};
declare const Render: ({ Items, SetItems, Options, Submit }: RenderProps) => JSX$1.Element;

export { Builder, Render };
