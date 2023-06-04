import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import FavoriteNavigation from "./FavoriteNavigation";
import PokedexNavigation from "./PokemonNavigation";
import Account from "../screens/Account";

const Tab = createBottomTabNavigator();

interface ScreensOptions {
  [key: string]: {
    headerTitle?: string;
    tabBarLabel?: string;
    tabBarIcon?: ({
      color,
      size,
    }: {
      color: string;
      size: number;
    }) => JSX.Element;
    headerShown?: boolean;
  };
}

const screensOptions: ScreensOptions = {
  Favorite: {
    headerTitle: "Favorites Pokemons",

    tabBarIcon: ({ color, size }) => (
      <Icon name="heart" color={color} size={size} />
    ),
  },
  Pokedex: {
    tabBarLabel: "",
    headerShown: false,
    tabBarIcon: () => RenderPokeball(),
  },

  Account: {
    tabBarIcon: ({ color, size }) => (
      <Icon name="user" color={color} size={size} />
    ),
  },
};

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favorite"
        component={FavoriteNavigation}
        options={screensOptions.Favorite}
      />
      <Tab.Screen
        name="PokeScreen"
        component={PokedexNavigation}
        options={screensOptions.Pokedex}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={screensOptions.Account}
      />
    </Tab.Navigator>
  );
}

function RenderPokeball() {
  return (
    <Image
      source={require("../../assets/pokeball.png")}
      style={{ width: 75, height: 75, top: -15 }}
    />
  );
}
