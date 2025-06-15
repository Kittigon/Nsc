/*
  Warnings:

  - You are about to drop the column `level` on the `Scorequiz` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Scorequiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Scorequiz" DROP COLUMN "level",
DROP COLUMN "score",
ADD COLUMN     "level9q" TEXT,
ADD COLUMN     "levelanxious" TEXT,
ADD COLUMN     "leveldepression" TEXT,
ADD COLUMN     "levelstressed" TEXT,
ADD COLUMN     "score9q" INTEGER,
ADD COLUMN     "scoreanxious" INTEGER,
ADD COLUMN     "scoredepression" INTEGER,
ADD COLUMN     "scorestressed" INTEGER;
