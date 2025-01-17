import { Deck } from "../types/pokemon";

export const fetchDecks = async (): Promise<Deck[]> => {
  const response = await fetch("http://localhost:3001/decks");
  if (!response.ok) {
    throw new Error("Failed to fetch decks");
  }
  return response.json();
};
