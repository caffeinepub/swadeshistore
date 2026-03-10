import { motion } from "motion/react";
import { CAT_BG, type CartItem, type LocalProduct } from "../data/products";

interface ProductCardProps {
  product: LocalProduct;
  index: number;
  wishlist: number[];
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export default function ProductCard({
  product: p,
  index,
  wishlist,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const isWished = wishlist.includes(p.id);
  const badgeColor =
    p.badge === "New" ? "#0E7A0D" : p.badge === "Sale" ? "#C8960C" : "#E8520A";

  return (
    <motion.div
      data-ocid={`products.item.${index + 1}`}
      className="bg-white rounded-2xl overflow-hidden border cursor-pointer"
      style={{ borderColor: "#EDE0CE" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      whileHover={{ y: -6, boxShadow: "0 20px 52px rgba(0,0,0,0.12)" }}
    >
      <div
        className="h-48 flex items-center justify-center relative"
        style={{ background: CAT_BG[p.cat] || "#FFF8EE" }}
      >
        {p.badge && (
          <span
            className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
            style={{ background: badgeColor }}
          >
            {p.badge}
          </span>
        )}
        <button
          type="button"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: "1rem" }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(p.id);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isWished ? "❤️" : "🤍"}
        </button>
        <span className="text-6xl">{p.emoji}</span>
      </div>

      <div className="p-4">
        <div
          className="text-xs uppercase tracking-wider mb-1"
          style={{ color: "#7A6A5A" }}
        >
          {p.cat}
        </div>
        <div
          className="text-sm font-bold mb-1 leading-snug"
          style={{ color: "#0D1B2A" }}
        >
          {p.name}
        </div>
        <div className="text-xs mb-2" style={{ color: "#7A6A5A" }}>
          by{" "}
          <span style={{ color: "#0E7A0D", fontWeight: 600 }}>{p.seller}</span>{" "}
          · {p.loc}
        </div>
        <div className="flex items-center gap-1 text-xs mb-3">
          <span style={{ color: "#C8960C" }}>★★★★★</span>
          <span>{p.rating}</span>
          <span style={{ color: "#7A6A5A" }}>({p.reviews})</span>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <span className="text-base font-bold" style={{ color: "#E8520A" }}>
              ₹{p.price.toLocaleString("en-IN")}
            </span>
            <span
              className="text-xs ml-1 line-through"
              style={{ color: "#7A6A5A" }}
            >
              ₹{p.oldPrice.toLocaleString("en-IN")}
            </span>
            <span
              className="text-xs ml-1 font-bold"
              style={{ color: "#0E7A0D" }}
            >
              {p.save} off
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(p.id);
            }}
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap"
            style={{ background: "#0D1B2A", fontFamily: "Nunito" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E8520A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0D1B2A";
            }}
          >
            Add +
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export type { CartItem };
