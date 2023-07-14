import React from 'react';
import {FieldProps, isSelect} from "../../Items";
import Options, {SelectedType} from "../../../Options/Options";

const SelectEdit = ({item, options}: FieldProps) => {
    if (!isSelect(item)) return <></>

    return <>
        <Options useMultiples={true} item={item} options={options} selectedType={item.multiples ? SelectedType.Multiple : SelectedType.Single}/>
    </>
}

export default SelectEdit;