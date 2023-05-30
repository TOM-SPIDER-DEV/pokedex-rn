import { POKEMON_TYPE_COLORS } from "./constants";

export default function getColorByComponentType(type: string) {
  if (POKEMON_TYPE_COLORS[type.toLowerCase()]) {
    return POKEMON_TYPE_COLORS[type.toLowerCase()];
  }
  return POKEMON_TYPE_COLORS["default"];
}
