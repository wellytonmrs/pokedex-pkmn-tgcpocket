import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { fetchCards } from "../services/fetchCards";
import { fetchDecks } from "../services/fetchDecks";
import { fetchOwnedCards } from "../services/ownedCardsService";
import { PokemonCard } from "../types/pokemon";

export default function DeckDetailPage() {
  const { deckId } = useParams<{ deckId: string }>();

  // React Query - Fetch decks data
  const {
    isLoading,
    isError,
    data: decks,
  } = useQuery({
    queryKey: ["decks"],
    queryFn: fetchDecks,
    refetchOnWindowFocus: false,
  });

  const { data: ownedCardsMap } = useQuery({
    queryKey: ["ownedCards"],
    queryFn: fetchOwnedCards,
    select: (ownedCards: PokemonCard[]) =>
      new Map(ownedCards.map((card) => [card.id, card])),
    refetchOnWindowFocus: false,
  });

  const { data: libraryMap } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
    refetchOnWindowFocus: false,
    select: (cardsLibrary: PokemonCard[] | undefined) =>
      cardsLibrary
        ? new Map(cardsLibrary.map((card) => [card.id, card]))
        : undefined,
  });

  // Find the selected deck
  const deck = useMemo(() => {
    return decks?.find((d) => d.id === deckId);
  }, [decks, deckId]);

  // Loading state
  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  // Error state
  if (isError || !deck) {
    return <div>Error loading deck.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
      <div
        className=" grid 
        grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] 
        sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] 
        md:grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] 
        gap-4"
      >
        {deck.cards.map((card, index) => {
          const cardLib = libraryMap?.get(card);
          const ownedCard = ownedCardsMap?.get(card);

          return (
            <div
              key={`${cardLib?.id}-${index}`}
              className="flex justify-center"
            >
              <Card
                card={cardLib!}
                onToggleOwnership={() => {}}
                ownedCard={ownedCard}
                isDeck={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
