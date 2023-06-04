import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addPokemonToFavorite(id: number) {
  try {
    const jsonValue = await AsyncStorage.getItem("@favorite_pokemon");
    let favoritePokemon = jsonValue != null ? JSON.parse(jsonValue) : [];
    favoritePokemon.push(id);
    await AsyncStorage.setItem(
      "@favorite_pokemon",
      JSON.stringify(favoritePokemon)
    );
  } catch (error) {
    throw error;
  }
}
export async function removePokemonFromFavorite(id: number) {
  try {
    const jsonValue = await AsyncStorage.getItem("@favorite_pokemon");
    let favoritePokemon = jsonValue != null ? JSON.parse(jsonValue) : [];
    favoritePokemon = favoritePokemon.filter((item: number) => item !== id);
    await AsyncStorage.setItem(
      "@favorite_pokemon",
      JSON.stringify(favoritePokemon)
    );
  } catch (error) {
    throw error;
  }
}
export async function getFavoritePokemon() {
  try {
    const jsonValue = await AsyncStorage.getItem("@favorite_pokemon");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    throw error;
  }
}

export async function isFavoritePokemon(id: number) {
  try {
    const jsonValue = await AsyncStorage.getItem("@favorite_pokemon");
    let favoritePokemon = jsonValue != null ? JSON.parse(jsonValue) : [];
    return favoritePokemon.includes(id);
  } catch (error) {
    throw error;
  }
}
