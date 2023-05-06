import React from "react";
import {Typography} from "@mui/material";

type ShowErrorsProps = {
    errors: string[]
}
const ShowErrors = ({errors}:ShowErrorsProps) => {
    return <>
        {
            errors.map((error, index) => <Typography key={index} variant='caption' display='block' sx={{ color:'red' }}></Typography> )
        }
    </>
}

export default ShowErrors