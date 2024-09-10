import { RoleUser } from "@prisma/client"

export class JwtPayload {
    userId: string;
    role: RoleUser
};