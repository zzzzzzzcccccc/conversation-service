import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_CODE_NULL } from '../config'

@Catch(HttpException)
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Record<string, any>;

    response.status(status).json({
      path: request.url,
      timestamp: new Date().toISOString(),
      status_code: status,
      message: exceptionResponse?.message || exception.message,
      error_code: exceptionResponse?.error_code || ERROR_CODE_NULL
    });
  }
}
