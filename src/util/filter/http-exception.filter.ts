// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
// import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any = error.message;
        let additionalInfo: any = null;

        if (error instanceof HttpException) {
            status = error.getStatus();
            message = error.getResponse();
        }
        // Handle specific database-related errors
        if (error instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST; // or another appropriate status
            message = 'Database query failed';
            additionalInfo = error.driverError.detail;
        }

        response.status(status).json({
            statusCode: status,
            isSuccess: false,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message,
            // stack: process.env.NODE_ENV === 'production' ? '🙊' : error.stack,
            additionalInfo,
        });
    }
}

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const res: any = exception.getResponse();
//     const status = exception.getStatus();

//     response.status(status).json({
//       statusCode: status,
//       isSuccess: 'false',
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       error: res,
//     });
//   }
// }

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

//     catch(exception: unknown | HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest<Request>();

//         //const res: any = exception.getResponse();
//         // const status = exception.getStatus();
//         const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
//         const responseBody = {
//             statusCode: status,
//             timestamp: new Date().toISOString(),
//             path: this.httpAdapterHost.httpAdapter.getRequestUrl(ctx.getRequest()),
//         };
//         const res: any =
//             exception instanceof HttpException
//                 ? exception.getResponse()
//                 : this.httpAdapterHost.httpAdapter.reply(response, responseBody, status);

//         response.status(status).json({
//             statusCode: status,
//             isSuccess: 'false',
//             timestamp: new Date().toISOString(),
//             path: request.url,
//             error: res,
//         });
//     }
// }
