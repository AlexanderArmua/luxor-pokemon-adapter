-- AddForeignKey
ALTER TABLE "evolutions" ADD CONSTRAINT "evolutions_future_pokemon_id_fkey" FOREIGN KEY ("future_pokemon_id") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
