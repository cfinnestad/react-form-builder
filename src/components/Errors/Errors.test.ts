import Errors, { GetError } from "./Errors";

describe("Verify Text of Various Error Messages", () => {
    let item = document.createElement("input");
    item.type = "text";

    test("Returns Required error text", () => {
        const errorLine = GetError("required", item, Errors());
        expect(errorLine).toBe("Required");
    });

    test("Returns MaxLength error text", () => {
        const errorLine = GetError("maxLength", item, Errors());
        expect(errorLine).toBe("Must not be longer than 524288 characters");
    });

    test("Returns MinLength error text", () => {
        const errorLine = GetError("minLength", item, Errors());
        expect(errorLine).toBe("Must be at least 0 characters");
    });

    test("Returns Max error text", () => {
        const errorLine = GetError("max", item, Errors());
        expect(errorLine).toBe("Value cannot be more than ");
    });

    test("Returns Min error text", () => {
        const errorLine = GetError("min", item, Errors());
        expect(errorLine).toBe("Value must be at least ");
    });

    test("Returns Email error text", () => {
        const errorLine = GetError("email", item, Errors());
        expect(errorLine).toBe("Invalid email address");
    });

    test("Returns MustCheck error text", () => {
        const errorLine = GetError("mustCheck", item, Errors());
        expect(errorLine).toBe("You are required to check this");
    });

    test("Returns number error text", () => {
        const errorLine = GetError("number", item, Errors());
        expect(errorLine).toBe("Must be a valid number");
    });

    test("Returns InvalidType error text", () => {
        const errorLine = GetError("invalidType", item, Errors());
        expect(errorLine).toBe("Wrong validator used for field subtype: \"{subtype}\"");
    });

    test("Returns InvalidPhone error text", () => {
        const errorLine = GetError("invalidPhone", item, Errors());
        expect(errorLine).toBe("Value must be a valid phone number");
    });

    test("Returns DateRange error text", () => {
        const errorLine = GetError("dateRange", item, Errors());
        expect(errorLine).toBe("Date must be between {minDate} and {maxDate}");
    });

    test("Returns MinDate error text", () => {
        const errorLine = GetError("minDate", item, Errors());
        expect(errorLine).toBe("Date must be {minDate} or after");
    });

    test("Returns MaxDate error text", () => {
        const errorLine = GetError("maxDate", item, Errors());
        expect(errorLine).toBe("Date must be {maxDate} or before");
    });

    test("Returns InvalidDate error text", () => {
        const errorLine = GetError("invalidDate", item, Errors());
        expect(errorLine).toBe("Value must be a valid date in {dateFormat} format");
    });

    test("Returns Undefined error text", () => {
        const errorLine = GetError("thisIsRequired", item, Errors());
        expect(errorLine).toBe("Error thisIsRequired is undefined");
    });
});