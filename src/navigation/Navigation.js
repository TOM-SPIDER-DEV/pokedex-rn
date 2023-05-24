import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import FavoriteScreen from "../screens/Favorite";
import PokedexScreen from "../screens/Pokedex";
import Account from "../screens/Account";

const Tab = createBottomTabNavigator();

const screensOptions = {
  Favorite: {
    headerTitle: "Favorites",
    tabBarIcon: ({ color, size }) => (
      <Icon name="heart" color={color} size={size} />
    ),
  },
  Pokedex: {
    tabBarLabel: "",
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
        name="Favorites"
        component={FavoriteScreen}
        options={screensOptions.Favorite}
      />
      <Tab.Screen
        name="Pokedex"
        component={PokedexScreen}
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
