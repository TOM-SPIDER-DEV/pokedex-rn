import { SafeAreaView, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import PokemonList from "../components/Pokedex/PokemonList";

import { PokemonCustom } from "../types";
import { getFavoritePokemon } from "../api/favoritesPokemons";
import { getPokemonById } from "../api/fetchPokemons";
import { getAuth } from "firebase/auth";

export default function Favorite() {
  const user = getAuth().currentUser;
  const [pokemons, setPokemons] = useState<PokemonCustom[]>([]);

  const fetchFavoritePokemons = async () => {
    const pokemonsId = await getFavoritePokemon();

    const pokemonsArray = [];
    for await (const id of pokemonsId) {
      const pokemonDetails = await getPokemonById(id);

      pokemonsArray.push({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.types[0].type.name,
        order: pokemonDetails.order,
        image: pokemonDetails.sprites.other["official-artwork"].front_default,
      });
    }

    setPokemons(pokemonsArray);
    pokemonsId;
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoritePokemons();
    }, [])
  );

  return user ? (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} isNext={false} />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <Text style={styles.text}>You have to login</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
