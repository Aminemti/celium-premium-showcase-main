import { cillitanaImages, thalaImages } from "@/data/cillitana";
import townEvening from "@/assets/origin/thala-town-evening.jpg";
import mill from "@/assets/origin/thala-mill.jpg";
import hands from "@/assets/origin/thala-hands.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  /** Left empty when the price is not published. */
  price: string;
  inStock: boolean;
  images: string[];
  /** The collection this product is linked to. Empty when it is not placed yet. */
  collectionId: string;
};

export type CollectionSection = {
  id: string;
  /** The small line above the title, such as "The name". */
  kicker: string;
  title: string;
  body: string;
  image: string;
  /** When off, the section is not shown on the collection page. */
  visible: boolean;
};

export type Collection = {
  id: string;
  name: string;
  /** The small label set on the photograph. */
  badge: string;
  /** The line under the name. */
  line: string;
  /** The sentence that opens the collection page. */
  description: string;
  /** The single photograph used as the main cover. */
  cover: string;
  /** When on, the collection appears on the collection page of the website. */
  visibleOnCollectionPage: boolean;
  /** When on, the collection appears in the collections section of the first page. */
  featuredOnHome: boolean;
  sections: CollectionSection[];
};

export type CollectionContent = {
  homeEyebrow: string;
  homeTitle: string;
  homeSubtitle: string;
  collections: Collection[];
  products: Product[];
};

export const housePhotographs: { id: string; label: string }[] = [
  { id: "marble", label: "Legacy on marble" },
  { id: "arch", label: "Legacy at the arch" },
  { id: "land", label: "Legacy in the land" },
  { id: "ruins", label: "Legacy at the ruins" },
  { id: "legacyQuartet", label: "Legacy on stone" },
  { id: "coffret", label: "The coffret" },
  { id: "vessel", label: "The vessel" },
  { id: "vessels", label: "Olive wood and stone" },
  { id: "emblem", label: "The emblem" },
  { id: "mark", label: "The mark" },
];

const library: Record<string, string> = {
  ...cillitanaImages,
  "town-evening": townEvening,
  mill,
};

export const platePhotographs: { id: string; label: string }[] = [
  ...housePhotographs,
  { id: "town-evening", label: "Thala in the evening" },
  { id: "mill", label: "The mill" },
];

export function resolveImage(src: string) {
  if (!src) return "";
  return library[src] ?? src;
}

/** A collection is open when it has a visible section or a linked product. */
export function isCollectionOpen(collection: Collection, products: Product[]) {
  if (collection.sections.some((section) => section.visible)) return true;
  return products.some((product) => product.collectionId === collection.id);
}

export const defaultCollection: CollectionContent = {
  homeEyebrow: "The Collections",
  homeTitle: "Maison Frexes",
  homeSubtitle: "One house, from Thala. Cillitana is the first collection. Two others are in preparation.",
  collections: [
    {
      id: "cillitana",
      name: "Cillitana",
      badge: "The first collection",
      line: "The imprint of an ancient land.",
      description: "The first collection of the House. From Thala, in the memory of ancient Cillium.",
      cover: "legacyQuartet",
      visibleOnCollectionPage: true,
      featuredOnHome: true,
      sections: [
        {
          id: "the-name",
          kicker: "The name",
          title: "Cillitana",
          body: "Cillitana takes its name from ancient Cillium, beside Thala. It is the first collection of Maison Frexes, and the name is kept as a living mark. Green, ivory, black, and blue belong to it. The name is the oil, and the oil is of Thala.",
          image: thalaImages.colonnade,
          visible: true,
        },
        {
          id: "the-bottle",
          kicker: "The bottle",
          title: "Four finishes, one oil",
          body: "The bottle of Cillitana is offered in green, ivory, black, and blue. Four finishes, one oil, from Thala, in the memory of ancient Cillium. It is quiet in the hand. Nothing on it is set out to please a display. What it holds is the first oil of the House.",
          image: thalaImages.townBottle,
          visible: true,
        },
        {
          id: "the-emblem",
          kicker: "The emblem",
          title: "The land on the glass",
          body: "An olive tree stands at the heart of the mountains, ringed by signs drawn from Berber memory. The emblem is the imprint of Thala, so the oil is recognised before it is tasted. It is not a costume and not a relic. It belongs to Cillitana, and to this place.",
          image: mill,
          visible: true,
        },
        {
          id: "the-coffret",
          kicker: "The coffret",
          title: "Opened for the table",
          body: "The coffret is olive wood, opened when the oil is offered. It is a gesture of the House, for the maisons, the chefs, and the tables that receive Frexes. The wood is the wood of Thala. The oil inside keeps the same standard.",
          image: hands,
          visible: true,
        },
      ],
    },
    {
      id: "second",
      name: "The second collection",
      badge: "In preparation",
      line: "Held for the House. It will belong to Thala.",
      description: "",
      cover: "town-evening",
      visibleOnCollectionPage: true,
      featuredOnHome: true,
      sections: [],
    },
    {
      id: "third",
      name: "The third collection",
      badge: "In preparation",
      line: "Held for the House. It will belong to Thala.",
      description: "",
      cover: "mill",
      visibleOnCollectionPage: true,
      featuredOnHome: true,
      sections: [],
    },
  ],
  products: [],
};

export function blankSection(): CollectionSection {
  return { id: "", kicker: "", title: "", body: "", image: "", visible: true };
}

export function blankCollection(): Collection {
  return {
    id: "",
    name: "New collection",
    badge: "",
    line: "",
    description: "",
    cover: "",
    visibleOnCollectionPage: true,
    featuredOnHome: false,
    sections: [],
  };
}

export function blankProduct(collectionId = ""): Product {
  return {
    id: "",
    name: "New product",
    description: "",
    price: "",
    inStock: true,
    images: [],
    collectionId,
  };
}
