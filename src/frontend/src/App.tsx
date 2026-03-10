import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import ArtisansSection from "./components/ArtisansSection";
import AuthModal from "./components/AuthModal";
import BannerStrip from "./components/BannerStrip";
import CartSidebar from "./components/CartSidebar";
import CategoryBar from "./components/CategoryBar";
import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Testimonials from "./components/Testimonials";
import Toast from "./components/Toast";
import Topbar from "./components/Topbar";
import TrustStrip from "./components/TrustStrip";
import { ALL_PRODUCTS } from "./data/products";
import type { CartItem } from "./data/products";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "info",
  });

  const showToast = useCallback(
    (message: string, type: "success" | "info" = "success") => {
      setToast({ visible: true, message, type });
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // Filter products
  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === "all" || p.cat === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.seller.toLowerCase().includes(q) ||
      p.loc.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (id: number) => {
    const product = ALL_PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ ${product.name} added to cart!`, "success");
  };

  const handleToggleWishlist = (id: number) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast("Removed from wishlist", "info");
        return prev.filter((x) => x !== id);
      }
      showToast("❤️ Added to wishlist!", "success");
      return [...prev, id];
    });
  };

  const handleChangeQty = (id: number, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
      return updated;
    });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    showToast("🔒 Redirecting to secure checkout…", "info");
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FFFDF6", fontFamily: "Nunito, sans-serif" }}
    >
      <Toaster />

      <Topbar />

      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          if (activeCategory !== "all") setActiveCategory("all");
        }}
        onSearchSubmit={() => {
          document
            .getElementById("featured")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
      />

      <CategoryBar active={activeCategory} onSelect={handleSelectCategory} />

      <main>
        <Hero
          onShopNow={() =>
            document
              .getElementById("featured")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onMeetArtisans={() =>
            document
              .getElementById("artisans")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <TrustStrip />

        <CategoryShowcase onSelect={handleSelectCategory} />

        <FeaturedProducts
          products={filteredProducts}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
        />

        <BannerStrip />

        <ArtisansSection />

        <Testimonials />

        <Newsletter onToast={showToast} />
      </main>

      <Footer />

      <CartSidebar
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onChangeQty={handleChangeQty}
        onRemove={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
        onCheckout={handleCheckout}
      />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onToast={showToast}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
    </div>
  );
}
