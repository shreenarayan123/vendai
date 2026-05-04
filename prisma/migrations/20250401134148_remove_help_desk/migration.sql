/*
  Warnings:

  - You are about to drop the column `helpdesk` on the `ChatBot` table. All the data in the column will be lost.
  - You are about to drop the column `answered` on the `FilterQuestions` table. All the data in the column will be lost.
  - You are about to drop the `HelpDesk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HelpDesk" DROP CONSTRAINT "HelpDesk_domainId_fkey";

-- AlterTable
ALTER TABLE "ChatBot" DROP COLUMN "helpdesk";

-- AlterTable
ALTER TABLE "FilterQuestions" DROP COLUMN "answered";

-- DropTable
DROP TABLE "HelpDesk";
