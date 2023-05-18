import React, { FC, Dispatch, SetStateAction } from 'react';

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
    startSelected: boolean;
    label: string;
    value: string;
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
    subtype: AnySubtype;
};
type FieldSubType = {
    subtype: string;
    value?: string | number | boolean | string[];
    custom?: {
        [key: string]: any;
    };
};
type OptionSubtype = FieldSubType & {
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
type TextSubtype = FieldSubType & {
    subtype: 'Text';
    value?: string;
    multiline?: boolean;
    minLength?: number;
    maxLength?: number;
};
type EmailSubtype = FieldSubType & {
    subtype: 'Email';
    value?: string;
    maxLength?: number;
};
type NumberSubtype = FieldSubType & {
    subtype: 'Number';
    value?: number;
    min?: number;
    max?: number;
};
type PhoneSubtype = FieldSubType & {
    subtype: 'Phone';
    value?: string;
};
type DateSubtype = FieldSubType & {
    subtype: 'Date';
    value?: string;
    minDate?: string;
    minDateOffsetDays?: number;
    maxDate?: string;
    maxDateOffsetDays?: number;
};
type BooleanSubtype = FieldSubType & {
    subtype: 'Boolean';
    value: boolean;
};
type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem;
type AnySubtype = FieldSubType | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype;
type ItemType = {
    Item: AnyItem;
    ItemFC: (props: any) => JSX.Element;
    EditFC: (props: any) => JSX.Element;
};
type FieldType = {
    Subtype: AnySubtype;
    SubtypeFC: (props: FieldProps) => JSX.Element;
    EditFC: (props: any) => JSX.Element;
};
type BaseItemProps = {
    item: AnyItem;
    items: AnyItem[];
    options: Options;
};
type FieldProps = BaseItemProps & {
    item: FieldItem;
};

interface ActionProps {
    Items: AnyItem[];
    Options: Options;
}
type ActionFC = FC<ActionProps>;

type AllowedSubtypes = {
    [key: string]: FieldType;
};

type AllowedItems = {
    [key: string]: ItemType;
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

type RenderProps = {
    Items: AnyItem[];
    SetItems?: Dispatch<SetStateAction<AnyItem[]>>;
    Options: RenderOptions;
    Submit: ({ Items }: {
        Items: [] | {};
    }) => JSX.Element;
};
type RenderOptions = {
    AllowedItems?: AllowedItems;
    AdditionalItems?: AllowedItems;
    AllowedSubtypes?: AllowedSubtypes;
    AdditionalSubtypes?: AllowedSubtypes;
    onSave?: (Items: AnyItem[]) => void;
    returnType?: 'object' | 'flatobject' | 'array' | 'flatarray';
};
declare const Render: ({ Items, SetItems, Options, Submit }: RenderProps) => React.JSX.Element;

export { Builder, Render };
