import type { LocalProduct } from "../data/products";
import ProductCard from "./ProductCard";

interface FeaturedProductsProps {
  products: LocalProduct[];
  wishlist: number[];
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export default function FeaturedProducts({
  products,
  wishlist,
  onAddToCart,
  onToggleWishlist,
}: FeaturedProductsProps) {
  return (
    <section className="px-6 md:px-12 py-16" id="featured">
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "#E8520A" }}
          >
            Hand-Picked for You
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: "#0D1B2A",
            }}
          >
            Featured{" "}
            <em style={{ color: "#E8520A", fontStyle: "italic" }}>Products</em>
          </h2>
        </div>
        <button
          type="button"
          className="text-sm font-semibold"
          style={{
            color: "#E8520A",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "Nunito",
          }}
        >
          View All Products →
        </button>
      </div>

      {products.length === 0 ? (
        <div
          data-ocid="products.empty_state"
          className="text-center py-12"
          style={{ color: "#7A6A5A" }}
        >
          No products found in this category.
        </div>
      ) : (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              wishlist={wishlist}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}
