import {RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject} from "./Render";
import {Button, ButtonGroup} from "@mui/material";
import ValidateFields from "../Items/ValidateFields";
import React from "react";
import {SubmitButtonProps} from "../Items";

export const Submit = ({ items, options }: SubmitButtonProps) => {
    return <ButtonGroup>
        <Button onClick={() => {
            if(ValidateFields(items, options)) {
                alert(JSON.stringify(RenderedObject(items), null, 4))
            }
        }}>
            SUBMIT AS OBJECT
        </Button>
        <Button onClick={() => {
            if(ValidateFields(items, options)) {
                alert(JSON.stringify(RenderedFlatObject(items), null, 4))
            }
        }}>
            SUBMIT AS FLAT OBJECT
        </Button>
        <Button onClick={() => {
            if(ValidateFields(items, options)) {
                alert(JSON.stringify(RenderedArray(items), null, 4))
            }
        }}>
            SUBMIT AS ARRAY
        </Button>
        <Button onClick={() => {
            if(ValidateFields(items, options)) {
                alert(JSON.stringify(RenderedFlatArray(items), null, 4))
            }
        }}>
            SUBMIT AS FLAT ARRAY
        </Button>
    </ButtonGroup>
}
