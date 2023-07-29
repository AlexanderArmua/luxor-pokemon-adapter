/*
  Warnings:

  - You are about to drop the column `basic_pokemon_id` on the `pokemons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pokemons" DROP CONSTRAINT "pokemons_basic_pokemon_id_fkey";

-- AlterTable
ALTER TABLE "pokemons" DROP COLUMN "basic_pokemon_id";

-- CreateTable
CREATE TABLE "evolutions" (
    "base_pokemon_id" INTEGER NOT NULL,
    "future_pokemon_id" INTEGER NOT NULL,

    CONSTRAINT "evolutions_pkey" PRIMARY KEY ("base_pokemon_id","future_pokemon_id")
);

-- AddForeignKey
ALTER TABLE "evolutions" ADD CONSTRAINT "evolutions_future_pokemon_id_fkey" FOREIGN KEY ("future_pokemon_id") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
