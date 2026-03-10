const LINKS = {
  Shop: [
    "Handicrafts",
    "Textiles & Fabrics",
    "Organic Products",
    "Jewellery",
    "Art & Home Decor",
    "Food & Spices",
  ],
  Help: [
    "My Account",
    "Track My Order",
    "Returns & Refunds",
    "Shipping Policy",
    "FAQs",
    "Contact Us",
  ],
  "Sell With Us": [
    "Become a Seller",
    "Artisan Programme",
    "Seller Dashboard",
    "Seller Support",
    "About SwadeshiStore",
    "Careers",
  ],
};

function setLinkColor(el: HTMLElement, color: string) {
  el.style.color = color;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "swadeshistore";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="px-6 md:px-12 pt-14 pb-6"
      style={{ background: "#070F1A", color: "rgba(255,255,255,0.7)" }}
    >
      <div
        className="grid gap-10 mb-10"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
      >
        {/* Brand */}
        <div style={{ gridColumn: "span 2" }}>
          <span
            className="font-display font-bold block mb-4"
            style={{ color: "#FF7A35", fontSize: "1.6rem" }}
          >
            Swadeshi<span style={{ color: "#16A314" }}>Store</span>
          </span>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 260 }}>
            India&apos;s largest marketplace for authentic Indian-made products.
            Supporting artisans, small businesses and local manufacturers since
            2014.
          </p>
          <div
            className="flex h-1 rounded mt-4 overflow-hidden"
            style={{ width: 120 }}
          >
            <div className="flex-1" style={{ background: "#E8520A" }} />
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ background: "#0E7A0D" }} />
          </div>
        </div>

        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading}>
            <h4
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: "white" }}
            >
              {heading}
            </h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-left"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "Nunito",
                    }}
                    onMouseEnter={(e) => {
                      setLinkColor(e.currentTarget, "#FF7A35");
                    }}
                    onMouseLeave={(e) => {
                      setLinkColor(e.currentTarget, "rgba(255,255,255,0.6)");
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-wrap justify-between items-center gap-4 pt-6 text-xs"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div>
          © {year}{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
          >
            Built with ❤️ using caffeine.ai
          </a>{" "}
          · Made with ❤️ in India 🇮🇳
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span>We Accept:</span>
          {["UPI", "VISA", "MC", "RuPay", "NetBanking"].map((badge) => (
            <span
              key={badge}
              className="rounded px-2 py-1 text-xs font-bold text-white"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              {badge}
            </span>
          ))}
        </div>
        <div>
          <button
            type="button"
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.4)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "Nunito",
            }}
          >
            Privacy · Terms · Sitemap
          </button>
        </div>
      </div>
    </footer>
  );
}
