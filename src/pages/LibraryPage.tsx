import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { fetchCards } from "../services/fetchCards";
import {
  addOwnedCard,
  fetchOwnedCards,
  removeOwnedCard,
  updateOwnedCardQuantity,
} from "../services/ownedCardsService";
import { PokemonCard } from "../types/pokemon";

// Updated LibraryPage component
export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [library, setLibrary] = useState<PokemonCard[] | undefined>(undefined);

  const queryClient = useQueryClient();

  // Memoized search term in lowercase
  const lowerSearchTerm = useMemo(() => searchTerm.toLowerCase(), [searchTerm]);

  // React Query - Fetch data
  const {
    isLoading,
    isError,
    data: cards,
    refetch,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setLibrary(cards);
  }, [cards]);

  const { data: ownedCardsMap } = useQuery({
    queryKey: ["ownedCards"],
    queryFn: fetchOwnedCards,
    select: (ownedCards: PokemonCard[]) =>
      new Map(ownedCards.map((card) => [card.id, card])),
    refetchOnWindowFocus: false,
  });

  const addCardMutation = useMutation({
    mutationFn: addOwnedCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["ownedCards"] });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: ({ cardId, quantity }: { cardId: string; quantity: number }) =>
      updateOwnedCardQuantity(cardId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["ownedCards"] });
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: removeOwnedCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      queryClient.invalidateQueries({ queryKey: ["ownedCards"] });
    },
  });

  const handleToggleOwnership = useCallback(
    (cardId: string, quantityChange: number) => {
      const ownedCard = ownedCardsMap?.get(cardId);

      if (ownedCard) {
        const newQuantity = (ownedCard.qtd || 0) + quantityChange;
        if (newQuantity <= 0) {
          removeCardMutation.mutate(cardId);
        } else {
          updateCardMutation.mutate({ cardId, quantity: newQuantity });
        }
      } else {
        const cardToAdd = library?.find((c) => c.id === cardId);
        if (cardToAdd) {
          addCardMutation.mutate(cardToAdd);
        }
      }
    },
    [
      ownedCardsMap,
      library,
      addCardMutation,
      updateCardMutation,
      removeCardMutation,
    ]
  );

  // Add all cards to owned list
  const handleAddAll = useCallback(() => {
    library?.forEach((card) => {
      if (!ownedCardsMap?.has(card.id)) {
        addCardMutation.mutate(card);
      }
    });
  }, [library, ownedCardsMap, addCardMutation]);

  // Remove all owned cards
  const handleRemoveAll = useCallback(() => {
    ownedCardsMap?.forEach((_, cardId) => {
      removeCardMutation.mutate(cardId);
    });
  }, [ownedCardsMap, removeCardMutation]);

  const filteredCards = useMemo(() => {
    if (!library) {
      return [];
    }
    return library.filter((card) =>
      card.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [library, lowerSearchTerm]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Error loading cards. Please try again later.</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Card Library</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      {/* Global Action Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={handleAddAll}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add All Cards
        </Button>
        <Button
          onClick={handleRemoveAll}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Remove All Cards
        </Button>
      </div>

      <div
        className="grid 
        grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] 
        sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] 
        md:grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] 
        gap-4"
      >
        {filteredCards && filteredCards.length > 0 ? (
          filteredCards.map((card) => {
            const ownedCard = ownedCardsMap?.get(card.id);

            return (
              <div key={card.id} className="flex justify-center">
                <Card
                  card={card}
                  onToggleOwnership={handleToggleOwnership}
                  ownedCard={ownedCard}
                />
              </div>
            );
          })
        ) : (
          <div>No cards found</div>
        )}
      </div>
    </div>
  );
}
