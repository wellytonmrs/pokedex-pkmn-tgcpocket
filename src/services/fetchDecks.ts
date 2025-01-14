import { decksData } from "../pages/mock/decksMock";
import { Deck } from "../types/pokemon";

export const fetchDecks = async (): Promise<Deck[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return decksData;
};
