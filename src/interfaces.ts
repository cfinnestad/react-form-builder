import {Dispatch, SetStateAction} from "react";

interface Item {
    type: string,
    filters: Filter[]
}


interface Filter {
    fieldName: string,
    value: string|number|string[]
}

interface GroupItem {
    maxColumns: number
}

interface DisplayItem extends Item {
    content: string
}

interface FieldItem extends Item {
    required: boolean
    label: boolean
    deprecated: boolean
    name: string
    value: string|number|Option[]
}

interface Option {
    name: string,
    value: string,
}

