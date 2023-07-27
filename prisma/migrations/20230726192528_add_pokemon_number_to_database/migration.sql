/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `pokemons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemons" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_number_key" ON "pokemons"("number");

-- CreateIndex
CREATE INDEX "pokemons_number_idx" ON "pokemons"("number");
