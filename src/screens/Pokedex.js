import { SafeAreaView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { fetchPokemons, fetchDetailPokemon } from "../api/fetchPokemons";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const pokemonArray = [];
    (async () => {
      for await (const pokemon of fetchPokemons()) {
        const pokemonDetail = await fetchDetailPokemon(pokemon.url);
        pokemonArray.push({
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          type: pokemonDetail.types[0].type.name,
          order: pokemonDetail.order,
          image: pokemonDetail.sprites.other["official-artwork"].front_default,
        });
      }
    })();
    setPokemons([...pokemons, ...pokemonArray]);
  }, []);

  return (
    <SafeAreaView>
      <Text>Pokedex</Text>
    </SafeAreaView>
  );
}
