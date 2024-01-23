import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown | HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        //const res: any = exception.getResponse();
        // const status = exception.getStatus();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: this.httpAdapterHost.httpAdapter.getRequestUrl(ctx.getRequest()),
        };
        const res: any =
            exception instanceof HttpException
                ? exception.getResponse()
                : this.httpAdapterHost.httpAdapter.reply(response, responseBody, status);

        response.status(status).json({
            statusCode: status,
            isSuccess: 'false',
            timestamp: new Date().toISOString(),
            path: request.url,
            error: res,
        });
    }
}
