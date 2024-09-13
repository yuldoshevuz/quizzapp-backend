import { ResponseDto } from 'src/common/dto/response.dto';

export class UserResponseDataDto {
  userId: string;
  accessToken: string;
}

export class UserResponseDto extends ResponseDto<UserResponseDataDto> {}
