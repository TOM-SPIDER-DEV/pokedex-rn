import { SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  addPokemonToFavorite,
  isFavoritePokemon,
  removePokemonFromFavorite,
} from "../../api/favoritesPokemons";
import getColorByComponentType from "../../utils/getColorByComponentType";

import { getAuth } from "firebase/auth";
import { set } from "firebase/database";

interface Props {
  id: number;
  type: string;
}

export default function HeaderNavigation({ id, type }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const user = getAuth().currentUser;
  const navigation = useNavigation();

  const backgroundColor = getColorByComponentType(type);

  useEffect(() => {
    isFavoritePokemon(id).then((favorite) => {
      setIsFavorite(favorite);
    });
  }, [id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removePokemonFromFavorite(id);
      setIsFavorite(false);
    } else {
      await addPokemonToFavorite(id);
      setIsFavorite(true);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Icon
        name="arrow-left"
        size={20}
        color="white"
        style={styles.icon}
        onPress={navigation.goBack}
      />

      {user && (
        <Icon
          name="heart"
          size={20}
          color="white"
          style={styles.icon}
          solid={isFavorite}
          onPress={toggleFavorite}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
  },
  icon: {
    padding: 4,
  },
});
