import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { fetchDecks } from "../services/fetchDecks";

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

  // Find the selected deck
  const deck = useMemo(() => {
    return decks?.find((d) => d.id === deckId);
  }, [decks, deckId]);

  // Create a map to count card occurrences
  const cardCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (deck) {
      deck.cards.forEach((card) => {
        counts.set(card.id, (counts.get(card.id) || 0) + 1);
      });
    }
    return counts;
  }, [deck]);

  // Get unique cards based on cardCounts
  const uniqueCards = useMemo(() => {
    if (!deck) {
      return [];
    }
    return deck.cards.filter(
      (card, index, self) => index === self.findIndex((c) => c.id === card.id)
    );
  }, [deck]);

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
        {uniqueCards.map((card) => {
          const count = cardCounts.get(card.id);
          return (
            <div key={card.id} className="flex justify-center relative">
              {count && count > 1 && (
                <Badge
                  variant="secondary"
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
                >
                  {count}
                </Badge>
              )}
              <Card card={card} onToggleOwnership={() => {}} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
