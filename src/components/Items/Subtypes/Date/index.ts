import dayjs, {Dayjs, ManipulateType} from "dayjs";
import {DateSubtype} from "../../Items";

export {default as DateST} from './DateST'
export {default as DateEdit} from './DateEdit'
export {default as DateValidate} from './DateValidate'

export const defaultFormat = "M/D/YYYY" // the ui date format

export const dateFormat = (value: Dayjs) => {
    return dayjs(value).format('MM/DD/YYYY') // the submission date format
}

export const dateCmp = (val: string | null, cmp: string, which: string) => {
    // @ts-ignore
    return dayjs(val)[which](dayjs(cmp))
}

export const today = () => {
    return dateFormat(dayjs())
}

// returns the item with computed min and max props after applying limits
export const getComputed = (itm: DateSubtype) => {
    const getOffset = (offset: number, unit: ManipulateType, start?: string) => {
        if (!start) start = today()
        if (offset < 0) return dateFormat(dayjs(start).subtract(-offset, unit))
        else return dateFormat(dayjs(start).add(offset, unit))
    }

    const offsetUnits = {
        DateOffsetDays: "d",
        DateOffsetMonths: "M",
        DateOffsetYears: "y"
    }
    const offsets = [
        'min',
        'max',
    ]

    for (const group in offsets) {
        let running = undefined

        // cumulatively apply all offsets from each group
        for (const type in offsetUnits) {
            const key = offsets[group] + type as keyof DateSubtype
            const value = itm[key]
            if (typeof value === 'number') {
                let unit = offsetUnits[type as keyof typeof offsetUnits] as ManipulateType
                running = getOffset(value, unit, running)
            }
        }

        // set min or max if the offsets are narrower
        if (running) {
            if (offsets[group] === "min") {
                if (!itm.minDate || dateCmp(running, itm.minDate, "isAfter")) {
                    itm.minDateComputed = running
                } else if (itm.minDate && dateCmp(running, itm.minDate, "isBefore")) {
                    itm.minDateComputed = itm.minDate
                }

            } else if (offsets[group] === "max") {
                if (!itm.maxDate || dateCmp(running, itm.maxDate, "isBefore")) {
                    itm.maxDateComputed = running
                } else if (itm.maxDate && dateCmp(running, itm.maxDate, "isAfter")) {
                    itm.maxDateComputed = itm.maxDate
                }
            }

        // no offset, set min/max
        } else {
            if (offsets[group] === "min") {
                if (itm.minDate) itm.minDateComputed = itm.minDate
                else delete itm.minDateComputed
            } else if (offsets[group] === "max") {
                if (itm.maxDate) itm.maxDateComputed = itm.maxDate
                else delete itm.maxDateComputed
            }
        }
    }

    return itm
}