-- CreateTable
CREATE TABLE "pokemons" (
    "id" SERIAL NOT NULL,
    "pokemon_id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_pokemon_id_key" ON "pokemons"("pokemon_id");

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_number_key" ON "pokemons"("number");

-- CreateIndex
CREATE INDEX "pokemons_number_range_index" ON "pokemons"("number");
