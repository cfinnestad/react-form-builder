import {BuildErrors} from "../Items";
import {Dispatch, SetStateAction} from "react";

/*
export type ErrorHandlerType = {
    setError: (which: string, msg: string | undefined) => void,
    clearError: (which: string) => void,
    hasError: (which: string) => boolean,
    hasSharedError: (which: string) => boolean,
    hasAnyError: () => boolean,
    getError: (which: string) => string[],
    fieldToTitle: (which: string) => string,
}
*/

const ErrorHandler = (errors: BuildErrors[], setErrors: Dispatch<SetStateAction<BuildErrors[]>>) : any => {
    // we need a local copy for staging and immediate availability
    let localErrors = {...errors}

    // assign incoming error to master error store
    const setError = (which: string, msg: string | undefined = undefined) => {
        if (msg === undefined) delete localErrors[which]
        else Object.assign(localErrors, { [which]: [msg] })
        setErrors(localErrors)
    }

    // optional alias for readability
    const clearError = (which: string) => {
        setError(which)
    }

    // error flag for field prop
    const hasError = (which: string): boolean => {
        return (localErrors && localErrors[which] !== undefined)
    }

    // some error combinations need to implement a shared message while highlighting the field
    const hasSharedError = (which: string): boolean => {
        return (localErrors && localErrors[which] && localErrors[which][0] === "")
    }

    // whether any fields are currently in error state
    const hasAnyError = (): boolean => {
        return (localErrors && Object.keys(localErrors).length > 0)
    }

    // obtain the error for show errors component
    const getError = (which: string): string[] => {
        return (localErrors && localErrors[which] !== undefined) ? [localErrors[which]] : []
    }

    // convert a camel case field name to a title case string
    const fieldToTitle = (which: string): string => {
        return [...which].map(function(c, i) {
            if (i === 0) return c.toUpperCase()
            else if (c === c.toUpperCase()) return " " + c
            else return c
        }).join("")
    }

    return {
        setError: setError,
        clearError: clearError,
        hasError: hasError,
        hasSharedError: hasSharedError,
        hasAnyError: hasAnyError,
        getError: getError,
        fieldToTitle: fieldToTitle
    } as any
}

export default ErrorHandler