import React from "react";
type FilterMultipleInputsProps = {
    values: (string | number | boolean | undefined)[];
    setValues: (values: (string | number | boolean | undefined)[]) => void;
    type: string;
    label?: string;
};
declare const FilterMultipleInputs: ({ values, setValues, type, label }: FilterMultipleInputsProps) => React.JSX.Element;
export default FilterMultipleInputs;
