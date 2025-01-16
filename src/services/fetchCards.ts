import { PokemonCard } from "../types/pokemon";

export const fetchCards = async (): Promise<PokemonCard[]> => {
  const response = await fetch("http://localhost:3001/cards");
  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }
  return response.json();
};
