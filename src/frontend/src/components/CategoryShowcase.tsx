import { motion } from "motion/react";

const CATEGORIES = [
  { key: "handicrafts", icon: "🏺", name: "Handicrafts", count: "1,240+" },
  { key: "textiles", icon: "🧵", name: "Textiles", count: "980+" },
  { key: "organic", icon: "🌿", name: "Organic Goods", count: "650+" },
  { key: "jewellery", icon: "💎", name: "Jewellery", count: "430+" },
  { key: "art", icon: "🎨", name: "Art & Decor", count: "820+" },
  { key: "food", icon: "🍯", name: "Food & Spices", count: "560+" },
  { key: "ayurveda", icon: "🌸", name: "Ayurveda", count: "310+" },
  { key: "toys", icon: "🪆", name: "Toys & Games", count: "280+" },
];

interface CategoryShowcaseProps {
  onSelect: (cat: string) => void;
}

export default function CategoryShowcase({ onSelect }: CategoryShowcaseProps) {
  return (
    <section className="px-6 md:px-12 py-16" style={{ background: "#FFF8EE" }}>
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "#E8520A" }}
          >
            Browse By
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: "#0D1B2A",
            }}
          >
            Shop by{" "}
            <em style={{ color: "#E8520A", fontStyle: "italic" }}>Category</em>
          </h2>
        </div>
      </div>
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
      >
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            className="bg-white rounded-2xl p-6 text-center border-2 transition-all cursor-pointer"
            style={{ borderColor: "transparent", fontFamily: "Nunito" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
              borderColor: "#E8520A",
            }}
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <div
              className="text-sm font-bold mb-1"
              style={{ color: "#0D1B2A" }}
            >
              {cat.name}
            </div>
            <div className="text-xs" style={{ color: "#7A6A5A" }}>
              {cat.count} items
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
