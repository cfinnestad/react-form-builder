import React from 'react';
import {AutocompleteProps} from "../../Items";

const AutocompleteEdit = ({item, options}: AutocompleteProps) => {
    const searchableOptions = Object.keys(options.searchableOptions ?? [] as string[])
    return (
        <></>
    );
}

export default AutocompleteEdit;