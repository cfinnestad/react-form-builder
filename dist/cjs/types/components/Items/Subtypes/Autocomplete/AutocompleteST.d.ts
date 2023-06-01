import React from "react";
import { FieldProps, Option } from "../../Items";
export type FilterOptionsFunc = (input?: string) => (Promise<Option[]> | Option[]);
declare const AutocompleteST: (fieldProps: FieldProps) => React.JSX.Element;
export default AutocompleteST;
