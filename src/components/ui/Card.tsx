import { PokemonCard } from "../../types/pokemon";
import { Button } from "./Button";

type CardProps = {
    card: PokemonCard;
    onToggleOwnership: (id: string) => void;
};

export function Card({ card, onToggleOwnership }: CardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Card Image */}
            <img
                src={card.imageUrl}
                alt={`${card.name} card`}
                className="w-367 h-512 object-contain"
            />

            {/* Ownership Button */}
            <div className="p-4 flex justify-center">
                <Button
                    onClick={() => onToggleOwnership(card.id)}
                    variant={card.owned ? 'primary' : 'outline'}
                >
                    {card.owned ? 'Owned' : 'Not Owned'}
                </Button>
            </div>
        </div>
    );
}
