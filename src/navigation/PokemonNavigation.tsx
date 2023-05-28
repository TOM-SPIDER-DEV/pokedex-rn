import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PokedexScreen from "../screens/Pokedex";
import PokemonScreen from "../screens/Pokemon";

const Stack = createStackNavigator();

const screensOptions = {
  Pokedex: {
    title: "",
    headerShown: false,
  },
  Pokemon: {
    title: "",
    headerShown: true,
  },
};

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={screensOptions.Pokedex}
      />
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={screensOptions.Pokemon}
      />
    </Stack.Navigator>
  );
}
