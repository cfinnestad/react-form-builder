import { JSX } from "react";
import { FieldProps, Option } from "../../Items";
export type FilterOptionsFunc = (input?: string) => (Promise<Option[]> | Option[]);
declare const AutocompleteST: (fieldProps: FieldProps) => JSX.Element;
export default AutocompleteST;
