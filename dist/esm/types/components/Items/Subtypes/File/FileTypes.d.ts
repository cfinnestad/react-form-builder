import { Accept } from "react-dropzone";
export declare const FileTypes: Accept;
export declare const getFilesTypes: (types: string[] | undefined) => Accept | undefined;
export declare const isValidType: (type: string) => boolean;
export declare const getExtensions: (fileTypes: string[]) => string[];
