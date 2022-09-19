import {ToastError} from "./SwalMixin";

interface ErrorWrapper {
    message: string
    code: number
}

export default class ErrorHandler {
    public static Catch(error: any) {
        console.error(error)
        try {
            const errorWrapper: ErrorWrapper = JSON.parse(error as string) as ErrorWrapper;
            console.log('errorWrapper', errorWrapper)
            ToastError.fire(errorWrapper.message);
        } catch (e) {
            ToastError.fire('Server Error');
        }
        console.log('ErrorHandler.Catch', error);
    }
}