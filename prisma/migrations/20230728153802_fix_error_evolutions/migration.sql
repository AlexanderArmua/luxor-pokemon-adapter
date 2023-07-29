-- DropForeignKey
ALTER TABLE "evolutions" DROP CONSTRAINT "evolutions_future_pokemon_id_fkey";

-- AddForeignKey
ALTER TABLE "evolutions" ADD CONSTRAINT "evolutions_base_pokemon_id_fkey" FOREIGN KEY ("base_pokemon_id") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
