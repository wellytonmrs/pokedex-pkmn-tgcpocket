// components/ui/Card.tsx
import { PokemonCard } from "../../types/pokemon";

interface CardProps {
  card: PokemonCard;
  onToggleOwnership: (cardId: string, quantity: number) => void;
}

export function Card({ card, onToggleOwnership }: CardProps) {
  const handleAdd = () => {
    onToggleOwnership(card.id, 1); // Add 1 to quantity
  };

  const handleRemove = () => {
    onToggleOwnership(card.id, -1); // Subtract 1 from quantity (or remove if 0)
  };

  return (
    <div className="relative group">
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-auto rounded-lg"
      />
      {/* Overlay with buttons */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {card.owned ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRemove}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
            >
              -
            </button>
            <span className="text-white">{card.qtd || 0}</span>
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Own
          </button>
        )}
      </div>
    </div>
  );
}