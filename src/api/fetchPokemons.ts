import { PokemonBasicInfo, PokemonFullDetails } from "../types/index";

export async function fetchPokemons(): Promise<PokemonBasicInfo[]> {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const data = await response.json();
  return data.results;
}
export async function fetchDetailPokemon(
  url: string
): Promise<PokemonFullDetails> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
