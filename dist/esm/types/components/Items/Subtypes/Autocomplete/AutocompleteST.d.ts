import React from "react";
import { Option, AutocompleteProps } from "../../Items";
export type FilterOptionsFunc = (input?: string) => (Promise<Option[]> | Option[]);
declare const AutocompleteST: ({ item, options }: AutocompleteProps) => React.JSX.Element;
export default AutocompleteST;
