import { create } from 'zustand';
import { PokemonCard } from '../types/pokemon';
import { persist } from 'zustand/middleware';

interface CardState {
  cards: Map<string, PokemonCard>; // Using a Map for faster lookups
  setCards: (cards: PokemonCard[]) => void;
  toggleOwnership: (cardId: string) => void;
}

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      cards: new Map(), // Initialize with an empty Map
      setCards: (cards) => {
        set({
          cards: new Map(cards.map((card) => [card.id, card])),
        });
      },
      toggleOwnership: (cardId) =>
        set((state) => {
          const card = state.cards.get(cardId);
          if (card) {
            // If the card exists, toggle the ownership status
            const updatedCard = { ...card, owned: !card.owned };
            // Update the Map with the updated card
            state.cards.set(cardId, updatedCard);
          }
          // Return the updated state with the modified Map
          return { cards: new Map(state.cards) };
        }),
    }),
    {
      name: 'card-storage', // Key for localStorage to persist the store
      storage: {
        getItem: (name: string) => {
          const stored = localStorage.getItem(name);
          return stored ? JSON.parse(stored) : null;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setItem: (name: string, value: any) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => localStorage.removeItem(name),
      },
    }
  )
);