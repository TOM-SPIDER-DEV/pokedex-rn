import { StyleSheet, View, Text } from "react-native";
import React from "react";

import { Type } from "../../types";
import getColorByPokemonType from "../../utils/getColorByComponentType";

export default function Type({ types }: { types: Type[] }) {
  return (
    <View style={styles.container}>
      {types.map((type) => (
        <Text
          key={type.type.name}
          style={[
            styles.pokemonName,
            { backgroundColor: getColorByPokemonType(type.type.name) },
          ]}
        >
          {type.type.name}
        </Text>
      ))}
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
    justifyContent: "center",
    flexDirection: "row",
  },

  pokemonName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    margin: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
});
