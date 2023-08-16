import { BuildErrors } from "../Items";
import { Dispatch, SetStateAction } from "react";
declare const ErrorHandler: (errors: BuildErrors[], setErrors: Dispatch<SetStateAction<BuildErrors[]>>) => any;
export default ErrorHandler;
