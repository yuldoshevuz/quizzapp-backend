import { Request } from 'express';
import { User } from 'src/repository/interfaces/user.interface';

export interface RequestWithUser extends Request {
  user: User;
}
