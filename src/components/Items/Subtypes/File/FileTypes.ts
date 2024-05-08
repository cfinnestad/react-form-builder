import {Accept} from "react-dropzone";
import {object} from "prop-types";

export const FileTypes : Accept = {
    'image/png': ['.png'],
    'image/bmp': ['.bmp'],
    'image/gif': ['.gif'],
    'image/jpeg': ['.jpg','.jpeg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.oasis.opendocument.text': ['.olg'],
};

export const getFilesTypes = (types: string[]|undefined): Accept | undefined => {
    if (!types?.length) {
        return undefined;
    }
    const result = {} as Accept
    types.map(type => {
        if (FileTypes.hasOwnProperty(type)) {
            result[type] = FileTypes[type]
        }
    })
    return result
}

export const isValidType = (type: string): boolean => {
    return FileTypes.hasOwnProperty(type)
}

export const getExtensions = (fileTypes: string[]) => {
    const extensions: string[] = [];
    fileTypes.map((name) => {
        extensions.push(...FileTypes[name])
    })
    return extensions
}