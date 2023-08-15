import React from 'react';
import { Theme } from '@mui/material/styles';
import { SelectProps } from '../../Items';
declare function SelectST({ item, options }: SelectProps): React.JSX.Element;
export declare const getStyles: (label: string, options: readonly string[], theme: Theme) => {
    fontWeight: import("csstype").Property.FontWeight | undefined;
};
export default SelectST;
