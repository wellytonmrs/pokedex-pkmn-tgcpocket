import { PokemonCard } from "../../types/pokemon";
import { Button } from "./Button";

type CardProps = {
  card: PokemonCard;
  onToggleOwnership: (id: string) => void;
};

export function Card({ card, onToggleOwnership }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col`}
    >
      {/* Card Image */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={card.imageUrl}
          alt={`${card.name} card`}
          className="pt-2 w-full h-full object-contain"
        />
      </div>

      {/* Ownership Button */}
      <div className="p-1">
        <Button
          onClick={() => onToggleOwnership(card.id)}
          variant={card.owned ? "primary" : "outline"}
          className="w-full"
        >
          {card.owned ? "Owned" : "Not Owned"}
        </Button>
      </div>
    </div>
  );
}
