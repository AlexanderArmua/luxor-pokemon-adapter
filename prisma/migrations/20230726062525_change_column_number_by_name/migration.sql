/*
  Warnings:

  - You are about to drop the column `number` on the `pokemons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `pokemons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "pokemons_number_key";

-- DropIndex
DROP INDEX "pokemons_number_range_index";

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "number",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_name_key" ON "pokemons"("name");
