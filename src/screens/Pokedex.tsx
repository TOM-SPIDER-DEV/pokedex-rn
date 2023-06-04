import React, { useEffect, useState } from "react";

import PokemonList from "../components/Pokedex/PokemonList";

import { PokemonBasicInfo, PokemonCustom } from "../types";
import { getDetailPokemon, getPokemons } from "../api/fetchPokemons";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonCustom[]>([]);
  const [nextUrl, setNextUrl] = useState<string>();
  const [isNext, setIsNext] = useState<boolean>(false);

  const fetchPokemons = async () => {
    if (nextUrl === null) {
      setIsNext(false);
      return;
    }
    setIsNext(true);
    const pokemonArray: PokemonCustom[] = [];
    const pokemons: PokemonBasicInfo = await getPokemons(nextUrl);
    setNextUrl(pokemons.next);

    for await (const pokemon of pokemons.results) {
      const pokemonDetail = await getDetailPokemon(pokemon.url);
      pokemonArray.push({
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        type: pokemonDetail.types[0].type.name,
        types: pokemonDetail.types,
        order: pokemonDetail.order,
        image: pokemonDetail.sprites.other["official-artwork"].front_default,
      });
    }
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonArray]);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonList
      pokemons={pokemons}
      loadMorePokemons={fetchPokemons}
      isNext={isNext}
    />
  );
}
