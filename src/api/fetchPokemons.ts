import { PokemonBasicInfo, PokemonFullDetails } from "../types/index";

export async function getPokemons(url?: string): Promise<PokemonBasicInfo> {
  try {
    const URL = url || "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getDetailPokemon(
  url: string
): Promise<PokemonFullDetails> {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonById(id: string): Promise<PokemonFullDetails> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
