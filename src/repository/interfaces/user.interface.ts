import { RoleUser } from '@prisma/client';

export interface User {
  id: string;
  fullName: string;
  telegramId: string;
  photo?: string;
  role: RoleUser;
  createdAt: Date;
  updatedAt: Date;
}
