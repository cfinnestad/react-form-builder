import { FieldType } from "../Items";
export type AllowedSubtypes = {
    [key: string]: FieldType;
};
declare const DefaultSubtypes: () => AllowedSubtypes;
export default DefaultSubtypes;
