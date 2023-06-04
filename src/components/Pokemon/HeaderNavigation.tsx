import { SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  addPokemonToFavorite,
  isFavoritePokemon,
  removePokemonFromFavorite,
} from "../../api/favoritesPokemons";
import getColorByComponentType from "../../utils/getColorByComponentType";
import useAuth from "../../hooks/useAuth";

interface Props {
  id: number;
  type: string;
}

export default function HeaderNavigation({ id, type }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { user } = useAuth();
  const navigation = useNavigation();

  const backgroundColor = getColorByComponentType(type);

  useEffect(() => {
    const getFavorite = async () => {
      const favorite = await isFavoritePokemon(id);
      setIsFavorite(favorite);
    };
    (async () => {
      await getFavorite();
    })();
  }, [id]);

  useEffect(() => {
    const handleFavorite = async () => {
      if (!isFavorite) {
        await removePokemonFromFavorite(id);
      } else {
        await addPokemonToFavorite(id);
      }
    };
    (async () => {
      await handleFavorite();
    })();
  }, [isFavorite]);

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
          onPress={() => {
            setIsFavorite(!isFavorite);
          }}
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
