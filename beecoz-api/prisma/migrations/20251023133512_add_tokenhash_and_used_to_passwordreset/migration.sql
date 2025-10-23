/*
  Warnings:

  - You are about to drop the column `token` on the `PasswordReset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenHash]` on the table `PasswordReset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenHash` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordReset_token_key";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "token",
ADD COLUMN     "tokenHash" TEXT NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_tokenHash_key" ON "PasswordReset"("tokenHash");
