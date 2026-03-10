export default function Topbar() {
  return (
    <div
      className="hidden md:flex items-center justify-between px-12 py-1.5 text-xs"
      style={{ background: "#0D1B2A", color: "rgba(255,255,255,0.75)" }}
    >
      <span>🇮🇳 SwadeshiStore</span>
      <div className="flex-1 mx-8 overflow-hidden">
        <span className="marquee-inner">
          🎉 Free shipping on orders above ₹499 &nbsp;·&nbsp; 🛕 100% Indian
          Made Products &nbsp;·&nbsp; 🤝 Support Local Artisans &nbsp;·&nbsp; 🔒
          Secure Payments &nbsp;·&nbsp; 🎁 New arrivals every week!
        </span>
      </div>
      <div className="flex gap-6 whitespace-nowrap">
        <span>📞 1800-SWADESHI</span>
        <span>✉️ help@swadeshistore.in</span>
      </div>
    </div>
  );
}
