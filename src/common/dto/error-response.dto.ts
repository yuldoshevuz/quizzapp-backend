import { ValidationException } from '../exceptions/validation.exception';
import { ErrorResponseInput } from '../interfaces/error-response-input.interface';

export class ErrorResponseDto {
  ok: boolean;
  meta: {
    statusCode: number;
    errors: ValidationException | [];
  };
  message: string;

  constructor(options: ErrorResponseInput) {
    this.ok = false,
      this.meta = {
        statusCode: options.statusCode,
        errors: options?.errors || [],
      };

    this.message = options.message;
  }
}
