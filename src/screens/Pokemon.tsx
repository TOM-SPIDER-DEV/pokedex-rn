import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { getPokemonById } from "../api/fetchPokemons";
import { PokemonFullDetails } from "../types";

import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";

interface Props {
  route: any;
}

export default function Pokemon({ route }: Props) {
  const [pokemon, setPokemon] = useState<PokemonFullDetails>();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    try {
      getPokemonById(id).then((res) => {
        setPokemon(res);
      });
    } catch (error) {
      navigation.goBack();
      throw error;
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
