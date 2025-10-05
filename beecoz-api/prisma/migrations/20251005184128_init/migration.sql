-- CreateTable
CREATE TABLE `Login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `senhaHash` VARCHAR(191) NOT NULL,
    `perfil` ENUM('CLIENTE', 'AUTONOMO') NOT NULL,
    `failedAttempts` INTEGER NOT NULL DEFAULT 0,
    `lockUntil` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Login_email_key`(`email`),
    UNIQUE INDEX `Login_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordReset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loginId` INTEGER NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loginId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NULL,

    UNIQUE INDEX `Cliente_loginId_key`(`loginId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autonomo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loginId` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NULL,
    `nivel` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Autonomo_loginId_key`(`loginId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasswordReset` ADD CONSTRAINT `PasswordReset_loginId_fkey` FOREIGN KEY (`loginId`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_loginId_fkey` FOREIGN KEY (`loginId`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autonomo` ADD CONSTRAINT `Autonomo_loginId_fkey` FOREIGN KEY (`loginId`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
