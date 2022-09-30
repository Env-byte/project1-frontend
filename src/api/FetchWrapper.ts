import ErrorHandler from "../Classes/ErrorHandler";

interface HeaderData {
    region?: string,
    token?: string,
    contentType?: string
}

export default class Client {
    public static ApiPrefix = process.env.REACT_APP_API_URL;

    //called on every request
    private static getHeader(data?: HeaderData) {
        return new Headers({
            'api-token': (data?.token) ?? "",
            'region': (data?.region) ?? "",
            'Content-Type': (data?.contentType) ?? 'application/x-www-form-urlencoded',

        });
    }

    public static async get<TResponseBody>(request: string, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'get',
            headers: this.getHeader(data),
        });
    }

    public static async post<TRequestBody, TResponseBody>(request: string, body: TRequestBody, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'post',
            headers: this.getHeader(data),
            body: JSON.stringify(body)
        });
    }

    public static async patch<TRequestBody, TResponseBody>(request: string, body: TRequestBody, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'patch',
            headers: this.getHeader(data),
            body: JSON.stringify(body)
        });
    }


    private static async execFetch<T>(url: string, init?: RequestInit): Promise<T> {

        const response = await fetch(url, init);
        if (!response.ok) {
            return new Promise((resolve, reject) => {
                response
                    .text()
                    .then(text => {
                        reject(text);
                    })
                    .catch(ErrorHandler.Catch)
            })
        }
        return response.json().catch(ErrorHandler.Catch)
    }
}

export class ContentClient extends Client {
    public static ApiPrefix = process.env.REACT_APP_CONTENT_URL;
}