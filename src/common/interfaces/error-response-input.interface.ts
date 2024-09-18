import { ValidationException } from '../exceptions/validation.exception';

export interface ErrorResponseInput {
  statusCode: number;
  message: string;
  errors?: ValidationException;
}
