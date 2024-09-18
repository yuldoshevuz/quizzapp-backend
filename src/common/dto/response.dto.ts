export class ResponseDto<T> {
  ok: boolean;
  meta: {
    statusCode: number;
    message: string;
  };

  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.ok = true,
      this.meta = {
        statusCode,
        message,
      };
    this.data = data;
  }
}
