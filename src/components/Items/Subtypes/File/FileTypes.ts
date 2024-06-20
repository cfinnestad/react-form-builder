import {Accept} from "react-dropzone";
import {Options} from "../../Items";

export const FileTypes : Accept = {
    'image/png': ['.png'],
    'image/bmp': ['.bmp'],
    'image/gif': ['.gif'],
    'image/jpeg': ['.jpg','.jpeg'],
    'image/tiff': ['.tif','.tiff'],
    'image/heic': ['.heic'],
    'image/heif': ['.heif'],
    'application/pdf': ['.pdf'],
    // 'application/msword': ['.doc'],
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    // 'application/vnd.oasis.opendocument.text': ['.olg'],
};

export const getFilesTypes = (types: string[]|undefined, options: Options): Accept | undefined => {
    if (!types?.length) {
        return undefined;
    }
    const result = {} as Accept
    types.map(type => {
        if (options.fileTypes.hasOwnProperty(type)) {
            result[type] = FileTypes[type]
        }
    })
    return result
}

export const isValidType = (type: string, options: Options): boolean => {
    return options.fileTypes.hasOwnProperty(type)
}

export const getExtensions = (fileTypes: string[], options: Options) => {
    const extensions: string[] = [];
    fileTypes.map((name) => {
        extensions.push(...options.fileTypes[name])
    })
    return extensions
}