import { SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { getPokemons, getDetailPokemon } from "../api/fetchPokemons";
import PokemonList from "../components/PokemonList";
import { PokemonCustom, PokemonBasicInfo } from "../types";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonCustom[]>([]);
  const [nextUrl, setNextUrl] = useState<string>();

  const getPokemonData = async () => {
    if (nextUrl === null) return;
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
    getPokemonData();
  }, []);

  return <PokemonList pokemons={pokemons} loadMorePokemons={getPokemonData} />;
}
