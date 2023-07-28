import React, { ChangeEvent, useState } from "react";
import { HiddenProps } from "../Items";
import { TextField } from "@mui/material";

const HiddenEdit = ({ item, options }: HiddenProps) => {
    const [value, setValue] = useState(item.value || "");
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        const itm = { ...item, value: val };
        setValue(val);
        options.SetItem(itm);
    }

    return (
        <TextField
            label="Hidden Value"
            onChange={handleChange}
            type="text"
            value={value}
            variant="outlined"
        />
    );
}

export default HiddenEdit;