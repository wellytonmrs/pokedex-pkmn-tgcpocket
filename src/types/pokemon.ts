export interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  rarity: string;
  owned: boolean;
  packs: PackName[];
  ex: boolean;
}

export interface Deck {
  id: string;
  name: string;
  cards: PokemonCard[];
  createdAt: Date;
}

export enum PackName {
  Charizard = 'charizard',
  Mewtwo = 'mewtwo',
  Pikachu = 'pikachu',
  Mew = 'mew',
}