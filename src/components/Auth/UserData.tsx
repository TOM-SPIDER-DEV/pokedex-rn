import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getFavoritePokemon } from "../../api/favoritesPokemons";

export default function UserData() {
  const { user, logout } = useAuth();
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    getFavoritePokemon().then((res) => {
      setFavoritePokemons(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido, {user?.firstName} {user?.lastName}
      </Text>
      <View>
        <Text style={styles.text}>
          Name: {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.text}>Username: {user?.username}</Text>
        <Text style={styles.text}>Email: {user?.email}</Text>
        <Text style={styles.text}>
          Favorite Pokemons: {favoritePokemons.length}
        </Text>
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
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
    margin: "auto",
    width: 100,
    height: 50,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    justifyContent: "center",
  },
});
