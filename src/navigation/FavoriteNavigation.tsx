import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoriteScreen from "../screens/Favorite";
import PokemonScreen from "../screens/Pokemon";

const Stack = createStackNavigator();

const screensOptions = {
  Favorite: {
    title: "",
    headerShown: false,
  },
  Pokemon: {
    title: "",
    headerShown: false,
  },
};

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={screensOptions.Favorite}
      />
      <Stack.Screen
        name="PokemonScreen"
        component={PokemonScreen}
        options={screensOptions.Pokemon}
      />
    </Stack.Navigator>
  );
}
