import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-vector-icons/Icon";

import { getPokemonById } from "../api/fetchPokemons";
import { PokemonFullDetails } from "../types";
import getColorByPokemonType from "../utils/getColorByComponentType";
import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";

interface Props {
  navigation: any;
  route: any;
}

export default function Pokemon({ navigation, route }: Props) {
  const [pokemon, setPokemon] = useState<PokemonFullDetails>();

  const { id } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, route.params]);

  useEffect(() => {
    try {
      getPokemonById(id).then((res) => {
        setPokemon(res);
      });
    } catch (error) {
      navigation.goBack();
      console.error(error);
    }
  }, []);
  if (!pokemon) return null;
  return (
    <ScrollView>
      <Header pokemon={pokemon} />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
