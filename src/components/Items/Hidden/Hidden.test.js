import { render, screen } from "@testing-library/react";
import React from "react";
import Hidden from "./Hidden";

let props;

/* 
    For a list of custom matchers within the testing library, see the following docs:
        https://testing-library.com/docs/
        https://testing-library.com/docs/queries/byrole
        https://www.npmjs.com/package/@testing-library/jest-dom
*/

describe("Hidden Form Field Tests", () => {
    beforeEach(() => {
        props = {
            item: {
                deprecated: false,
                id: "hidden1",
                name: "hidden1",
                type: "Hidden",
                value: "hidden"
            },
            options: {
                mode: "render"
            }
        };
    });

    test("Returns a non-empty React fragment", () => {
        const element = Hidden(props);
        expect(element).not.toEqual(<React.Fragment />);
    });

    test("Renders a visible text field when mode is build", () => {
        props.options.mode = "build";
        const element = Hidden(props);
        render(element);
        expect(screen.getByRole("textbox")).toBeVisible();
    });

    test("Renders a non-visible text field when mode is not build", () => {
        const element = Hidden(props);
        render(element);
        expect(screen.getByRole("group", { hidden: true })).not.toBeVisible();
    });

    test("Renders an empty React fragment when marked as a deprecated field", () => {
        props.item.deprecated = true;
        const element = Hidden(props);
        render(element);
        expect(element).toEqual(<React.Fragment />);
    });
});