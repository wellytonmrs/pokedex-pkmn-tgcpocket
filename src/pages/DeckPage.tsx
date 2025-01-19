import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { fetchDecks } from "../services/fetchDecks";
import { Deck } from "../types/pokemon";

export default function DeckPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [decks, setDecks] = useState<Deck[]>();

  // Memoized search term in lowercase
  const lowerSearchTerm = useMemo(() => searchTerm.toLowerCase(), [searchTerm]);

  // React Query - Fetch data
  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["decks"],
    queryFn: async () => {
      const decks = await fetchDecks();
      setDecks(decks);
      return decks;
    },
    refetchOnWindowFocus: false,
  });

  // Memoized filtered cards with type safety
  const filteredDecks = useMemo(() => {
    if (!decks) {
      return [];
    }

    return decks.filter((deck) =>
      deck.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [decks, lowerSearchTerm]);

  // Handle search input change
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  // Loading state
  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  // Error state
  if (isError) {
    return (
      <div>
        <p>Error loading decks. Please try again later.</p>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Decks</h1>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Search decks..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>
      <div
        className="grid 
        grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] 
        sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] 
        md:grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] 
        gap-4"
      >
        {filteredDecks.map((deck) => (
          <Link to={`/deck/${deck.id}`} key={deck.id}>
            <div
              key={deck.id}
              className="p-4 border rounded-lg hover:shadow-lg transition-shadow flex flex-col items-center sm:items-stretch space-y-4"
            >
              {/* Left section containing h2 and p */}
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold mb-2">{deck.name}</h2>
                <p className="text-gray-600">{deck.cards.length} cards</p>
              </div>

              {/* Right section containing the image */}
              <div className="w-full flex justify-center">
                <img
                  src={deck.imageUrl}
                  alt={`${deck.cards[0]} card`}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
