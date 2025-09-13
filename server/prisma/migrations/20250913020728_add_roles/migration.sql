-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('CONSUMER', 'SUPPLIER', 'TECHNICIAN', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'CONSUMER';
