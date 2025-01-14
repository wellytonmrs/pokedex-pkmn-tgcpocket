import { Deck, PokemonCard } from "../../types/pokemon";
import { cardsData } from "./cardsMock";

const findCardById = (id: string): PokemonCard | undefined => {
    return cardsData.find((card) => card.id === id);
};

export const decksData: Deck[] = [
    {
        id: "mewtwo-ex",
        name: "Mewtwo Ex Deck",
        cards: [
            findCardById("A1_127")!,
            findCardById("A1_130")!,
            findCardById("A1_130")!,
            findCardById("A1_131")!,
            findCardById("A1_131")!,
            findCardById("A1_132")!,
            findCardById("A1_132")!,
            findCardById("A1_129")!,
            findCardById("A1_129")!,
            findCardById("A1a_065")!,
            findCardById("A1a_065")!,
            findCardById("A1_223")!,
            findCardById("A1a_068")!,
            findCardById("A1_225")!,
            findCardById("Promo-A_5")!,
            findCardById("Promo-A_5")!,
            findCardById("Promo-A_6")!,
            findCardById("Promo-A_2")!,
            findCardById("Promo-A_7")!,
            findCardById("Promo-A_7")!
        ],
        imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_129_EN.webp",
    }, {
        id: "gyarados-ex",
        name: "Gyarados Ex Deck",
        cards: [
            findCardById("A1a_017")!,
            findCardById("A1a_017")!,
            findCardById("A1a_056")!,
            findCardById("A1a_056")!,
            findCardById("A1_087")!,
            findCardById("A1_087")!,
            findCardById("A1_088")!,
            findCardById("A1_088")!,
            findCardById("A1_089")!,
            findCardById("A1_089")!,
            findCardById("A1a_018")!,
            findCardById("A1a_018")!,
            findCardById("Promo-A_5")!,
            findCardById("Promo-A_5")!,
            findCardById("A1a_068")!,
            findCardById("A1a_068")!,
            findCardById("A1_220")!,
            findCardById("A1_220")!,
            findCardById("Promo-A_7")!,
            findCardById("Promo-A_7")!
        ],
        imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1a/A1a_018_EN.webp",
    }, {
        id: "gyarados-ex",
        name: "Gyarados Ex Deck",
        cards: [
            findCardById("A1_104")!,
            findCardById("A1_104")!,
            findCardById("A1_105")!,
            findCardById("A1_105")!,
            findCardById("A1_106")!,
            findCardById("A1_106")!,
            findCardById("A1_223")!,
            findCardById("A1_225")!,
            findCardById("A1_225")!,
            findCardById("A1_096")!,
            findCardById("A1_096")!,
            findCardById("A1a_030")!,
            findCardById("Promo-A_1")!,
            findCardById("Promo-A_1")!,
            findCardById("Promo-A_2")!,
            findCardById("Promo-A_2")!,
            findCardById("Promo-A_5")!,
            findCardById("Promo-A_5")!,
            findCardById("Promo-A_7")!,
            findCardById("Promo-A_7")!],
        imageUrl: "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_096_EN.webp",
    }
];