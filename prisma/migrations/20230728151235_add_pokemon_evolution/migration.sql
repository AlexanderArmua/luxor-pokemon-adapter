/*
  Warnings:

  - Added the required column `basic_pokemon_id` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemons" ADD COLUMN     "basic_pokemon_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_basic_pokemon_id_fkey" FOREIGN KEY ("basic_pokemon_id") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
