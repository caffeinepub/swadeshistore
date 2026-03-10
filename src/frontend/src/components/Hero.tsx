import { motion } from "motion/react";

interface HeroProps {
  onShopNow: () => void;
  onMeetArtisans: () => void;
}

export default function Hero({ onShopNow, onMeetArtisans }: HeroProps) {
  return (
    <section
      className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-0 px-6 md:px-12 py-16 md:py-20 overflow-hidden min-h-[480px]"
      style={{ background: "#0D1B2A" }}
    >
      <div
        className="absolute right-0 top-0 w-[55%] h-full hidden md:block"
        style={{
          background:
            "linear-gradient(135deg, #E8520A 0%, #C8960C 45%, #0E7A0D 100%)",
          clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 w-[55%] h-full hidden md:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 18px)",
          clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#F5C842",
          }}
        >
          🇮🇳 &nbsp;100% Made in India
        </div>

        <h1
          className="font-display font-bold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
        >
          Shop{" "}
          <em style={{ color: "#F5C842", fontStyle: "italic" }}>Authentic</em>
          <br />
          Indian Products
        </h1>

        <p
          className="text-sm md:text-base leading-relaxed mb-8 max-w-md"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Discover thousands of handcrafted, organic, and artisan products
          directly from Indian makers. Every purchase supports a local family.
        </p>

        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={onShopNow}
            className="rounded-full px-8 py-3 text-base font-bold text-white transition-all"
            style={{ background: "#E8520A", fontFamily: "Nunito" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FF7A35";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(232,82,10,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E8520A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Shop Now 🛍️
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={onMeetArtisans}
            className="rounded-full px-8 py-3 text-base font-semibold text-white transition-all"
            style={{
              background: "transparent",
              border: "2px solid rgba(255,255,255,0.4)",
              fontFamily: "Nunito",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
            }}
          >
            Meet Our Artisans
          </button>
        </div>
      </motion.div>

      <div className="relative z-10 hidden md:flex justify-end items-center">
        <div className="flex gap-4 flex-wrap justify-center">
          {[
            { emoji: "🏺", name: "Rajasthan Pottery", price: "₹849" },
            {
              emoji: "🧵",
              name: "Banarasi Silk",
              price: "₹2,499",
              offset: true,
            },
            { emoji: "🌿", name: "Organic Honey", price: "₹399" },
          ].map((card) => (
            <div
              key={card.name}
              className="rounded-2xl p-5 w-36 text-center"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                transform: card.offset ? "translateY(20px)" : undefined,
              }}
            >
              <div className="text-5xl mb-2">{card.emoji}</div>
              <div className="text-xs font-bold" style={{ color: "#0D1B2A" }}>
                {card.name}
              </div>
              <div
                className="text-sm font-bold mt-1"
                style={{ color: "#E8520A" }}
              >
                {card.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
