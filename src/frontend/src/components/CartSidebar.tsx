import { Trash2, X } from "lucide-react";
import type { CartItem } from "../data/products";

interface CartSidebarProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  open,
  items,
  onClose,
  onChangeQty,
  onRemove,
  onCheckout,
}: CartSidebarProps) {
  if (!open) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div
      className="fixed inset-0 z-[2000] flex justify-end"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        data-ocid="cart.panel"
        aria-label="Shopping cart"
        className="bg-white w-[380px] max-w-[95vw] h-full flex flex-col slide-in-right"
        style={{ boxShadow: "-8px 0 40px rgba(0,0,0,0.2)" }}
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid #EDE0CE" }}
        >
          <span
            className="font-display text-2xl font-bold"
            style={{ color: "#0D1B2A" }}
          >
            🛒 Your Cart
          </span>
          <button
            type="button"
            data-ocid="cart.close_button"
            onClick={onClose}
            className="p-1 rounded-lg"
            style={{ color: "#7A6A5A" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div
              data-ocid="cart.empty_state"
              className="text-center py-12"
              style={{ color: "#7A6A5A" }}
            >
              <div className="text-5xl mb-4">🛒</div>
              <p>
                Your cart is empty.
                <br />
                Start shopping to add items!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4"
                style={{ borderBottom: "1px solid #EDE0CE" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "#FFF8EE" }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <div
                    className="text-sm font-bold"
                    style={{ color: "#0D1B2A" }}
                  >
                    {item.name}
                  </div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: "#E8520A" }}
                  >
                    ₹{item.price.toLocaleString("en-IN")}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => onChangeQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        background: "#FFF8EE",
                        border: "1px solid #EDE0CE",
                      }}
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold min-w-[20px] text-center">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onChangeQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        background: "#FFF8EE",
                        border: "1px solid #EDE0CE",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="p-1"
                  style={{ color: "#7A6A5A" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#7A6A5A";
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: "1px solid #EDE0CE" }}>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery</span>
              <span style={{ color: "#0E7A0D", fontWeight: 600 }}>FREE</span>
            </div>
            <div
              className="flex justify-between font-bold text-base pt-2 mb-4"
              style={{ borderTop: "1px solid #EDE0CE", color: "#0D1B2A" }}
            >
              <span>Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <button
              type="button"
              data-ocid="cart.submit_button"
              onClick={onCheckout}
              className="w-full rounded-xl py-4 text-base font-bold text-white"
              style={{ background: "#E8520A", fontFamily: "Nunito" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FF7A35";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E8520A";
              }}
            >
              Proceed to Checkout 🔒
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
