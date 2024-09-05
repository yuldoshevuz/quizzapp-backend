import { ValidationException } from "../exceptions/validation.exception";
import { ErrorResponseInput } from "../interfaces/error-response-input.interface";

export class ErrorResponseDto {
    meta: {
        statusCode: number;
        timestamp: string;
        path: string;
        errors: ValidationException | [];
    };
    message: string;

    constructor(options: ErrorResponseInput) {
        this.meta = {
            statusCode: options.statusCode,
            timestamp: new Date().toISOString(),
            path: options.path,
            errors: options?.errors?.validationErrors || []
        };

        this.message = options.message;
    }
}
