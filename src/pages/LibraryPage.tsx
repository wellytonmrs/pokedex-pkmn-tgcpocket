import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { fetchCards } from "../services/fetchCards";
import { useCardStore } from "../store/useCardStore";

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cards, setCards, toggleOwnership } = useCardStore();

  // Memoized search term in lowercase
  const lowerSearchTerm = useMemo(() => searchTerm.toLowerCase(), [searchTerm]);

  // React Query - Fetch data
  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const cards = await fetchCards();
      setCards(cards);
      return cards;
    },
    refetchOnWindowFocus: false,
  });

  // Memoized filtered cards with type safety
  const filteredCards = useMemo(() => {
    if (!cards || !(cards instanceof Map)) {
      return [];
    }

    return Array.from(cards.values()).filter(
      (card) => card && card.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [cards, lowerSearchTerm]);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  // Loading state with spinner
  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  // Error state with retry action
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
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div
        className=" grid 
        grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] 
        sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] 
        md:grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] 
        gap-4"
      >
        {filteredCards && filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id} className="flex justify-center">
              <Card card={card} onToggleOwnership={toggleOwnership} />
            </div>
          ))
        ) : (
          <div>No cards found</div>
        )}
      </div>
    </div>
  );
}
