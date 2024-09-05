import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { map, Observable, tap } from "rxjs";
import { ResponseDto } from "../dto/response.dto";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((data: unknown) => new ResponseDto(
                response.statusCode,
                request.url,
                'Request successful',
                data
            ))
        )
    }
}