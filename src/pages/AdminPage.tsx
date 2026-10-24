import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  housePhotographs,
  platePhotographs,
  resolveImage,
  type Collection,
  type CollectionSection,
  type Product,
} from "@/data/collection";
import { useCollection } from "@/lib/collection-store";
import { LanguageSelect } from "@/components/layout/LanguageSelect";
import logoOnLight from "@/assets/brand/maison-frexes-light.png";

type Tab = "products" | "collections";

const quietField =
  "w-full bg-background border border-border px-4 py-4 text-xl text-primary placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent";

const quietArea =
  "w-full bg-background border border-border px-4 py-4 text-lg text-primary leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent resize-y min-h-36";

const quietSelect =
  "w-full bg-background border border-border px-4 py-4 text-xl text-primary focus:outline-none focus:border-accent";

function Label({ children, hint }: { children: string; hint?: string }) {
  return (
    <div className="mb-3">
      <p className="text-base font-medium text-primary">{children}</p>
      {hint && <p className="text-base text-muted-foreground mt-1 leading-relaxed">{hint}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-border bg-card/40 p-6 md:p-8 space-y-8">
      <h2 className="font-serif text-3xl font-light">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  large = false,
  multiline = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  large?: boolean;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      {multiline ? (
        <textarea value={value} rows={4} onChange={(event) => onChange(event.target.value)} className={quietArea} />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${quietField} ${large ? "font-serif text-4xl font-light" : "font-serif text-2xl"}`}
        />
      )}
    </label>
  );
}

function RailButton({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap text-left px-4 py-4 border-l-4 transition-colors ${
        active ? "border-accent bg-background text-primary" : "border-transparent text-muted-foreground hover:text-primary"
      }`}
    >
      <span className="block font-serif text-2xl leading-tight">{title}</span>
      <span className="block text-base mt-1 leading-snug">{hint}</span>
    </button>
  );
}

function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-10 w-16 shrink-0 transition-colors ${on ? "bg-primary" : "bg-border"}`}
    >
      <span className={`absolute top-1 h-8 w-8 bg-background transition-transform ${on ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  );
}

function toggleRow(
  label: string,
  hint: string,
  on: boolean,
  onToggle: () => void,
) {
  return (
    <div className="flex items-start justify-between gap-6">
      <Label hint={hint}>{label}</Label>
      <Switch on={on} onToggle={onToggle} label={label} />
    </div>
  );
}

const ordinalWords = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];

function ordinalWord(position: number) {
  return ordinalWords[position - 1] ?? `${position}th`;
}

function OrderPicker({
  value,
  total,
  onChange,
  label = "Order",
}: {
  value: number;
  total: number;
  onChange: (position: number) => void;
  label?: string;
}) {
  if (total < 2) return null;
  return (
    <label className="inline-block">
      <span className="block text-base font-medium text-muted-foreground mb-2">{label}</span>
      <select
        value={value + 1}
        onChange={(event) => onChange(Number(event.target.value))}
        className="bg-background border border-border px-4 py-2 text-lg text-primary focus:outline-none focus:border-accent"
      >
        {Array.from({ length: total }, (_, index) => index + 1).map((position) => (
          <option key={position} value={position}>
            {ordinalWord(position)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ImagePicker({
  value,
  photographs = platePhotographs,
  onPick,
  onUpload,
  onClear,
}: {
  value: string;
  photographs?: { id: string; label: string }[];
  onPick: (id: string) => void;
  onUpload: (file: File | undefined) => void;
  onClear?: () => void;
}) {
  return (
    <div>
      {value ? (
        <>
          <img src={resolveImage(value)} alt="" className="mb-4 h-64 w-full object-cover bg-cream" />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="mb-4 block text-lg text-muted-foreground hover:text-primary transition-colors"
            >
              Remove the photograph
            </button>
          )}
        </>
      ) : (
        <p className="mb-4 text-lg text-muted-foreground">No photograph yet.</p>
      )}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {photographs.map((photo) => (
          <button key={photo.id} type="button" onClick={() => onPick(photo.id)} className="shrink-0 text-left">
            <img
              src={resolveImage(photo.id)}
              alt={photo.label}
              className={`h-28 w-20 object-cover bg-cream ${value === photo.id ? "ring-2 ring-primary ring-offset-4" : ""}`}
            />
            <span className="mt-1 block w-20 text-sm text-muted-foreground">{photo.label}</span>
          </button>
        ))}
      </div>
      <label className="mt-4 inline-block cursor-pointer border border-border px-5 py-3 text-lg hover:border-accent">
        Add a photograph
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            onUpload(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
    </div>
  );
}

export default function AdminPage() {
  const {
    content,
    error,
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
    connection,
    email,
    saveState,
    saveError,
    canUndo,
    canRedo,
    undo,
    redo,
    saveNow,
    signIn,
    signOut,
  } = useCollection();

  const [tab, setTab] = useState<Tab>("products");
  const [productId, setProductId] = useState<string | null>(null);
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (productId && !content.products.some((product) => product.id === productId)) setProductId(null);
  }, [content.products, productId]);

  useEffect(() => {
    if (collectionId && !content.collections.some((collection) => collection.id === collectionId)) {
      setCollectionId(null);
    }
  }, [content.collections, collectionId]);

  const uploadWith = (change: (src: string) => void) => (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") change(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const product = content.products.find((item) => item.id === productId) ?? null;
  const productIndex = product ? content.products.findIndex((item) => item.id === product.id) : 0;
  const collection = content.collections.find((item) => item.id === collectionId) ?? null;
  const collectionIndex = collection ? content.collections.findIndex((item) => item.id === collection.id) : 0;

  const restore = () => {
    if (!window.confirm("Return every product, collection, word, and photograph to the original house?")) return;
    reset();
    setNotice("The house is as it was.");
    setProductId(null);
    setCollectionId(null);
  };

  if (!email) return <AdminLogin onSubmit={signIn} />;

  return (
    <div className="min-h-screen bg-background text-primary lg:flex">
      <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[24rem] lg:shrink-0 lg:flex-col lg:overflow-hidden border-b lg:border-b-0 lg:border-r border-border/70 bg-card/50">
        <div className="px-7 pt-8 pb-6">
          <img src={logoOnLight} alt="Maison Frexes" className="h-20 w-auto object-contain" />
          <div className="mt-5">
            <LanguageSelect />
          </div>
          <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
            Write the products of the house, then gather them into collections. Each collection has its own page.
          </p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-5 text-lg text-muted-foreground hover:text-primary transition-colors"
          >
            Sign out
          </button>
        </div>

        <nav className="px-4 pb-4 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          <RailButton
            active={tab === "products"}
            onClick={() => setTab("products")}
            title="Products"
            hint="Everything the house offers"
          />
          <RailButton
            active={tab === "collections"}
            onClick={() => setTab("collections")}
            title="Collections"
            hint="The collections and their pages"
          />
        </nav>

        <div className="px-3 pb-8 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:flex-1">
          {tab === "products"
            ? content.products.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProductId(item.id)}
                  className={`flex items-center gap-4 min-w-[240px] lg:min-w-0 text-left px-3 py-4 border-l-4 transition-colors ${
                    productId === item.id ? "border-accent bg-background" : "border-transparent hover:bg-background/60"
                  }`}
                >
                  <img
                    src={resolveImage(item.images[0])}
                    alt=""
                    className="h-20 w-16 object-cover bg-cream shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-serif text-2xl leading-tight truncate">{item.name || "Untitled"}</span>
                    <span className="block text-base text-muted-foreground mt-1 truncate">
                      {content.collections.find((entry) => entry.id === item.collectionId)?.name || "Not placed"}
                    </span>
                  </span>
                </button>
              ))
            : content.collections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCollectionId(item.id)}
                  className={`flex items-center gap-4 min-w-[240px] lg:min-w-0 text-left px-3 py-4 border-l-4 transition-colors ${
                    collectionId === item.id ? "border-accent bg-background" : "border-transparent hover:bg-background/60"
                  }`}
                >
                  <img src={resolveImage(item.cover)} alt="" className="h-20 w-16 object-cover bg-cream shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-serif text-2xl leading-tight truncate">{item.name || "Untitled"}</span>
                    <span className="block text-base text-muted-foreground mt-1 truncate">
                      {item.sections.length} text{item.sections.length === 1 ? "" : "s"} ·{" "}
                      {content.products.filter((entry) => entry.collectionId === item.id).length} product
                      {content.products.filter((entry) => entry.collectionId === item.id).length === 1 ? "" : "s"}
                    </span>
                  </span>
                </button>
              ))}
        </div>
      </aside>

      <main className="flex-1 px-6 py-8 md:px-12 md:py-10">
        <div className="max-w-3xl">
          <div className="sticky top-0 z-10 -mx-6 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/70 bg-background/95 px-6 py-4 backdrop-blur md:-mx-12 md:px-12">
            <p className="text-lg text-primary">
              {connection === "live" && saveState === "saving" && "Saving…"}
              {connection === "live" && saveState === "saved" && "Saved. Every visitor sees this."}
              {connection === "live" && saveState === "error" && saveError}
              {connection === "live" && saveState === "idle" && "Changes are saved for every visitor."}
              {connection === "checking" && "Opening the house…"}
              {connection !== "live" && connection !== "checking" && "The database could not be reached. Changes stay on this computer."}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-lg">
              <button
                type="button"
                onClick={() => void saveNow()}
                disabled={connection !== "live" || saveState === "saving"}
                className="border border-primary px-5 py-2 hover:text-accent transition-colors disabled:opacity-40"
              >
                Save
              </button>
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                className="border border-border px-5 py-2 hover:border-accent transition-colors disabled:opacity-30"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                className="border border-border px-5 py-2 hover:border-accent transition-colors disabled:opacity-30"
              >
                Redo
              </button>
              <Link to="/" className="hover:text-accent transition-colors">
                View the homepage
              </Link>
              <Link to="/collection" className="hover:text-accent transition-colors">
                View the collection
              </Link>
            </div>
          </div>

          {error && <p className="mb-8 text-lg text-destructive">{error}</p>}
          {notice && <p className="mb-8 font-serif text-2xl italic text-primary">{notice}</p>}

          {tab === "products" &&
            (product ? (
              <ProductStudio
                product={product}
                index={productIndex}
                total={content.products.length}
                collections={content.collections}
                onChange={(patch) => updateProduct(product.id, patch)}
                onOrder={(position) => orderProduct(product.id, position)}
                onRemove={() => {
                  if (window.confirm(`Remove ${product.name || "this product"}?`)) {
                    removeProduct(product.id);
                    setProductId(null);
                  }
                }}
                onAddLibrary={(src) => addProductImage(product.id, src)}
                onUpload={uploadWith((src) => addProductImage(product.id, src))}
                onRemoveImage={(index) => removeProductImage(product.id, index)}
                onMoveImage={(index, direction) => moveProductImage(product.id, index, direction)}
                onCover={(index) => setProductCover(product.id, index)}
              />
            ) : (
              <ProductsOverview
                products={content.products}
                collections={content.collections}
                onOpen={setProductId}
                onNew={() => setProductId(addProduct())}
                onRemove={(id) => {
                  const item = content.products.find((entry) => entry.id === id);
                  if (window.confirm(`Remove ${item?.name || "this product"}?`)) {
                    removeProduct(id);
                    if (productId === id) setProductId(null);
                  }
                }}
              />
            ))}

          {tab === "collections" &&
            (collection ? (
              <CollectionStudio
                collection={collection}
                index={collectionIndex}
                total={content.collections.length}
                products={content.products}
                onChange={(patch) => updateCollection(collection.id, patch)}
                onOrder={(position) => orderCollection(collection.id, position)}
                onRemove={() => {
                  if (window.confirm(`Remove ${collection.name || "this collection"}? Its products stay, unplaced.`)) {
                    removeCollection(collection.id);
                    setCollectionId(null);
                  }
                }}
                onAddSection={() => addSection(collection.id)}
                onSectionChange={(sectionId, patch) => updateSection(collection.id, sectionId, patch)}
                onSectionOrder={(sectionId, position) => orderSection(collection.id, sectionId, position)}
                onSectionRemove={(sectionId) => removeSection(collection.id, sectionId)}
                onProductLink={(id, linked) => updateProduct(id, { collectionId: linked ? collection.id : "" })}
              />
            ) : (
              <CollectionsOverview
                collections={content.collections}
                products={content.products}
                homeEyebrow={content.homeEyebrow}
                homeTitle={content.homeTitle}
                homeSubtitle={content.homeSubtitle}
                onHomeWords={updateContent}
                onOpen={setCollectionId}
                onNew={() => setCollectionId(addCollection())}
                onRemove={(id) => {
                  const item = content.collections.find((entry) => entry.id === id);
                  if (window.confirm(`Remove ${item?.name || "this collection"}? Its products stay, unplaced.`)) {
                    removeCollection(id);
                    if (collectionId === id) setCollectionId(null);
                  }
                }}
                onToggleVisible={(id, visibleOnCollectionPage) => updateCollection(id, { visibleOnCollectionPage })}
                onToggleFeatured={(id, featuredOnHome) => updateCollection(id, { featuredOnHome })}
                onOrder={orderCollection}
              />
            ))}

          <div className="mt-16 border-t border-border/70 pt-8">
            <button
              type="button"
              onClick={restore}
              className="text-lg text-muted-foreground hover:text-primary transition-colors"
            >
              Restore the original house
            </button>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">
              Returns every product, collection, word, and photograph to the original house. You can undo it.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminLogin({ onSubmit }: { onSubmit: (email: string, password: string) => Promise<string> }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setMessage("");
    void onSubmit(mail, password).then((result) => {
      setMessage(result);
      setPending(false);
    });
  };

  return (
    <div className="min-h-screen bg-background text-primary flex items-center justify-center px-6 py-16">
      <form onSubmit={submit} className="w-full max-w-md">
        <img src={logoOnLight} alt="Maison Frexes" className="h-20 w-auto object-contain" />
        <p className="text-accent text-[11px] tracking-[0.28em] uppercase mt-10">The house</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light mt-3">Sign in</h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          The house is kept for the house. Sign in to change it.
        </p>
        <div className="mt-10 space-y-8">
          <label className="block">
            <Label>Email</Label>
            <input
              type="email"
              autoComplete="username"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
              className={`${quietField} font-serif text-2xl`}
              required
            />
          </label>
          <label className="block">
            <Label>Password</Label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${quietField} font-serif text-2xl`}
              required
            />
          </label>
        </div>
        {message && <p className="mt-6 text-lg text-destructive">{message}</p>}
        <button type="submit" disabled={pending} className="mt-10 border border-primary px-8 py-4 font-serif text-2xl hover:text-accent disabled:opacity-50">
          {pending ? "Entering…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

function ProductsOverview({
  products,
  collections,
  onOpen,
  onNew,
  onRemove,
}: {
  products: Product[];
  collections: Collection[];
  onOpen: (id: string) => void;
  onNew: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="font-serif text-5xl font-light">Products</h1>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
            Every product of the house. A product carries a name, a description, a price if it is published, its
            photographs, and the collection it belongs to. Choose one on the left to write it.
          </p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="shrink-0 border border-primary px-6 py-3 font-serif text-2xl hover:text-accent transition-colors"
        >
          New product
        </button>
      </header>

      <Section title="The products">
        {products.length === 0 ? (
          <p className="text-lg leading-relaxed text-muted-foreground">
            No product yet. Choose New product to write the first one.
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-5 border border-border/60 p-4">
                <img src={resolveImage(product.images[0])} alt="" className="h-24 w-20 object-cover bg-cream shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-2xl leading-tight truncate">{product.name || "Untitled"}</p>
                  <p className="text-base text-muted-foreground mt-1 truncate">
                    {collections.find((entry) => entry.id === product.collectionId)?.name || "Not placed in a collection"}
                    {product.price ? ` · ${product.price}` : ""}
                    {product.inStock ? "" : " · Out of stock"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpen(product.id)}
                  className="shrink-0 border border-border px-5 py-3 text-lg hover:border-accent"
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  className="shrink-0 border border-border px-5 py-3 text-lg text-muted-foreground hover:text-primary"
                >
                  Remove product
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function ProductStudio({
  product,
  index,
  total,
  collections,
  onChange,
  onOrder,
  onRemove,
  onAddLibrary,
  onUpload,
  onRemoveImage,
  onMoveImage,
  onCover,
}: {
  product: Product;
  index: number;
  total: number;
  collections: Collection[];
  onChange: (patch: Partial<Product>) => void;
  onOrder: (position: number) => void;
  onRemove: () => void;
  onAddLibrary: (src: string) => void;
  onUpload: (file: File | undefined) => void;
  onRemoveImage: (index: number) => void;
  onMoveImage: (index: number, direction: -1 | 1) => void;
  onCover: (index: number) => void;
}) {
  const [photo, setPhoto] = useState(0);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const current = Math.min(photo, Math.max(product.images.length - 1, 0));

  useEffect(() => {
    setPhoto(0);
    setLibraryOpen(false);
  }, [product.id]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-base font-medium text-muted-foreground mb-2">Product</p>
          <h1 className="font-serif text-5xl font-light">{product.name || "Untitled"}</h1>
        </div>
        <div className="flex flex-wrap items-end gap-5 text-lg">
          <OrderPicker value={index} total={total} onChange={onOrder} />
          <button type="button" onClick={onRemove} className="border border-border px-4 py-2 text-muted-foreground hover:text-primary">
            Remove
          </button>
        </div>
      </header>

      <Section title="Words">
        <label className="block">
          <Label hint="The name visitors see.">Name</Label>
          <input
            value={product.name}
            onChange={(event) => onChange({ name: event.target.value })}
            className={`${quietField} font-serif text-4xl font-light`}
          />
        </label>

        <div>
          <Label hint="Shown under the name, and when someone opens the product.">Description</Label>
          <textarea
            value={product.description}
            rows={5}
            onChange={(event) => onChange({ description: event.target.value })}
            className={quietArea}
          />
        </div>

        <Field
          label="Price"
          hint="Free to write, such as 750 ml · On request. Leave it empty when the price is not published."
          value={product.price}
          onChange={(price) => onChange({ price })}
        />
      </Section>

      <Section title="Stock">
        {toggleRow(
          "In stock",
          product.inStock
            ? "Visitors see that this product is available."
            : "Visitors see that this product is not available for now.",
          product.inStock,
          () => onChange({ inStock: !product.inStock }),
        )}
      </Section>

      <Section title="The collection">
        <label className="block">
          <Label hint="The collection page where this product is shown.">Collection</Label>
          <select
            value={product.collectionId}
            onChange={(event) => onChange({ collectionId: event.target.value })}
            className={quietSelect}
          >
            <option value="">Not placed in a collection</option>
            {collections.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name || "Untitled collection"}
              </option>
            ))}
          </select>
        </label>
      </Section>

      <Section title="Photographs">
        <Label hint="The window slides through these, in this order. The first is the cover.">Photographs of this product</Label>

        {product.images.length > 0 && (
          <>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, imageIndex) => (
                <button key={`${product.id}-photo-${imageIndex}`} type="button" onClick={() => setPhoto(imageIndex)} className="shrink-0 text-left">
                  <img
                    src={resolveImage(image)}
                    alt=""
                    className={`h-48 w-36 object-cover bg-cream ${
                      current === imageIndex ? "ring-2 ring-primary ring-offset-4" : "opacity-80 hover:opacity-100"
                    }`}
                  />
                  <span className="block mt-2 text-base text-muted-foreground">{imageIndex === 0 ? "Cover" : imageIndex + 1}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-lg">
              <button
                type="button"
                onClick={() => {
                  onMoveImage(current, -1);
                  setPhoto(Math.max(0, current - 1));
                }}
                className="inline-flex items-center gap-1 border border-border px-4 py-2 hover:border-accent"
              >
                <ChevronLeft size={18} /> Earlier
              </button>
              <button
                type="button"
                onClick={() => {
                  onMoveImage(current, 1);
                  setPhoto(Math.min(product.images.length - 1, current + 1));
                }}
                className="inline-flex items-center gap-1 border border-border px-4 py-2 hover:border-accent"
              >
                Later <ChevronRight size={18} />
              </button>
              {current !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onCover(current);
                    setPhoto(0);
                  }}
                  className="border border-border px-4 py-2 hover:border-accent"
                >
                  Make this the cover
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onRemoveImage(current);
                  setPhoto(0);
                }}
                className="border border-border px-4 py-2 text-muted-foreground hover:text-primary"
              >
                Remove
              </button>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={() => setLibraryOpen((open) => !open)}
          className="border border-primary px-5 py-3 font-serif text-2xl hover:text-accent transition-colors"
        >
          {libraryOpen ? "Close photographs" : "Add a photograph"}
        </button>

        {libraryOpen && (
          <div>
            <p className="text-lg text-muted-foreground mb-4">Choose one. It is copied onto this product only.</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {housePhotographs.map((photoItem) => (
                <button key={photoItem.id} type="button" onClick={() => onAddLibrary(photoItem.id)} className="text-left group">
                  <img
                    src={resolveImage(photoItem.id)}
                    alt={photoItem.label}
                    className="aspect-[3/4] w-full object-cover bg-cream group-hover:opacity-80 transition-opacity"
                  />
                  <span className="block mt-2 text-base text-muted-foreground leading-snug">{photoItem.label}</span>
                </button>
              ))}
              <label className="aspect-[3/4] border border-dashed border-border flex items-end p-3 cursor-pointer hover:border-accent">
                <span className="font-serif text-2xl leading-tight">Your own photograph</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    onUpload(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

function CollectionsOverview({
  collections,
  products,
  homeEyebrow,
  homeTitle,
  homeSubtitle,
  onHomeWords,
  onOpen,
  onNew,
  onRemove,
  onToggleVisible,
  onToggleFeatured,
  onOrder,
}: {
  collections: Collection[];
  products: Product[];
  homeEyebrow: string;
  homeTitle: string;
  homeSubtitle: string;
  onHomeWords: (patch: { homeEyebrow?: string; homeTitle?: string; homeSubtitle?: string }) => void;
  onOpen: (id: string) => void;
  onNew: () => void;
  onRemove: (id: string) => void;
  onToggleVisible: (id: string, visible: boolean) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onOrder: (id: string, position: number) => void;
}) {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="font-serif text-5xl font-light">Collections</h1>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
            A collection carries a name, a description, one photograph as its cover, the texts of its own page, and the
            products shown on it. Choose one on the left to write it.
          </p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="shrink-0 border border-primary px-6 py-3 font-serif text-2xl hover:text-accent transition-colors"
        >
          New collection
        </button>
      </header>

      <Section title="The words above the collections on the first page">
        <Field label="Small line" value={homeEyebrow} onChange={(homeEyebrow) => onHomeWords({ homeEyebrow })} />
        <Field label="Title" value={homeTitle} onChange={(homeTitle) => onHomeWords({ homeTitle })} large />
        <Field label="Subtitle" value={homeSubtitle} onChange={(homeSubtitle) => onHomeWords({ homeSubtitle })} />
      </Section>

      <Section title="The collections">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Order them as they should be read. The first is the first a visitor meets.
        </p>
        {collections.map((collection, index) => (
          <div key={collection.id} className="border border-border/60 p-5 space-y-5">
            <div className="flex flex-wrap items-center gap-5">
              <img src={resolveImage(collection.cover)} alt="" className="h-24 w-20 object-cover bg-cream shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-serif text-2xl leading-tight truncate">{collection.name || "Untitled collection"}</p>
                <p className="text-base text-muted-foreground mt-1">
                  {collection.sections.length} text{collection.sections.length === 1 ? "" : "s"} ·{" "}
                  {products.filter((product) => product.collectionId === collection.id).length} product
                  {products.filter((product) => product.collectionId === collection.id).length === 1 ? "" : "s"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpen(collection.id)}
                className="shrink-0 border border-border px-5 py-3 text-lg hover:border-accent"
              >
                Open
              </button>
              <button
                type="button"
                onClick={() => onRemove(collection.id)}
                className="shrink-0 border border-border px-5 py-3 text-lg text-muted-foreground hover:text-primary"
              >
                Remove collection
              </button>
            </div>

            <div className="space-y-4 border-t border-border/60 pt-5">
              {toggleRow(
                "Shown on the collection page",
                collection.visibleOnCollectionPage
                  ? "A visitor meets it on the page that gathers every collection."
                  : "It is kept out of the collection page.",
                collection.visibleOnCollectionPage,
                () => onToggleVisible(collection.id, !collection.visibleOnCollectionPage),
              )}
              {toggleRow(
                "Featured on the first page",
                collection.featuredOnHome
                  ? "It appears in the collections section of the first page."
                  : "It is kept out of the first page.",
                collection.featuredOnHome,
                () => onToggleFeatured(collection.id, !collection.featuredOnHome),
              )}
            </div>

            <div className="flex flex-wrap items-end gap-5 text-lg">
              <OrderPicker
                value={index}
                total={collections.length}
                onChange={(position) => onOrder(collection.id, position)}
              />
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
}

function CollectionStudio({
  collection,
  index,
  total,
  products,
  onChange,
  onOrder,
  onRemove,
  onAddSection,
  onSectionChange,
  onSectionOrder,
  onSectionRemove,
  onProductLink,
}: {
  collection: Collection;
  index: number;
  total: number;
  products: Product[];
  onChange: (patch: Partial<Collection>) => void;
  onOrder: (position: number) => void;
  onRemove: () => void;
  onAddSection: () => void;
  onSectionChange: (sectionId: string, patch: Partial<CollectionSection>) => void;
  onSectionOrder: (sectionId: string, position: number) => void;
  onSectionRemove: (sectionId: string) => void;
  onProductLink: (id: string, linked: boolean) => void;
}) {
  const linked = products.filter((product) => product.collectionId === collection.id);
  const available = products.filter((product) => product.collectionId !== collection.id);

  const uploadSectionImage = (sectionId: string) => (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onSectionChange(sectionId, { image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-base font-medium text-muted-foreground mb-2">Collection page</p>
          <h1 className="font-serif text-5xl font-light">{collection.name || "Untitled collection"}</h1>
        </div>
        <div className="flex flex-wrap items-end gap-5 text-lg">
          <OrderPicker value={index} total={total} onChange={onOrder} />
          <button type="button" onClick={onRemove} className="border border-border px-4 py-2 text-muted-foreground hover:text-primary">
            Remove
          </button>
        </div>
      </header>

      <Section title="The collection">
        <Field label="Name" value={collection.name} onChange={(name) => onChange({ name })} large />
        <Field
          label="Description"
          hint="The sentence that opens the page of this collection."
          value={collection.description}
          onChange={(description) => onChange({ description })}
          multiline
        />
        <Field
          label="Line under the name"
          hint="A short line, used on the cards of this collection."
          value={collection.line}
          onChange={(line) => onChange({ line })}
        />
        <Field
          label="Small label on the photograph"
          hint="For example: The first collection."
          value={collection.badge}
          onChange={(badge) => onChange({ badge })}
        />
      </Section>

      <Section title="The cover">
        <Label hint="One photograph, the main cover of this collection.">Cover photograph</Label>
        <ImagePicker
          value={collection.cover}
          onPick={(cover) => onChange({ cover })}
          onUpload={(file) => {
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") onChange({ cover: reader.result });
            };
            reader.readAsDataURL(file);
          }}
          onClear={() => onChange({ cover: "" })}
        />
      </Section>

      <Section title="Where it is shown">
        {toggleRow(
          "Shown on the collection page",
          collection.visibleOnCollectionPage
            ? "A visitor meets it on the page that gathers every collection."
            : "It is kept out of the collection page.",
          collection.visibleOnCollectionPage,
          () => onChange({ visibleOnCollectionPage: !collection.visibleOnCollectionPage }),
        )}
        {toggleRow(
          "Featured on the first page",
          collection.featuredOnHome
            ? "It appears in the collections section of the first page."
            : "It is kept out of the first page.",
          collection.featuredOnHome,
          () => onChange({ featuredOnHome: !collection.featuredOnHome }),
        )}
      </Section>

      <Section title="The texts of the page">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Each text carries a small line, a title, a passage, one photograph, and its own visibility.
        </p>

        {collection.sections.map((section, sectionIndex) => (
          <div key={section.id} className="border border-border/60 p-5 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-serif text-2xl leading-tight">{section.title || "Untitled text"}</p>
              <div className="flex items-center gap-4">
                <span className="text-lg text-muted-foreground">{section.visible ? "Shown" : "Hidden"}</span>
                <Switch
                  on={section.visible}
                  onToggle={() => onSectionChange(section.id, { visible: !section.visible })}
                  label="Show this text"
                />
              </div>
            </div>

            <label className="block">
              <Label hint="The small line above the title, such as The name.">Small line</Label>
              <input
                value={section.kicker}
                onChange={(event) => onSectionChange(section.id, { kicker: event.target.value })}
                className={quietField}
              />
            </label>

            <label className="block">
              <Label>Title</Label>
              <input
                value={section.title}
                onChange={(event) => onSectionChange(section.id, { title: event.target.value })}
                className={`${quietField} font-serif text-3xl`}
              />
            </label>

            <div>
              <Label>Passage</Label>
              <textarea
                value={section.body}
                rows={5}
                onChange={(event) => onSectionChange(section.id, { body: event.target.value })}
                className={quietArea}
              />
            </div>

            <div>
              <Label hint="One photograph for this text.">Photograph</Label>
              <ImagePicker
                value={section.image}
                onPick={(image) => onSectionChange(section.id, { image })}
                onUpload={uploadSectionImage(section.id)}
                onClear={() => onSectionChange(section.id, { image: "" })}
              />
            </div>

            <div className="flex flex-wrap items-end gap-5 text-lg">
              <OrderPicker
                value={sectionIndex}
                total={collection.sections.length}
                onChange={(position) => onSectionOrder(section.id, position)}
              />
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Remove ${section.title || "this text"}?`)) onSectionRemove(section.id);
                }}
                className="border border-border px-4 py-2 text-muted-foreground hover:text-primary"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddSection}
          className="border border-primary px-5 py-3 font-serif text-2xl hover:text-accent transition-colors"
        >
          Add a text
        </button>
      </Section>

      <Section title="The products of this collection">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Choose among the products written under Products. A product belongs to one collection only.
        </p>

        <div>
          <Label hint="These are shown on the page of this collection.">On this collection</Label>
          {linked.length === 0 ? (
            <p className="text-lg text-muted-foreground">No product yet.</p>
          ) : (
            <div className="space-y-3">
              {linked.map((product) => (
                <div key={product.id} className="flex items-center gap-4 border border-border/60 p-3">
                  <img src={resolveImage(product.images[0])} alt="" className="h-20 w-16 object-cover bg-cream shrink-0" />
                  <span className="min-w-0 flex-1 font-serif text-2xl leading-tight truncate">
                    {product.name || "Untitled"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onProductLink(product.id, false)}
                    className="shrink-0 border border-border px-4 py-2 text-lg text-muted-foreground hover:text-primary"
                  >
                    Remove from this collection
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label hint="These belong to another collection, or to none.">Available products</Label>
          {available.length === 0 ? (
            <p className="text-lg text-muted-foreground">No other product.</p>
          ) : (
            <div className="space-y-3">
              {available.map((product) => (
                <div key={product.id} className="flex items-center gap-4 border border-border/60 p-3">
                  <img src={resolveImage(product.images[0])} alt="" className="h-20 w-16 object-cover bg-cream shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-2xl leading-tight truncate">{product.name || "Untitled"}</span>
                    <span className="block text-base text-muted-foreground mt-1 truncate">
                      {products.find((entry) => entry.id === product.id && entry.collectionId)
                        ? "In another collection"
                        : "Not placed"}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onProductLink(product.id, true)}
                    className="shrink-0 border border-border px-4 py-2 text-lg hover:border-accent"
                  >
                    Add to this collection
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
