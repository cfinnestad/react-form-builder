import RadioValidate from "./RadioValidate";

let item, options;

describe("Confirm validations for RadioValidate", () => {
    beforeEach(() => {
        item = {
            errorText: "",
            required: false,
            subtype: "Radio",
            type: "Field",
            options: []
        };

        options = {
            getError: (a, b) => { return "Generic error message"; }
        };
    });

    test("Item is not a radio field type", () => {
        item = { ...item, subtype: "Text" };
        const result = RadioValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field is required and contains no value", () => {
        item = { ...item, required: true };
        const result = RadioValidate(item, options);
        expect(result).toBe(false);
    });

    test("Field is not required and passes all other validation checks", () => {
        item = { ...item, options: ["Some Value"] };
        const result = RadioValidate(item, options);
        expect(result).toBe(true);
    });
});