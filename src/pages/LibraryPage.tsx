import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { PokemonCard } from "../types/pokemon";
import { cardsData } from "./mock/cardsMock";
import { useCardStore } from "../store/useCardStore";

// Mock API call
const fetchCards = async (): Promise<PokemonCard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return cardsData;
};

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cards, setCards, toggleOwnership } = useCardStore();

  // React Query - Fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  // Update store when data changes
  useEffect(() => {
    if (data) {
      setCards(data);
    }
  }, [data, setCards]);

  // Filter cards
  const filteredCards = Array.from(cards.keys())
    .map((key) => cards.get(key))
    .filter((card) =>
      card?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((card): card is PokemonCard => card !== undefined);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError) {
    return <div>Error loading cards. Please try again later.</div>;
  }

  // Main page render
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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCards.map((card) => (
          <Card key={card.id} card={card} onToggleOwnership={toggleOwnership} />
        ))}
      </div>
    </div>
  );
}
