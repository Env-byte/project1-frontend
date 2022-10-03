import {ToastError} from "./SwalMixin";

type ErrorType = 'Access Denied' | 'Not Found' | 'Internal Server Error'

export interface ErrorWrapper {
    message: string
    type: ErrorType
}

export default class ErrorHandler {
    public static Catch(error: any): ErrorWrapper {
        console.error(error)
        let errorWrapper: ErrorWrapper = {message: "", type: 'Internal Server Error'}
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