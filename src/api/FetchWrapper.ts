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
        let headers = new Headers();
        headers.append('accept', '*/*');
        headers.append('Api-Token', (data?.token) ?? "");
        headers.append('Region', (data?.region) ?? "");
        headers.append('Content-Type', (data?.contentType) ?? 'application/x-www-form-urlencoded');
        return headers
    }

    public static async get<TResponseBody>(request: string, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'GET',
            headers: this.getHeader(data),
        });
    }

    public static async post<TRequestBody, TResponseBody>(request: string, body: TRequestBody, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'POST',
            headers: this.getHeader(data),
            body: JSON.stringify(body)
        });
    }

    public static async patch<TRequestBody, TResponseBody>(request: string, body: TRequestBody, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'PATCH',
            headers: this.getHeader(data),
            body: JSON.stringify(body),
            redirect: 'follow'
        });
    }

    public static async put<TRequestBody, TResponseBody>(request: string, body: TRequestBody, data?: HeaderData): Promise<TResponseBody> {
        return this.execFetch(this.ApiPrefix + request, {
            method: 'PUT',
            headers: this.getHeader(data),
            body: JSON.stringify(body),
            redirect: 'follow'
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