import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ValidationException } from "../exceptions/validation.exception";
import { ErrorResponseDto } from "../dto/error-response.dto";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const validationErrors = exception instanceof ValidationException? exception.validationErrors : null;

        return response.status(status).json(
            new ErrorResponseDto({
                statusCode: status,
                path: request.url,
                message: exception.message,
                errors: validationErrors
            })
        )

    }
}