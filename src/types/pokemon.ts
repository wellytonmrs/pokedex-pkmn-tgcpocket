export interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  rarity: string;
  packs: PackName[];
  ex: boolean;
  qtd?: number;
}

export interface Deck {
  id: string;
  name: string;
  cards: PokemonCard[];
  imageUrl: string;
}

export enum PackName {
  Charizard = "charizard",
  Mewtwo = "mewtwo",
  Pikachu = "pikachu",
  Mew = "mew",
  Promo = "promo",
}
