import { Accept } from "react-dropzone";
import { Options } from "../../Items";
export declare const FileTypes: Accept;
export declare const getFilesTypes: (types: string[] | undefined, options: Options) => Accept | undefined;
export declare const isValidType: (type: string, options: Options) => boolean;
export declare const getExtensions: (fileTypes: string[], options: Options) => string[];
