export default class API <Data>{
    private ROOT_URL: string
    constructor(public baseUrl: string) {
        this.ROOT_URL = baseUrl;
    }

    async getRequest(): Promise<Data> {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch(this.ROOT_URL, requestOptions);
        return await response.json();
    }

    async postRequest<T>(routing: string, data: T): Promise<Data> {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(this.ROOT_URL + routing, requestOptions);
        return await response.json();
    }

    async putRequest<T>(routing: string, data: T): Promise<Data> {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(this.ROOT_URL + routing, requestOptions);
        return await response.json();
    }

    async patchRequest<T>(routing: string, data: T): Promise<Data> {
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(this.ROOT_URL + routing, requestOptions);
        return await response.json();
    }

    async deleteRequest(routing: string): Promise<Data> {
        const requestOptions = {
            method: "DELETE",
        };

        const response = await fetch(this.ROOT_URL + routing, requestOptions);
        return await response.json();
    }
}