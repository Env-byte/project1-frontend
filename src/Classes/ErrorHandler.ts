import {ToastError} from "./SwalMixin";

export interface ErrorWrapper {
    message: string
    type: string
}

export default class ErrorHandler {
    public static Catch(error: any): ErrorWrapper {
        console.error(error)
        let errorWrapper: ErrorWrapper = {message: "", type: ""}
        try {
            errorWrapper = JSON.parse(error as string) as ErrorWrapper;
            console.log('errorWrapper', errorWrapper)
            ToastError.fire(errorWrapper.message);
        } catch (e) {
            console.log('ErrorHandler.Catch', error);
            errorWrapper.message = "Server Error";
            errorWrapper.type = "Internal Server Error"
            ToastError.fire('Server Error');
        }
        return errorWrapper;
    }
}