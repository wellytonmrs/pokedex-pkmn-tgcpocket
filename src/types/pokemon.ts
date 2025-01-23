export interface Ability {
  info: string;
  effect: string;
}

export interface PokemonCard {
  id: string;
  setId: string;
  number: string;
  name: string;
  set_code: string;
  set_name: string;
  rarity: string;
  color: string;
  type: string;
  hp: string;
  stage: string;
  prew_stage_name: string;
  ability: Ability[];
  weakness: string;
  retreat: string;
}

export interface Deck {
  id: string;
  name: string;
  cards: string[];
  imageUrl: string;
}

export enum PackName {
  Charizard = "charizard",
  Mewtwo = "mewtwo",
  Pikachu = "pikachu",
  Mew = "mew",
  Promo = "promo",
}
