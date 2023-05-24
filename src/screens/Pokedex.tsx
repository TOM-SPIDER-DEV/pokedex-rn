import { SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { fetchPokemons, fetchDetailPokemon } from "../api/fetchPokemons";
import PokemonList from "../components/PokemonList";
import { PokemonCustom } from "../types";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonCustom[]>([]);

  useEffect(() => {
    const getPokemonData = async () => {
      const pokemonArray: PokemonCustom[] = [];
      const pokemons = await fetchPokemons();
      for await (const pokemon of pokemons) {
        const pokemonDetail = await fetchDetailPokemon(pokemon.url);
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

    getPokemonData();
  }, []);

  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} />
    </SafeAreaView>
  );
}
