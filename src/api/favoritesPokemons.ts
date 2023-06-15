import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { app } from "../../firebase-config";

// ...

export async function addPokemonToFavorite(id: number) {
  try {
    const user = getAuth().currentUser;
    if (user) {
      const database = getDatabase(app);
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(child(userRef, "favoritePokemonIds"));
      const currentIds = snapshot.val() || [];
      const newIds = [...currentIds, id];

      set(child(userRef, "favoritePokemonIds"), newIds);
      return newIds;
    }
  } catch (error) {
    throw error;
  }
}

export async function removePokemonFromFavorite(id: number) {
  try {
    const user = getAuth().currentUser;
    if (user) {
      const database = getDatabase(app);
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(child(userRef, "favoritePokemonIds"));
      const currentIds = snapshot.val() || [];
      const newIds = currentIds.filter((itemId: number) => itemId !== id);
      set(child(userRef, "favoritePokemonIds"), newIds);
    }
  } catch (error) {
    throw error;
  }
}

export async function getFavoritePokemon() {
  try {
    const user = getAuth().currentUser;
    if (user) {
      const database = getDatabase(app);
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(child(userRef, "favoritePokemonIds"));
      const favoritePokemonIds = snapshot.val() || [];

      return favoritePokemonIds;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

export async function isFavoritePokemon(id: number) {
  const user = getAuth().currentUser;
  try {
    const favoritePokemonIds = await getFavoritePokemon();
    return favoritePokemonIds.includes(id);
  } catch (error) {
    throw error;
  }
}
