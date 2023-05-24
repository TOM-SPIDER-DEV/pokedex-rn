export async function fetchPokemons() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const data = await response.json();
  return data.results;
}
export async function fetchDetailPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}
