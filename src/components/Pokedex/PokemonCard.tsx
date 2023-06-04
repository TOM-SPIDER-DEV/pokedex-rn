import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PokemonCustom } from "../../types";
import getColorByPokemonType from "../../utils/getColorByComponentType";

type RootStackParamList = {
  Pokemon: { id: number } | undefined;
};

export default function PokemonCard({ pokemon }: { pokemon: PokemonCustom }) {
  const backgroundColor = getColorByPokemonType(pokemon.type);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const formattedPokemonId = pokemon.id.toString().padStart(3, "0");

  const goToPokemon = () => {
    navigation.navigate("Pokemon", { id: pokemon.id });
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.id}>#{formattedPokemonId}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    height: 110,
    marginTop: 50,
    margin: 10,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    height: 125,
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: -50,
    left: 75,
    transform: [{ translateX: -50 }],
    width: 125,
    height: 125,
  },
  infoContainer: {
    height: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1D1E",
    textTransform: "capitalize",
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1D1E",
  },
});
