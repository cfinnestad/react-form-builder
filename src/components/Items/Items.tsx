import {Dispatch, FC, JSX, SetStateAction} from "react";
import {ActionProps} from "../Actions";
import {SubmitButtonProps} from "./Submit";
import {Theme} from "@mui/material/styles";
import {ActiveType} from "../Builder/Builder";

export type AllowedSubtypes = {
    [key: string]: AnyFieldType,
}

export type AllowedItems = {
    [key: string]: ItemType | HTMLType | GroupType | FieldType | SubmitType | HiddenType,
}

export type BuildErrors = {
    [key: string]: string,
}

// change isbuild to mode: build, render, edit
export type Options = {
    Actions?: FC<ActionProps>[],
    AllowedItems: AllowedItems,
    AllowedSubtypes: AllowedSubtypes,
    onSave?: (Items: AnyItem[]) => void,
    SetItem: Dispatch<SetStateAction<AnyItem>>,
    setItems: Dispatch<SetStateAction<AnyItem[]>>,
    setModal?: Dispatch<SetStateAction<boolean>>,
    Mode?: String,
    getError: (error: string, item: AnyItem) => string|undefined,
    searchableOptions?: {
        [key: string]: (input?: string) => Promise<Option[]> | Option[]
    },
    submitElements?: {
        [key: string]: (props: SubmitButtonProps) => JSX.Element
    }
    muiTheme: Theme,
    // addItemSection?: (id: string, items: AnyItem[]) => void,
    // deleteItemSection?: (id: string) => void,
    custom?: {[key:string]: any}
}

export type BaseItem = {
    id: string,
    type: string,
    filter?: FilterType,
    ClassName?: string,
    custom?: {[key:string]: any},
}

export type FilterType = {
    comparison: '='|'>'|'>='|'<'|'<='|'in'|'and'|'or'|'not'
}
export type FieldFilter = FilterType & {
    comparison: '='|'>'|'>='|'<'|'<='|'in',
    fieldId: string,
    value?: string|number|boolean|undefined|(string|number|boolean|undefined)[],
}
export const isFieldFilter = (filter: FilterType): filter is FieldFilter => { return ['=','>','>=','<','<=','in'].includes(filter.comparison) }

export type EqFilter = FieldFilter & {
    comparison: '=',
    value?: string|number|boolean|undefined,
}
export const isEqFilter = (filter: FilterType): filter is EqFilter => { return filter.comparison === '=' }

export type GtFilter = FieldFilter & {
    comparison: '>',
    value?: string|number|boolean|undefined,
}
export const isGtFilter = (filter: FilterType): filter is GtFilter => { return filter.comparison === '>' }

export type GteFilter = FieldFilter & {
    comparison: '>=',
    value?: string|number|boolean|undefined,
}
export const isGteFilter = (filter: FilterType): filter is GteFilter => { return filter.comparison === '>=' }

export type LtFilter = FieldFilter & {
    comparison: '<',
    value?: string|number|boolean|undefined,
}
export const isLtFilter = (filter: FilterType): filter is LtFilter => { return filter.comparison === '<' }

export type LteFilter = FieldFilter & {
    comparison: '<=',
    value?: string|number|boolean|undefined,
}
export const isLteFilter = (filter: FilterType): filter is LteFilter => { return filter.comparison === '<=' }

export type InFilter = FieldFilter & {
    comparison: 'in',
    value?: (string|number|boolean|undefined)[],
}
export const isInFilter = (filter: FilterType): filter is InFilter => { return filter.comparison === 'in' }

export type ComparisonFilter = FilterType & {
    comparison: 'and'|'or',
    filters: FilterType[],
}
export const isComparisonFilter = (filter: FilterType): filter is AndFilter => { return ['and','or'].includes(filter.comparison) }

export type AndFilter = ComparisonFilter & {
    comparison: 'and',
}
export const isAndFilter = (filter: FilterType): filter is AndFilter => { return filter.comparison === 'and' }

export type OrFilter = ComparisonFilter & {
    comparison: 'or',
}
export const isOrFilter = (filter: FilterType): filter is OrFilter => { return filter.comparison === 'or' }

export type NotFilter = FilterType & {
    comparison: 'not',
    filter: FilterType,
}
export const isNotFilter = (filter: FilterType): filter is NotFilter => { return filter.comparison === 'not' }

export type NamedItem = BaseItem & {
    name: string,
}

export type Option = {
    selected?: boolean,
    label: string,
    value?: string,
}

export type HiddenItem = NamedItem & {
    type: 'Hidden',
    deprecated?: boolean,
    value: string,
    editable?: boolean,
    backend_only?: boolean
}

export type HTMLItem = BaseItem & {
    type: 'HTML',
    content: string,
}

export type SubmitItem = BaseItem & {
    type: 'Submit',
    submitElementName?: string,
    label?: string
}

export type GroupItem = NamedItem & {
    type: 'Group',
    label?: string,
    deprecated?: boolean,
    backend_only?: boolean,
    items: AnyItem[],
}

export type FieldItem = NamedItem & {
    required?: boolean,
    label?: string,
    deprecated?: boolean,
    backend_only?: boolean,
    editable?:boolean,
    helperText?: string,
    subtype: string,
    custom?: { [key:string]: any }
    value?: string | number | string[] | boolean,
    errorText?: string
}

// export type BaseSubType = {
//     subtype: string,
//     // value?: string|number|boolean|string[],
//
// }

export type OptionSubtype = FieldItem & {
    label: string,
    value?: string|string[],
    searchableOptionsName?: string,
    options: Option[],
}

export type MultiplesSubtype = OptionSubtype & {
    multiples?: boolean,
}

export type SelectSubtype = MultiplesSubtype & {
    subtype: 'Select',
    value?: string | string[],
}

export type RadioSubtype = OptionSubtype & {
    subtype: 'Radio',
    value?: string,
    inLine?: boolean,
}

export type CheckboxSubtype = OptionSubtype & {
    subtype: 'Checkbox',
    value?: string[],
    inLine?: boolean,
}

export type AutocompleteSubtype = OptionSubtype & {
    subtype: 'Autocomplete',
    allowAnyInput?: boolean,
    value?: string
    emptyValueOption?: string
    noOptionsFound?: string
}

export type TextSubtype = FieldItem & {
    label: string,
    subtype: 'Text',
    value?: string,
    multiline?: boolean,
    minRows?: number,
    maxRows?: number,
    minLength?: number,
    maxLength?: number,
}

export type EmailSubtype = FieldItem & {
    label: string,
    subtype: 'Email',
    value?: string,
    maxLength?: number,
}

export type NumberSubtype = FieldItem & {
    label: string,
    subtype: 'Number',
    value?: number,
    min?: number,
    max?: number,
}

export type PhoneSubtype = FieldItem & {
    label: string,
    subtype: 'Phone',
    value?: string,
    placeholder?: string,
}

export type DateSubtype = FieldItem & {
    label: string,
    subtype: 'Date',
    value?: string,
    defaultToday?: boolean,
    minDate?: string,
    maxDate?: string,
    minDateComputed?: string,
    maxDateComputed?: string,
    minDateOffsetDays?: number,
    minDateOffsetMonths?: number,
    minDateOffsetYears?: number,
    maxDateOffsetDays?: number,
    maxDateOffsetMonths?: number,
    maxDateOffsetYears?: number,
    dateFormat?: string,
}

export type BooleanSubtype = FieldItem & {
    subtype: 'Boolean',
    description: string
    value?: boolean,
}

export type AnyItem = BaseItem | FieldItem | GroupItem | HTMLItem | HiddenItem | SelectSubtype | RadioSubtype | CheckboxSubtype | TextSubtype | EmailSubtype | NumberSubtype | DateSubtype | BooleanSubtype | PhoneSubtype | AutocompleteSubtype

export type ItemType = {
    Item: AnyItem,
    ItemFC: (props: ItemProps | HiddenProps | FieldProps | SubmitProps | HTMLProps | GroupProps) => JSX.Element,
    EditFC: (props: ItemProps | HiddenProps | FieldProps | SubmitProps | HTMLProps | GroupProps) => JSX.Element,
}

export type HiddenType = {
    Item: HiddenItem,
    ItemFC: (props: HiddenProps) => JSX.Element,
    EditFC: (props: HiddenProps) => JSX.Element,
}

export type GroupType = {
    Item: GroupItem,
    ItemFC: (props: GroupProps) => JSX.Element,
    EditFC: (props: GroupProps) => JSX.Element,
}

export type SubmitType = {
    Item: SubmitItem,
    ItemFC: (props: SubmitProps) => JSX.Element,
    EditFC: (props: SubmitProps) => JSX.Element,
}

export type HTMLType = {
    Item: HTMLItem,
    ItemFC: (props: HTMLProps) => JSX.Element,
    EditFC: (props: HTMLProps) => JSX.Element,
}

export type FieldType = ItemType & {
    Subtype: FieldItem,
    SubtypeFC: (props: FieldProps) => JSX.Element,
    ItemFC: (props: FieldProps) => JSX.Element,
    EditFC: (props: FieldProps) => JSX.Element,
    ValidateFC?: (item: FieldItem, options: Options) => boolean,
}

export type SelectType = {
    Subtype: SelectSubtype,
    SubtypeFC: (props: SelectProps) => JSX.Element,
    EditFC: (props: SelectProps) => JSX.Element,
    ValidateFC?: (item: SelectSubtype, options: Options) => boolean,
}

export type RadioType = {
    Subtype: RadioSubtype,
    SubtypeFC: (props: RadioProps) => JSX.Element,
    EditFC: (props: RadioProps) => JSX.Element,
    ValidateFC?: (item: RadioSubtype, options: Options) => boolean,
}

export type CheckboxType = {
    Subtype: CheckboxSubtype,
    SubtypeFC: (props: CheckboxProps) => JSX.Element,
    EditFC: (props: CheckboxProps) => JSX.Element,
    ValidateFC?: (item: CheckboxSubtype, options: Options) => boolean,
}

export type TextType = {
    Subtype: TextSubtype,
    SubtypeFC: (props: TextProps) => JSX.Element,
    EditFC: (props: TextProps) => JSX.Element,
    ValidateFC?: (item: TextSubtype, options: Options) => boolean,
}

export type EmailType = {
    Subtype: EmailSubtype,
    SubtypeFC: (props: EmailProps) => JSX.Element,
    EditFC: (props: EmailProps) => JSX.Element,
    ValidateFC?: (item: EmailSubtype, options: Options) => boolean,
}

export type NumberType = {
    Subtype: NumberSubtype,
    SubtypeFC: (props: NumberProps) => JSX.Element,
    EditFC: (props: NumberProps) => JSX.Element,
    ValidateFC?: (item: NumberSubtype, options: Options) => boolean,
}

export type DateType = {
    Subtype: DateSubtype,
    SubtypeFC: (props: DateProps) => JSX.Element,
    EditFC: (props: DateProps) => JSX.Element,
    ValidateFC?: (item: DateSubtype, options: Options) => boolean,
}

export type BooleanType = {
    Subtype: BooleanSubtype,
    SubtypeFC: (props: BooleanProps) => JSX.Element,
    EditFC: (props: BooleanProps) => JSX.Element,
    ValidateFC?: (item: BooleanSubtype, options: Options) => boolean,
}

export type AutocompleteType = {
    Subtype: AutocompleteSubtype,
    SubtypeFC: (props: AutocompleteProps) => JSX.Element,
    EditFC: (props: AutocompleteProps) => JSX.Element,
    ValidateFC?: (item: AutocompleteSubtype, options: Options) => boolean,
}

export type PhoneType = FieldType &{
    Subtype: PhoneSubtype,
    SubtypeFC: (props: PhoneProps) => JSX.Element,
    EditFC: (props: PhoneProps) => JSX.Element,
    ValidateFC?: (item: PhoneSubtype, options: Options) => boolean,
}

export type AnyFieldType = SelectType|RadioType|CheckboxType|TextType|EmailType|NumberType|DateType|BooleanType|AutocompleteType|PhoneType

export type BaseItemProps = {
    item: AnyItem,
    items: AnyItem[],
    activeItem?: ActiveType,
    setActiveItem?: Dispatch<SetStateAction<ActiveType>>,
    groupId?: string,
    options: Options,
    errorHandler?: any //(errors: BuildErrors[], setErrors: Dispatch<SetStateAction<BuildErrors[]>>) => any
}

export type FieldProps = BaseItemProps & { item: FieldItem }
export type GroupProps = BaseItemProps & { item: GroupItem }
export type HTMLProps = BaseItemProps & { item: HTMLItem }
export type SubmitProps = BaseItemProps & { item: SubmitItem }
export type HiddenProps = BaseItemProps & { item: HiddenItem }
export type SelectProps = FieldProps & { item : SelectSubtype }
export type RadioProps = FieldProps & { item : RadioSubtype }
export type CheckboxProps = FieldProps & { item : CheckboxSubtype }
export type TextProps = FieldProps & { item : TextSubtype }
export type EmailProps = FieldProps & { item : EmailSubtype }
export type NumberProps = FieldProps & { item : NumberSubtype }
export type DateProps = FieldProps & { item : DateSubtype }
export type BooleanProps = FieldProps & { item : BooleanSubtype }
export type AutocompleteProps = FieldProps & { item : AutocompleteSubtype }
export type PhoneProps = FieldProps & { item : PhoneSubtype }
export type ItemProps = BaseItemProps
    | GroupProps
    | HiddenProps
    | HTMLProps
    | SubmitProps
    | FieldProps
    | SelectProps
    | RadioProps
    | CheckboxProps
    | TextProps
    | EmailProps
    | NumberProps
    | DateProps
    | BooleanProps
    | AutocompleteProps
    | PhoneProps


export function isGroup(item: AnyItem): item is GroupItem { return item.type === "Group" }
export function isHidden(item: AnyItem): item is HiddenItem { return item.type === "Hidden" }
export function isField(item: AnyItem): item is FieldItem { return item.type === "Field" }
export function isHtml(item: AnyItem): item is HTMLItem { return item.type === "HTML" }
export function isSubmit(item: AnyItem): item is SubmitItem { return item.type === 'Submit' }
export function isSelect(item: AnyItem): item is SelectSubtype { return isField(item) && item.subtype === "Select"}
export function isRadio(item: AnyItem): item is RadioSubtype { return isField(item) && item.subtype === "Radio"}
export function isCheckbox(item: AnyItem): item is CheckboxSubtype { return isField(item) && item.subtype === "Checkbox"}
export function isText(item: AnyItem): item is TextSubtype { return isField(item) && item.subtype === "Text"}
export function isEmail(item: AnyItem): item is EmailSubtype { return isField(item) && item.subtype === "Email"}
export function isNumber(item: AnyItem): item is NumberSubtype { return isField(item) && item.subtype === "Number"}
export function isDate(item: AnyItem): item is DateSubtype { return isField(item) && item.subtype === "Date"}
export function isBoolean(item: AnyItem): item is BooleanSubtype { return isField(item) && item.subtype === "Boolean"}
export function isAutocomplete(item: AnyItem): item is AutocompleteSubtype { return isField(item) && item.subtype === "Autocomplete"}
export function isPhone(item: AnyItem): item is PhoneSubtype { return isField(item) && item.subtype === "Phone"}
export function isOption(item: AnyItem): item is OptionSubtype { return isField(item) && item.hasOwnProperty('options')}
export function isNamed(item: AnyItem): item is NamedItem { return item.hasOwnProperty('name') }
