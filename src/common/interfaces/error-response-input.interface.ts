import { ValidationException } from '../exceptions/validation.exception';

export interface ErrorResponseInput {
  statusCode: number;
  path: string;
  message: string;
  errors?: ValidationException;
}
