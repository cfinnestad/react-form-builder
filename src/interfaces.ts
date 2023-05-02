interface Item {
    type: string,
    filter?: GroupFilter | Filter,
    ClassName?: string,
    [key:string]: any
}

interface Filter {
    fieldName: string,
    comparison: '='|'!='|'>'|'>='|'<'|'<='|'in'|'not in'
    value: string|number|boolean|string[]
}

interface GroupFilter {
    type: 'and'|'or'|'not'|'xor'
}

interface NamedItem extends Item {
    name: string,
}
interface GroupItem extends NamedItem{
    maxColumns: number,
    Items: Item[],
}

interface Option {
    fieldName: string,
    value: string,
}
interface OptionItem extends FieldItem {
    options: Option[]
}

interface HiddenItem extends NamedItem {
    value: string
}

interface DisplayItem extends Item {
    content: string,
}

interface FieldItem extends Item {
    required: boolean
    label: boolean
    deprecated: boolean
    value: string|number|Option[]
    placeholder?: string
}

interface Option {
    name: string,
    value: string,
}

interface SelectItem extends OptionItem {
    multiples: boolean
}

