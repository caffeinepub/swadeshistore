const CATEGORIES = [
  { key: "all", label: "All", icon: "🏠" },
  { key: "handicrafts", label: "Handicrafts", icon: "🏺" },
  { key: "textiles", label: "Textiles", icon: "🧵" },
  { key: "organic", label: "Organic", icon: "🌿" },
  { key: "jewellery", label: "Jewellery", icon: "💎" },
  { key: "art", label: "Art & Decor", icon: "🎨" },
  { key: "food", label: "Food & Spices", icon: "🍯" },
  { key: "ayurveda", label: "Ayurveda", icon: "🌸" },
  { key: "toys", label: "Toys", icon: "🪆" },
];

interface CategoryBarProps {
  active: string;
  onSelect: (cat: string) => void;
}

export default function CategoryBar({ active, onSelect }: CategoryBarProps) {
  return (
    <div
      className="flex items-center overflow-x-auto scrollbar-hide px-6 md:px-12"
      style={{ background: "#FFF8EE", borderBottom: "1px solid #EDE0CE" }}
    >
      {CATEGORIES.map((cat) => (
        <button
          type="button"
          key={cat.key}
          data-ocid="catbar.tab"
          onClick={() => onSelect(cat.key)}
          className="flex flex-col items-center gap-1 px-5 py-3 whitespace-nowrap text-xs font-medium transition-all border-b-2 flex-shrink-0"
          style={{
            color: active === cat.key ? "#E8520A" : "#7A6A5A",
            borderBottomColor: active === cat.key ? "#E8520A" : "transparent",
            fontFamily: "Nunito",
          }}
        >
          <span className="text-xl">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}
