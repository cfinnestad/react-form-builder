import dayjs, {Dayjs} from "dayjs";

export {default as DateST} from './DateST'
export {default as DateEdit} from './DateEdit'
export {default as DateValidate} from './DateValidate'

export const dateFormat = (value: Dayjs) => {
    return dayjs(value).format('MM/DD/YYYY')
}

export const dateCmp = (val: string | null, cmp: string, which: string) => {
    return dayjs(val)[which](dayjs(cmp))
}
