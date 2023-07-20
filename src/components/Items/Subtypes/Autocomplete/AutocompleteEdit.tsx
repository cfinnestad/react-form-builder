import React from 'react';
import {FieldProps} from "../../Items";

const AutocompleteEdit = ({item, options}: FieldProps) => {
    const searchableOptions = Object.keys(options.searchableOptions ?? [] as string[])
    return (
        <></>
    );
}

export default AutocompleteEdit;