import React, {useEffect, useRef} from "react";
import {FieldProps} from "../Items";
import {Box} from "@mui/material";

const Field = (fieldProps: FieldProps) => {
    if(fieldProps.options.Mode !== "build" && fieldProps.options.Mode !== "edit") {
        if (fieldProps.item.deprecated || fieldProps.item.backend_only) return <></>
    }

    const divref = useRef<HTMLDivElement>(null);


    useEffect(() => {
        fieldProps.options.eventList.forEach((eventItem) => {
            const eventHandler = (e: Event) => {
                eventItem.callback(e.type, fieldProps.item.name)
            }

            if (divref.current) {
                divref.current.addEventListener(eventItem.eventName, eventHandler);
            }

            return () => {
                if (divref.current) {
                    divref.current.removeEventListener(eventItem.eventName, eventHandler)
                }
            }
        })
    })

    return <Box ref={divref} component="div" sx={{ flexGrow: 1 }} marginTop={1.75} marginBottom={1}>
        { fieldProps.options.AllowedSubtypes[fieldProps.item.subtype].SubtypeFC(fieldProps) }
    </Box>
}

export default Field