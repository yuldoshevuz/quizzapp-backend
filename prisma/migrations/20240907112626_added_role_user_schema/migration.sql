-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "RoleUser" NOT NULL DEFAULT 'USER';
