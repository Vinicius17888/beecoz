-- CreateEnum
CREATE TYPE "Perfil" AS ENUM ('CLIENTE', 'AUTONOMO');

-- CreateTable
CREATE TABLE "Login" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "senhaHash" TEXT NOT NULL,
    "perfil" "Perfil" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "loginId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "genero" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autonomo" (
    "id" SERIAL NOT NULL,
    "loginId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "area" TEXT,
    "nivel" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Autonomo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Login_telefone_key" ON "Login"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_loginId_key" ON "Cliente"("loginId");

-- CreateIndex
CREATE UNIQUE INDEX "Autonomo_loginId_key" ON "Autonomo"("loginId");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Autonomo" ADD CONSTRAINT "Autonomo_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE CASCADE ON UPDATE CASCADE;
