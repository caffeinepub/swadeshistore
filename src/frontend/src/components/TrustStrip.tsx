const TRUST_ITEMS = [
  { icon: "🚚", title: "Free Delivery", sub: "Orders above ₹499" },
  { icon: "🔒", title: "Secure Payment", sub: "UPI, Cards, NetBanking" },
  { icon: "✅", title: "100% Genuine", sub: "Verified Indian makers" },
  { icon: "↩️", title: "Easy Returns", sub: "7-day return policy" },
  { icon: "🤝", title: "Artisan First", sub: "Fair trade guaranteed" },
];

export default function TrustStrip() {
  return (
    <div
      className="flex flex-wrap justify-around gap-4 px-6 md:px-12 py-6"
      style={{ background: "white", borderBottom: "1px solid #EDE0CE" }}
    >
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-3 text-sm"
          style={{ color: "#7A6A5A" }}
        >
          <span className="text-2xl">{item.icon}</span>
          <div>
            <strong style={{ color: "#2C1810", fontWeight: 700 }}>
              {item.title}
            </strong>
            <div>{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
