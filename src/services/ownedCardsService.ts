// services/ownedCardsService.ts
import { PokemonCard } from "../types/pokemon";

const BASE_URL = "http://localhost:3001/ownedCards";

// Get owned cards (with quantities)
export const fetchOwnedCards = async (): Promise<PokemonCard[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch owned cards");
  }
  return response.json();
};

// Add a card to ownedCards
export const addOwnedCard = async (
  card: PokemonCard
): Promise<PokemonCard> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...card, qtd: 1 }), // Add with initial quantity 1
  });

  if (!response.ok) {
    throw new Error("Failed to add card to owned list");
  }
  return response.json();
};

// Update card quantity in ownedCards
export const updateOwnedCardQuantity = async (
  cardId: string,
  quantity: number
): Promise<PokemonCard> => {
  // If quantity is 0 or less, remove the card
  if (quantity <= 0) {
    return removeOwnedCard(cardId);
  }

  const response = await fetch(`${BASE_URL}/${cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ qtd: quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update card quantity");
  }
  return response.json();
};

// Remove a card from ownedCards
export const removeOwnedCard = async (
  cardId: string
): Promise<PokemonCard> => {
  const response = await fetch(`${BASE_URL}/${cardId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove card from owned list");
  }
  return response.json();
};