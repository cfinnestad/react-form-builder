import React from "react";
import {FormHelperText, Typography} from "@mui/material";

export type ShowErrorsProps = {
    errors: string[]
}
const ShowErrors = ({errors}:ShowErrorsProps) => {
    return <>
        {
            errors.map((error, index) =>
                <FormHelperText error={true}>
                    {error}
                </FormHelperText>
            )
        }
    </>
}

export default ShowErrors