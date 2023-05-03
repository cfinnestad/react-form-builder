type BaseItem = {
    id: string,
    type: string,
    filter?: GroupFilter,
    ClassName?: string,
    custom?: { [key: string]: any },
}

type Filter = {
    fieldName: string,
    comparison: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'in' | 'not in',
    value: string | number | boolean | string[],
}

type GroupFilter = {
    type: 'and' | 'or' | 'not' | 'xor',
    filters: (GroupFilter | Filter)[],
}

type NamedItem = BaseItem & {
    name: string,
}

type Option = {
    checked: boolean,
    startChecked: boolean,
    fieldName: string,
    value: string,
}

type OptionItem = FieldItem & {
    value?: string | string[],
    options: Option[],
}

type HiddenItem = NamedItem & {
    type: 'Hidden',
    value: string,
}

type FieldItem = NamedItem & {
    required: boolean,
    label: string,
    deprecated: boolean,
    value?: string | number | boolean | Option[],
    placeholder?: string,
}

type GroupItem = NamedItem & {
    type: 'Group',
    maxColumns: number,
    Items: AnyItem[],
}

type SelectItem = OptionItem & {
    type: 'Select',
    multiples: boolean,
}

type RadioItem = OptionItem & {
    type: 'Radio',
    value?: string,
    inLine?: boolean,
}

type CheckboxItem = OptionItem & {
    type: 'Checkbox',
    inLine?: boolean,
}

type TextItem = FieldItem & {
    type: 'Text',
    value?: string,
    minLength?: number,
    maxLength?: number,
}

type EmailItem = FieldItem & {
    type: 'Email',
    value?: string,
    maxLength?: number,
}

type NumberItem = FieldItem & {
    type: 'Number',
    value?: number,
    min?: number,
    max?: number,
}

type DateItem = FieldItem & {
    type: 'Date',
    value?: string,
    minDate?: string,
    minDateOffsetDays?: number,
    maxDate?: string,
    maxDateOffsetDays?: number,
}

type HTMLItem = BaseItem & {
    type: 'HTML',
    content: string,
}

type BooleanItem = BaseItem & {
    type: 'Boolean',
    value: boolean,
}

type AnyItem =
    BaseItem
    | FieldItem
    | GroupItem
    | OptionItem
    | SelectItem
    | HTMLItem
    | TextItem
    | EmailItem
    | NumberItem
    | DateItem
    | HiddenItem
    | CheckboxItem
    | RadioItem
    | BooleanItem

