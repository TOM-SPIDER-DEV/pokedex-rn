import { useEffect, useState } from "react";
import {
  getPokemons,
  getDetailPokemon,
  getPokemonById,
} from "../api/fetchPokemons";
import { PokemonCustom, PokemonBasicInfo } from "../types";
import { getFavoritePokemon } from "../api/favoritesPokemons";

export function useFetchPokemons() {
  const [pokemons, setPokemons] = useState<PokemonCustom[]>([]);
  const [nextUrl, setNextUrl] = useState<string>();

  const fetchPokemons = async () => {
    if (nextUrl === null) return;
    const pokemonArray: PokemonCustom[] = [];
    const pokemons: PokemonBasicInfo = await getPokemons(nextUrl);
    setNextUrl(pokemons.next);

    for await (const pokemon of pokemons.results) {
      const pokemonDetail = await getDetailPokemon(pokemon.url);
      pokemonArray.push({
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        type: pokemonDetail.types[0].type.name,
        types: pokemonDetail.types,
        order: pokemonDetail.order,
        image: pokemonDetail.sprites.other["official-artwork"].front_default,
      });
    }
    setPokemons((prevPokemons) => [...prevPokemons, ...pokemonArray]);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return pokemons;
}

export function useFetchFavoritePokemons() {
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonCustom[]>([]);

  const fetchFavoritePokemons = async () => {
    const pokemonsId = await getFavoritePokemon();

    const pokemonsArray = [];
    for await (const id of pokemonsId) {
      const pokemonDetails = await getPokemonById(id);

      pokemonsArray.push({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.types[0].type.name,
        order: pokemonDetails.order,
        image: pokemonDetails.sprites.other["official-artwork"].front_default,
      });
    }

    setFavoritePokemons(pokemonsArray);
  };

  useEffect(() => {
    fetchFavoritePokemons();
  }, []);

  return favoritePokemons;
}
