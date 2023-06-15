import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";

import { getFavoritePokemon } from "../../api/favoritesPokemons";
import { getAuth, signOut } from "firebase/auth";

export default function UserData() {
  const user = getAuth().currentUser;
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    getFavoritePokemon().then((res) => {
      setFavoritePokemons(res);
    });
  }, []);

  const logout = () => {
    signOut(getAuth());
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user?.displayName}</Text>
      <View>
        <Text style={styles.text}>Username: {user?.displayName}</Text>
        <Text style={styles.text}>Email: {user?.email}</Text>
        <Text style={styles.text}>
          Favorite Pokemons: {favoritePokemons.length}
        </Text>
      </View>
      <Pressable onPress={logout} style={styles.button}>
        <Text>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    margin: 10,
  },
  text: {
    fontSize: 18,
    margin: 15,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  button: {
    alignItems: "center",
    width: 300,
    backgroundColor: "#A9CBD9",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
