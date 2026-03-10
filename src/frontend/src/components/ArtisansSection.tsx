import { motion } from "motion/react";

const ARTISANS = [
  {
    avatar: "👩",
    name: "Meera Devi",
    craft: "Pottery & Ceramics",
    loc: "Jaipur, Rajasthan",
    products: 184,
    rating: "4.9★",
    exp: "12yr",
  },
  {
    avatar: "👨",
    name: "Rajan Khatri",
    craft: "Block Printing",
    loc: "Sanganer, Rajasthan",
    products: 96,
    rating: "4.8★",
    exp: "20yr",
  },
  {
    avatar: "👩",
    name: "Lakshmi Nair",
    craft: "Kasavu Weaving",
    loc: "Thrissur, Kerala",
    products: 143,
    rating: "5.0★",
    exp: "15yr",
  },
  {
    avatar: "👨",
    name: "Arjun Verma",
    craft: "Madhubani Art",
    loc: "Mithila, Bihar",
    products: 67,
    rating: "4.7★",
    exp: "8yr",
  },
  {
    avatar: "👩",
    name: "Priya Sharma",
    craft: "Organic Skincare",
    loc: "Coorg, Karnataka",
    products: 52,
    rating: "4.9★",
    exp: "5yr",
  },
];

export default function ArtisansSection() {
  return (
    <section className="px-6 md:px-12 py-16 bg-white" id="artisans">
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "#E8520A" }}
          >
            The Makers
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: "#0D1B2A",
            }}
          >
            Meet Our{" "}
            <em style={{ color: "#E8520A", fontStyle: "italic" }}>Artisans</em>
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
          View All →
        </button>
      </div>

      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {ARTISANS.map((a, i) => (
          <motion.div
            key={a.name}
            className="border rounded-2xl p-6 text-center cursor-pointer transition-all"
            style={{ borderColor: "#EDE0CE" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{
              borderColor: "#E8520A",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl"
              style={{ background: "#FFF0E8" }}
            >
              {a.avatar}
            </div>
            <div
              className="font-bold text-sm mb-0.5"
              style={{ color: "#0D1B2A" }}
            >
              {a.name}
            </div>
            <div
              className="text-xs font-semibold mb-1"
              style={{ color: "#E8520A" }}
            >
              {a.craft}
            </div>
            <div className="text-xs" style={{ color: "#7A6A5A" }}>
              📍 {a.loc}
            </div>
            <div
              className="flex justify-center gap-4 mt-3 pt-3"
              style={{ borderTop: "1px solid #EDE0CE" }}
            >
              {[
                { num: a.products, lbl: "Products" },
                { num: a.rating, lbl: "Rating" },
                { num: a.exp, lbl: "Experience" },
              ].map((s) => (
                <div key={s.lbl} className="text-center">
                  <span
                    className="block text-xs font-bold"
                    style={{ color: "#0D1B2A" }}
                  >
                    {s.num}
                  </span>
                  <span className="text-xs" style={{ color: "#7A6A5A" }}>
                    {s.lbl}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
