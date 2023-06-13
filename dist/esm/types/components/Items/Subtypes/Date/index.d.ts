import { Dayjs } from "dayjs";
export { default as DateST } from './DateST';
export { default as DateEdit } from './DateEdit';
export { default as DateValidate } from './DateValidate';
export declare const dateFormat: (value: Dayjs) => string;
export declare const dateCmp: (val: string | null, cmp: string, which: string) => any;
