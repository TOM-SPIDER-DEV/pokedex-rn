import { FlatList, Text, StyleSheet } from "react-native";
import React from "react";

import PokemonCard from "./PokemonCard";
import { PokemonCustom } from "../types";

export default function PokemonList({
  pokemons,
}: {
  pokemons: PokemonCustom[];
}) {
  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => pokemon.id.toString()}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContainer}
    />
  );
}
const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 5,
  },
});
