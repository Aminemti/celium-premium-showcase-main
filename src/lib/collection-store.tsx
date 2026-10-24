import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  blankCollection,
  blankProduct,
  blankSection,
  defaultCollection,
  type Collection,
  type CollectionContent,
  type CollectionSection,
  type Product,
} from "@/data/collection";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "maison-frexes-collection-v1";
const ROW_ID = "main";

/** The products that used to ship with the house, or that the older panel left behind. They are cleared so the owner writes his own. */
const seededProductIds = new Set(["legacy", "emblem", "vessel", "mark", "coffret"]);
const leftoverProductNames = new Set(["New piece"]);

export type CollectionConnection = "checking" | "live" | "setup" | "offline";
export type SaveState = "idle" | "saving" | "saved" | "error";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Moves an item to a position, counting from one. */
function reorder<T>(items: T[], id: string, position: number, keyOf: (item: T) => string): T[] {
  const index = items.findIndex((item) => keyOf(item) === id);
  const target = Math.min(Math.max(position - 1, 0), items.length - 1);
  if (index < 0 || index === target) return items;
  const next = [...items];
  const [moved] = next.splice(index, 1);
  next.splice(target, 0, moved);
  return next;
}

function normalizeSection(raw: unknown, index: number): CollectionSection {
  const item = (raw ?? {}) as Partial<CollectionSection>;
  const seed = blankSection();
  return {
    id: typeof item.id === "string" && item.id ? item.id : `section-${index}`,
    kicker: typeof item.kicker === "string" ? item.kicker : seed.kicker,
    title: typeof item.title === "string" ? item.title : seed.title,
    body: typeof item.body === "string" ? item.body : seed.body,
    image: typeof item.image === "string" ? item.image : seed.image,
    visible: typeof item.visible === "boolean" ? item.visible : seed.visible,
  };
}

function normalizeCollection(raw: unknown, index: number, fallback?: Collection): Collection {
  const item = (raw ?? {}) as Partial<Collection>;
  const seed = fallback ?? blankCollection();
  return {
    id: typeof item.id === "string" && item.id ? item.id : seed.id,
    name: typeof item.name === "string" ? item.name : seed.name,
    badge: typeof item.badge === "string" ? item.badge : seed.badge,
    line: typeof item.line === "string" ? item.line : seed.line,
    description: typeof item.description === "string" ? item.description : seed.description,
    cover: typeof item.cover === "string" ? item.cover : seed.cover,
    visibleOnCollectionPage:
      typeof item.visibleOnCollectionPage === "boolean" ? item.visibleOnCollectionPage : seed.visibleOnCollectionPage,
    featuredOnHome: typeof item.featuredOnHome === "boolean" ? item.featuredOnHome : seed.featuredOnHome,
    sections: Array.isArray(item.sections) ? item.sections.map(normalizeSection) : seed.sections,
  };
}

function normalizeProduct(raw: unknown, fallback?: Product): Product {
  const item = (raw ?? {}) as Partial<Product>;
  const seed = fallback ?? blankProduct();
  return {
    id: typeof item.id === "string" && item.id ? item.id : seed.id,
    name: typeof item.name === "string" ? item.name : seed.name,
    description: typeof item.description === "string" ? item.description : seed.description,
    price: typeof item.price === "string" ? item.price : seed.price,
    inStock: typeof item.inStock === "boolean" ? item.inStock : seed.inStock,
    images: Array.isArray(item.images)
      ? item.images.filter((image): image is string => typeof image === "string")
      : [...seed.images],
    collectionId: typeof item.collectionId === "string" ? item.collectionId : seed.collectionId,
  };
}

/** Reads the older home plates and pieces once, so nothing written before is lost. */
function migrateLegacy(data: Record<string, unknown>): { collections: Collection[]; products: Product[] } | null {
  const plates = data.homePlates;
  if (!Array.isArray(plates)) return null;

  const collections = plates.map((plate, index) => {
    const item = (plate ?? {}) as Record<string, unknown>;
    const id = typeof item.id === "string" ? item.id : "";
    const seed = defaultCollection.collections.find((entry) => entry.id === id);
    return normalizeCollection(
      {
        id,
        name: item.name,
        badge: item.badge,
        line: item.line,
        description: seed?.description,
        cover: item.image,
        visibleOnCollectionPage: item.visible,
        featuredOnHome: item.visible,
        sections: seed?.sections,
      },
      index,
      seed,
    );
  });

  const pieces = Array.isArray(data.pieces) ? data.pieces : [];
  const products = pieces.map((piece) => {
    const item = (piece ?? {}) as Record<string, unknown>;
    const id = typeof item.id === "string" ? item.id : "";
    const seed = defaultCollection.products.find((entry) => entry.id === id);
    const note = typeof item.note === "string" ? item.note : undefined;
    const stale = note?.startsWith("Green, ivory, black, and blue. One oil, born in Kasserine");
    return normalizeProduct(
      {
        id,
        name: item.name,
        description: stale && seed ? seed.description : note,
        images: item.images,
        price: seed?.price,
        inStock: true,
        collectionId: "cillitana",
      },
      seed,
    );
  });

  return { collections, products };
}

function normalize(raw: unknown): CollectionContent {
  const base = clone(defaultCollection);
  if (!raw || typeof raw !== "object") return base;
  const data = raw as Record<string, unknown>;

  const legacy = Array.isArray(data.collections) ? null : migrateLegacy(data);
  const collections = Array.isArray(data.collections)
    ? data.collections.map((item, index) => normalizeCollection(item, index, base.collections[index]))
    : legacy?.collections ?? base.collections;
  const products = (
    Array.isArray(data.products) ? data.products.map((item) => normalizeProduct(item)) : legacy?.products ?? base.products
  ).filter((product) => !seededProductIds.has(product.id) && !leftoverProductNames.has(product.name.trim()));

  const legacyHome =
    data.homeTitle === "Cillitana" &&
    (data.homeSubtitle === "The imprint of an ancient land." || data.homeSubtitle === "The imprint of an ancient land");

  return {
    homeEyebrow: typeof data.homeEyebrow === "string" ? data.homeEyebrow : base.homeEyebrow,
    homeTitle: legacyHome ? base.homeTitle : typeof data.homeTitle === "string" ? data.homeTitle : base.homeTitle,
    homeSubtitle:
      legacyHome ? base.homeSubtitle : typeof data.homeSubtitle === "string" ? data.homeSubtitle : base.homeSubtitle,
    collections,
    products,
  };
}

function readStored(): CollectionContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(defaultCollection);
    return normalize(JSON.parse(raw));
  } catch {
    return clone(defaultCollection);
  }
}

function humanAuthError(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return "That email or password was not recognised.";
  }
  if (lower.includes("email not confirmed")) {
    return "This user still needs to be confirmed in Supabase.";
  }
  if (lower.includes("signups not allowed") || lower.includes("user not found")) {
    return "This email is not an admin.";
  }
  return message;
}

async function uploadDataUrl(dataUrl: string) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const kind = blob.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
  const path = `${crypto.randomUUID()}.${kind}`;
  const { error } = await supabase.storage.from("collection-images").upload(path, blob, {
    contentType: blob.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from("collection-images").getPublicUrl(path).data.publicUrl;
}

async function externalizeImages(content: CollectionContent) {
  const cache = new Map<string, string>();
  const place = async (src: string) => {
    if (!src.startsWith("data:")) return src;
    const known = cache.get(src);
    if (known) return known;
    const url = await uploadDataUrl(src);
    cache.set(src, url);
    return url;
  };

  const collections: Collection[] = [];
  for (const collection of content.collections) {
    const sections: CollectionSection[] = [];
    for (const section of collection.sections) sections.push({ ...section, image: await place(section.image) });
    collections.push({ ...collection, cover: await place(collection.cover), sections });
  }

  const products: Product[] = [];
  for (const product of content.products) {
    const images: string[] = [];
    for (const src of product.images) images.push(await place(src));
    products.push({ ...product, images });
  }

  return { ...content, collections, products };
}

type CollectionContextValue = {
  content: CollectionContent;
  error: string;
  connection: CollectionConnection;
  email: string | null;
  saveState: SaveState;
  saveError: string;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveNow: () => Promise<void>;
  updateContent: (patch: Partial<Omit<CollectionContent, "collections" | "products">>) => void;
  addCollection: () => string;
  updateCollection: (id: string, patch: Partial<Collection>) => void;
  removeCollection: (id: string) => void;
  /** Moves the collection to a position, counting from one. */
  orderCollection: (id: string, position: number) => void;
  addSection: (collectionId: string) => string;
  updateSection: (collectionId: string, sectionId: string, patch: Partial<CollectionSection>) => void;
  removeSection: (collectionId: string, sectionId: string) => void;
  /** Moves the text to a position, counting from one. */
  orderSection: (collectionId: string, sectionId: string, position: number) => void;
  addProduct: (collectionId?: string) => string;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  /** Moves the product to a position, counting from one. */
  orderProduct: (id: string, position: number) => void;
  addProductImage: (id: string, src: string) => void;
  removeProductImage: (id: string, index: number) => void;
  moveProductImage: (id: string, index: number, direction: -1 | 1) => void;
  setProductCover: (id: string, index: number) => void;
  reset: () => void;
  signIn: (email: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
  reload: () => Promise<void>;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CollectionContent>(() =>
    typeof window === "undefined" ? clone(defaultCollection) : readStored(),
  );
  const [error, setError] = useState("");
  const [connection, setConnection] = useState<CollectionConnection>("checking");
  const [email, setEmail] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [history, setHistory] = useState({ past: 0, future: 0 });

  const contentRef = useRef(content);
  contentRef.current = content;
  const readyRef = useRef(false);
  const hydratedRef = useRef(false);
  const emailRef = useRef<string | null>(null);
  const lastSavedRef = useRef("");
  const saveGen = useRef(0);
  const timerRef = useRef<number | undefined>(undefined);
  const pastRef = useRef<CollectionContent[]>([]);
  const futureRef = useRef<CollectionContent[]>([]);

  const applyRemote = (raw: unknown, uploadIfEmpty: boolean) => {
    if (raw) {
      const next = normalize(raw);
      lastSavedRef.current = JSON.stringify(next);
      setContent(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* the shared copy is still the one visitors see */
      }
      return;
    }
    lastSavedRef.current = uploadIfEmpty ? "" : JSON.stringify(contentRef.current);
  };

  const refresh = async () => {
    const { data, error: readError } = await supabase.from("collection").select("content").eq("id", ROW_ID).maybeSingle();
    if (readError) {
      const missing = readError.code === "PGRST205" || /could not find the table/i.test(readError.message);
      readyRef.current = false;
      hydratedRef.current = true;
      setConnection(missing ? "setup" : "offline");
      return;
    }
    const dirty = JSON.stringify(contentRef.current) !== lastSavedRef.current && lastSavedRef.current !== "";
    readyRef.current = true;
    hydratedRef.current = true;
    setConnection("live");
    if (!dirty) applyRemote(data?.content, true);
  };

  useEffect(() => {
    let ignore = false;
    const { data: auth } = supabase.auth.onAuthStateChange((_event, session) => {
      const next = session?.user.email ?? null;
      emailRef.current = next;
      setEmail(next);
    });

    void (async () => {
      const { data, error: readError } = await supabase.from("collection").select("content").eq("id", ROW_ID).maybeSingle();
      if (ignore) return;
      if (readError) {
        const missing = readError.code === "PGRST205" || /could not find the table/i.test(readError.message);
        readyRef.current = false;
        hydratedRef.current = true;
        setConnection(missing ? "setup" : "offline");
        return;
      }
      readyRef.current = true;
      hydratedRef.current = true;
      setConnection("live");
      applyRemote(data?.content, true);
    })();

    const channel = supabase
      .channel("collection-main")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "collection", filter: `id=eq.${ROW_ID}` },
        (payload) => {
          const row = payload.new as { content?: unknown } | null;
          if (!row || !("content" in row)) return;
          const next = normalize(row.content);
          const json = JSON.stringify(next);
          if (json === JSON.stringify(contentRef.current)) {
            lastSavedRef.current = json;
            return;
          }
          if (lastSavedRef.current !== "" && JSON.stringify(contentRef.current) !== lastSavedRef.current) return;
          lastSavedRef.current = json;
          setContent(next);
        },
      )
      .subscribe();

    const onFocus = () => {
      if (document.visibilityState === "hidden") return;
      void refresh();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      ignore = true;
      auth.subscription.unsubscribe();
      void supabase.removeChannel(channel);
      window.removeEventListener("focus", onFocus);
      window.clearTimeout(timerRef.current);
    };
    // The listener is created once. refresh reads the latest refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (readyRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setError("");
    } catch {
      setError("That photograph is too large to keep in this browser.");
    }
  }, [content, connection]);

  const persist = async (snapshot: CollectionContent) => {
    const gen = ++saveGen.current;
    setSaveState("saving");
    try {
      const next = await externalizeImages(snapshot);
      if (gen !== saveGen.current) return;
      const saved = JSON.stringify(next);
      const { error: writeError } = await supabase.from("collection").upsert({
        id: ROW_ID,
        content: next,
        updated_at: new Date().toISOString(),
      });
      if (writeError) throw writeError;
      if (gen !== saveGen.current) return;
      lastSavedRef.current = saved;
      if (JSON.stringify(contentRef.current) !== saved) setContent(next);
      try {
        localStorage.setItem(STORAGE_KEY, saved);
      } catch {
        /* visitors read the shared copy */
      }
      setSaveState("saved");
      setSaveError("");
      setError("");
    } catch (caught) {
      if (gen !== saveGen.current) return;
      setSaveState("error");
      setSaveError(caught instanceof Error ? caught.message : "The change could not be saved.");
    }
  };

  useEffect(() => {
    if (!hydratedRef.current || !readyRef.current || !emailRef.current) return;
    const snapshot = content;
    const json = JSON.stringify(snapshot);
    if (json === lastSavedRef.current) return;
    window.clearTimeout(timerRef.current);
    setSaveState("saving");
    timerRef.current = window.setTimeout(() => void persist(snapshot), 500);
    return () => window.clearTimeout(timerRef.current);
    // persist reads the latest refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, connection, email]);

  const saveNow = async () => {
    window.clearTimeout(timerRef.current);
    if (!readyRef.current || !emailRef.current) return;
    await persist(contentRef.current);
  };

  const commit = (recipe: (current: CollectionContent) => CollectionContent) => {
    const current = contentRef.current;
    const next = normalize(recipe(current));
    if (JSON.stringify(next) === JSON.stringify(current)) return;
    pastRef.current = [...pastRef.current.slice(-49), current];
    futureRef.current = [];
    contentRef.current = next;
    setHistory({ past: pastRef.current.length, future: 0 });
    setContent(next);
  };

  const undo = () => {
    const past = pastRef.current;
    if (!past.length) return;
    const previous = past[past.length - 1];
    pastRef.current = past.slice(0, -1);
    futureRef.current = [contentRef.current, ...futureRef.current].slice(0, 50);
    contentRef.current = previous;
    setHistory({ past: pastRef.current.length, future: futureRef.current.length });
    setContent(previous);
  };

  const redo = () => {
    const future = futureRef.current;
    if (!future.length) return;
    const next = future[0];
    futureRef.current = future.slice(1);
    pastRef.current = [...pastRef.current.slice(-49), contentRef.current];
    contentRef.current = next;
    setHistory({ past: pastRef.current.length, future: futureRef.current.length });
    setContent(next);
  };

  const updateContent: CollectionContextValue["updateContent"] = (patch) => {
    commit((current) => ({ ...current, ...patch }));
  };

  const mapCollection = (id: string, change: (collection: Collection) => Collection) => {
    commit((current) => ({
      ...current,
      collections: current.collections.map((collection) => (collection.id === id ? change(collection) : collection)),
    }));
  };

  const updateCollection: CollectionContextValue["updateCollection"] = (id, patch) => {
    mapCollection(id, (collection) => ({ ...collection, ...patch }));
  };

  const addCollection = () => {
    const id = crypto.randomUUID();
    commit((current) => {
      const collection = blankCollection();
      collection.id = id;
      return { ...current, collections: [...current.collections, collection] };
    });
    return id;
  };

  const removeCollection = (id: string) => {
    commit((current) => ({
      ...current,
      collections: current.collections.filter((collection) => collection.id !== id),
      products: current.products.map((product) =>
        product.collectionId === id ? { ...product, collectionId: "" } : product,
      ),
    }));
  };

  const orderCollection: CollectionContextValue["orderCollection"] = (id, position) => {
    commit((current) => {
      const collections = reorder(current.collections, id, position, (collection) => collection.id);
      return collections === current.collections ? current : { ...current, collections };
    });
  };

  const mapSections = (collectionId: string, change: (sections: CollectionSection[]) => CollectionSection[]) => {
    mapCollection(collectionId, (collection) => ({ ...collection, sections: change([...collection.sections]) }));
  };

  const addSection = (collectionId: string) => {
    const id = crypto.randomUUID();
    mapSections(collectionId, (sections) => [...sections, { ...blankSection(), id }]);
    return id;
  };

  const updateSection: CollectionContextValue["updateSection"] = (collectionId, sectionId, patch) => {
    mapSections(collectionId, (sections) =>
      sections.map((section) => (section.id === sectionId ? { ...section, ...patch } : section)),
    );
  };

  const removeSection = (collectionId: string, sectionId: string) => {
    mapSections(collectionId, (sections) => sections.filter((section) => section.id !== sectionId));
  };

  const orderSection: CollectionContextValue["orderSection"] = (collectionId, sectionId, position) => {
    mapSections(collectionId, (sections) => reorder(sections, sectionId, position, (section) => section.id));
  };

  const mapProduct = (id: string, change: (product: Product) => Product) => {
    commit((current) => ({
      ...current,
      products: current.products.map((product) => (product.id === id ? change(product) : product)),
    }));
  };

  const updateProduct: CollectionContextValue["updateProduct"] = (id, patch) => {
    mapProduct(id, (product) => ({ ...product, ...patch }));
  };

  const addProduct = (collectionId = "") => {
    const id = crypto.randomUUID();
    commit((current) => ({ ...current, products: [...current.products, { ...blankProduct(collectionId), id }] }));
    return id;
  };

  const removeProduct = (id: string) => {
    commit((current) => ({ ...current, products: current.products.filter((product) => product.id !== id) }));
  };

  const orderProduct: CollectionContextValue["orderProduct"] = (id, position) => {
    commit((current) => {
      const products = reorder(current.products, id, position, (product) => product.id);
      return products === current.products ? current : { ...current, products };
    });
  };

  const mapProductImages = (id: string, change: (images: string[]) => string[]) => {
    mapProduct(id, (product) => ({ ...product, images: change([...product.images]) }));
  };

  const addProductImage = (id: string, src: string) => {
    mapProductImages(id, (images) => [...images, src]);
  };

  const removeProductImage = (id: string, index: number) => {
    mapProductImages(id, (images) => images.filter((_, imageIndex) => imageIndex !== index));
  };

  const moveProductImage: CollectionContextValue["moveProductImage"] = (id, index, direction) => {
    mapProductImages(id, (images) => {
      const target = index + direction;
      if (target < 0 || target >= images.length) return images;
      const [moved] = images.splice(index, 1);
      images.splice(target, 0, moved);
      return images;
    });
  };

  const setProductCover = (id: string, index: number) => {
    mapProductImages(id, (images) => {
      const chosen = images[index];
      if (!chosen) return images;
      return [chosen, ...images.filter((_, imageIndex) => imageIndex !== index)];
    });
  };

  const reset = () => {
    if (!readyRef.current) localStorage.removeItem(STORAGE_KEY);
    commit(() => clone(defaultCollection));
    setError("");
  };

  const signIn = async (emailAddress: string, password: string) => {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: emailAddress.trim(),
      password,
    });
    return authError ? humanAuthError(authError.message) : "";
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSaveState("idle");
  };

  return (
    <CollectionContext.Provider
      value={{
        content,
        error,
        connection,
        email,
        saveState,
        saveError,
        canUndo: history.past > 0,
        canRedo: history.future > 0,
        undo,
        redo,
        saveNow,
        updateContent,
        addCollection,
        updateCollection,
        removeCollection,
        orderCollection,
        addSection,
        updateSection,
        removeSection,
        orderSection,
        addProduct,
        updateProduct,
        removeProduct,
        orderProduct,
        addProductImage,
        removeProductImage,
        moveProductImage,
        setProductCover,
        reset,
        signIn,
        signOut,
        reload: refresh,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const value = useContext(CollectionContext);
  if (!value) throw new Error("useCollection must be used within CollectionProvider");
  return value;
}
