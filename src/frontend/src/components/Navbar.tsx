import { Heart, Search, ShoppingCart, User } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onSearchSubmit: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

function setElColor(el: HTMLElement, color: string) {
  el.style.color = color;
}
function setElBg(el: HTMLElement, color: string) {
  el.style.background = color;
}

export default function Navbar({
  cartCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenCart,
  onOpenAuth,
}: NavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 md:px-12 py-3"
      style={{
        background: "rgba(255,253,246,0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #EDE0CE",
      }}
    >
      {/* Logo as button scrolling to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-display text-3xl font-bold whitespace-nowrap"
        style={{
          color: "#E8520A",
          textDecoration: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Swadeshi<span style={{ color: "#0E7A0D" }}>Store</span>
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <input
          data-ocid="nav.search_input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearchSubmit();
          }}
          placeholder="Search for handicrafts, textiles, organic products…"
          className="w-full rounded-full py-2.5 pl-5 pr-14 text-sm outline-none border-2 transition-colors"
          style={{
            borderColor: searchQuery ? "#E8520A" : "#EDE0CE",
            background: "white",
            fontFamily: "Nunito, sans-serif",
          }}
        />
        <button
          type="button"
          onClick={onSearchSubmit}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-4 py-1.5 text-sm text-white"
          style={{ background: "#E8520A" }}
          onMouseEnter={(e) => {
            setElBg(e.currentTarget, "#FF7A35");
          }}
          onMouseLeave={(e) => {
            setElBg(e.currentTarget, "#E8520A");
          }}
        >
          <Search size={14} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          data-ocid="nav.login_button"
          onClick={onOpenAuth}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs"
          style={{ color: "#7A6A5A", fontFamily: "Nunito" }}
          onMouseEnter={(e) => {
            setElColor(e.currentTarget, "#E8520A");
          }}
          onMouseLeave={(e) => {
            setElColor(e.currentTarget, "#7A6A5A");
          }}
        >
          <User size={20} />
          Login
        </button>
        <button
          type="button"
          data-ocid="nav.wishlist_button"
          onClick={onOpenAuth}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs"
          style={{ color: "#7A6A5A", fontFamily: "Nunito" }}
          onMouseEnter={(e) => {
            setElColor(e.currentTarget, "#E8520A");
          }}
          onMouseLeave={(e) => {
            setElColor(e.currentTarget, "#7A6A5A");
          }}
        >
          <Heart size={20} />
          Wishlist
        </button>
        <button
          type="button"
          data-ocid="nav.cart_button"
          onClick={onOpenCart}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs relative"
          style={{ color: "#7A6A5A", fontFamily: "Nunito" }}
          onMouseEnter={(e) => {
            setElColor(e.currentTarget, "#E8520A");
          }}
          onMouseLeave={(e) => {
            setElColor(e.currentTarget, "#7A6A5A");
          }}
        >
          <ShoppingCart size={20} />
          Cart
          {cartCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
              style={{
                background: "#E8520A",
                fontSize: "0.6rem",
                fontWeight: 700,
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
        <button
          type="button"
          data-ocid="nav.register_button"
          onClick={onOpenAuth}
          className="ml-2 rounded-full px-5 py-2 text-sm font-bold text-white"
          style={{ background: "#E8520A", fontFamily: "Nunito" }}
          onMouseEnter={(e) => {
            setElBg(e.currentTarget, "#FF7A35");
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            setElBg(e.currentTarget, "#E8520A");
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Register Free
        </button>
      </div>
    </nav>
  );
}
