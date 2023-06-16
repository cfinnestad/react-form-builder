import {RenderedArray, RenderedFlatArray, RenderedFlatObject, RenderedObject, SubmitProps} from "./Render";
import {Button, ButtonGroup} from "@mui/material";
import ValidateFields from "../Items/ValidateFields";
import React from "react";
import {AnyItem, isField, isGroup} from "../Items";
import { Options } from '../Builder';

export const Submit = ({ items, options }: SubmitProps) => {
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
