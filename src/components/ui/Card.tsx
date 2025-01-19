// components/ui/Card.tsx
import { FaMinus, FaPlus } from "react-icons/fa";
import { PokemonCard } from "../../types/pokemon";

interface CardProps {
  card: PokemonCard;
  onToggleOwnership: (cardId: string, quantity: number) => void;
  ownedCard: PokemonCard | undefined;
  isDeck?: boolean;
}

export function Card({
  card,
  onToggleOwnership,
  ownedCard,
  isDeck = false,
}: CardProps) {
  const isOwned = !!ownedCard; // Check if the card is owned
  const quantity = ownedCard?.qtd || 0; // Get the quantity of the owned card or default to 0

  const handleAdd = () => onToggleOwnership(card.id, 1); // Add 1 to the card quantity
  const handleRemove = () => onToggleOwnership(card.id, -1); // Subtract 1 from the card quantity

  return (
    <div
      className={`relative group border rounded-lg ${
        !isOwned ? "filter grayscale" : ""
      }`}
    >
      {/* Card Image */}
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-auto rounded-t-lg"
      />

      {!isDeck && (
        <div className="p-4 bg-gray-800 text-white rounded-b-lg flex justify-center items-center">
          {isOwned ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRemove}
                className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold h-6 w-6 rounded-full"
              >
                <FaMinus />
              </button>
              <span className="text-white font-bold">{quantity}</span>
              <button
                onClick={handleAdd}
                className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold h-6 w-6 rounded-full"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold h-6 px-4 rounded"
            >
              ADD
            </button>
          )}
        </div>
      )}
    </div>
  );
}
