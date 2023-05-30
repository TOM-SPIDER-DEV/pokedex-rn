import React from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";

import { PokemonFullDetails } from "../../types";
import getColorByPokemonType from "../../utils/getColorByComponentType";

export default function Header({ pokemon }: { pokemon: PokemonFullDetails }) {
  const backgroundColor = getColorByPokemonType(pokemon.types[0].type.name);

  const formattedPokemonId = pokemon?.id.toString().padStart(3, "0");
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.pokemonName}>{pokemon?.name}</Text>
          <Text style={styles.pokemonId}>#{formattedPokemonId}</Text>
        </View>
        <View style={styles.headerRight}>
          <Image
            style={styles.pokemonImage}
            source={{
              uri: pokemon?.sprites.other["official-artwork"].front_default,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerLeft: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerRight: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },
  pokemonId: {
    fontSize: 20,
    color: "white",
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
});
