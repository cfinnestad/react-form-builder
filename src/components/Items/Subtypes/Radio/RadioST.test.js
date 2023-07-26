import { render, screen } from '@testing-library/react';
import React from "react";
import RadioST from "./RadioST";

let props;

/* 
    For a list of custom matchers within the testing library, see the following docs:
        https://testing-library.com/docs/
        https://testing-library.com/docs/queries/byrole
        https://www.npmjs.com/package/@testing-library/jest-dom
*/

describe("RadioST", () => {
    beforeEach(() => {
        props = {
            item: {
                helperText: "Helper text to describe your field",
                id: "radio1",
                inLine: false,
                label: "Radio",
                name: "radio1",
                options: [
                    { label: "Option 1" },
                    { label: "Option 2", selected: true },
                    { label: "Option 3" }
                ],
                required: false,
                subtype: "Radio",
                type: "Field"
            }
        };
    });

    test("Returns a non-empty React fragment", () => {
        const element = RadioST(props);
        expect(element).not.toEqual(<React.Fragment />);
    });

    test("Renders a radio button group", () => {
        const element = RadioST(props);
        render(element);
        expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    test("Required field provides a visual indicator", () => {
        props.item.required = true;
        const element = RadioST(props);
        render(element);
        expect(screen.getByRole("label")).toHaveClass("Mui-required");
    });

    test("Renders helper text", () => {
        const element = RadioST(props);
        render(element);
        expect(screen.getByText("Helper text to describe your field")).toBeInTheDocument();
    });

    test("Renders a label", () => {
        const element = RadioST(props);
        render(element);
        expect(screen.getByRole("label")).toHaveTextContent(/^Radio$/i);
    });

    test("Renders choices inline", () => {
        props.item.inLine = true;
        const element = RadioST(props);
        render(element);
        expect(screen.getByRole("radiogroup")).toHaveClass("MuiFormGroup-row");
    });

    test("Renders choices vertically", () => {
        const element = RadioST(props);
        render(element);
        expect(screen.getByRole("radiogroup")).not.toHaveClass("MuiFormGroup-row");
    });

    test("Renders all choices in the document", () => {
        const element = RadioST(props);
        render(element);
        const radios = screen.getAllByRole("radio");

        radios.forEach(radio => expect(radio).toBeInTheDocument());
    });

    test("Default choice is selected", () => {
        const element = RadioST(props);
        render(element);
        expect(screen.getByRole("radio", { checked: true })).toBeInTheDocument();
    })

    /*
        test("Working base for formulating tests; use this to inspect the rendered element for testing clues", () => {
            props.item.required = true;
            const element = RadioST(props);
            render(element);
            expect(screen.getAllByText("some")).toBe(<React.Fragment />);
        });
    */
});