import { cardsData } from "../pages/mock/cardsMock";
import { PokemonCard } from "../types/pokemon";

export const fetchCards = async (): Promise<PokemonCard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return cardsData;
};
