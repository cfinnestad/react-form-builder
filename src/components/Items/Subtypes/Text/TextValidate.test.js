import TextValidate from "./TextValidate";

let item, options;

describe("Confirm validations for TextValidate", () => {
    beforeEach(() => {
        item = {
            errorText: "",
            id: "",
            maxLength: 10,
            minLength: 5,
            required: false,
            subtype: "Text",
            type: "Field",
            value: ""
        };

        options = {
            getError: (a, b) => { return "Generic error message"; }
        };
    });

    test("Item is not a text field type", () => {
        item = { ...item, subtype: "Radio" };
        const result = TextValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field is required and contains no value", () => {
        item = { ...item, required: true };
        const result = TextValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field has a value that is less than the min length", () => {
        item = { ...item, value: "some" };
        const result = TextValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field has a value that is greater than the max length", () => {
        item = { ...item, value: "Some really long value that far exceeds the length" };
        const result = TextValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field is not required and passes all other validation checks", () => {
        item = { ...item, value: "something" };
        const result = TextValidate(item, options);
        expect(result).toBe(true);
    });

    test("Field is required and passes all other validation checks", () => {
        item = { ...item, value: "something", required: true };
        const result = TextValidate(item, options);
        expect(result).toBe(true);
    });
});