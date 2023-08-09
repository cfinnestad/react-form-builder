import {AnyItem} from "../Items";

export type ErrorType = {
    [key: string]: string,
}

const Errors = (): ErrorType => {
    return {
        required: 'Required',
        maxLength: 'Must not be longer than {maxLength} characters',
        minLength: 'Must be at least {minLength} characters',
        min: 'Value must be at least {min}',
        max: 'Value cannot be more than {max}',
        email: 'Invalid email address',
        mustCheck: 'You are required to check this',
        number: 'Must be a valid number',
        invalidType: 'Wrong validator used for field subtype: "{subtype}"',
        invalidPhone: 'Value must be a valid phone number',
        dateRange: 'Date must be between {minDate} and {maxDate}',
        minDate: 'Date must be {minDate} or after',
        maxDate: 'Date must be {maxDate} or before',
        invalidDate: 'Value must be a valid date in {dateFormat} format',
    }
}

export const GetError = (error: string, item: AnyItem, errors: ErrorType): string|undefined => {
    let result = errors[error] ?? "Error " + error + " is undefined";
    for (const prop in item) {
        // @ts-ignore
        result = result.replace('{' + prop + '}', item[prop])
    }
    return (result === '') ? undefined : result
}

export default Errors