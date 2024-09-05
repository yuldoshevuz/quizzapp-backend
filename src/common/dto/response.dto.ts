export class ResponseDto<T> {
    meta: {
        statusCode: number;
        message: string;
        timestamp: string;
        path: string;
    };

    data: T;

    constructor(statusCode: number, path: string, message: string, data: T) {
        this.meta = {
            statusCode,
            timestamp: new Date().toISOString(),
            path,
            message
        };
        this.data = data;
    }
}
