import tree from "@/assets/naqchet/tree.png";
import spine from "@/assets/naqchet/spine.png";
import bar from "@/assets/naqchet/bar.png";
import loom from "@/assets/naqchet/loom.png";
import lattice from "@/assets/naqchet/lattice.png";
import diamond from "@/assets/naqchet/diamond.png";
import crescent from "@/assets/naqchet/crescent.png";
import grove from "@/assets/naqchet/grove.png";
import kilim from "@/assets/naqchet/kilim.png";

export const marks = { tree, spine, bar, loom, lattice, diamond, crescent, grove, kilim };

export function Mark({
  src,
  className = "",
  deep = false,
}: {
  src: string;
  className?: string;
  deep?: boolean;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none absolute select-none object-contain ${
        deep ? "opacity-40" : "opacity-[0.32]"
      } ${className}`}
    />
  );
}

export function EdgeRule({
  src,
  className = "",
  deep = false,
}: {
  src: string;
  className?: string;
  deep?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-6 hidden items-center justify-between md:flex ${className}`}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <img
          key={index}
          src={src}
          alt=""
          draggable={false}
          className={`h-4 w-auto object-contain ${deep ? "opacity-35" : "opacity-25"}`}
        />
      ))}
    </div>
  );
}
