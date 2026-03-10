import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Absolutely love the Rajasthani pottery I ordered! The quality is incredible and it arrived beautifully packed. Feels great knowing I'm supporting a local artisan.",
    avatar: "😊",
    name: "Anjali Mehta",
    loc: "Mumbai, Maharashtra",
  },
  {
    stars: 5,
    text: "The organic honey from Kerala is the best I've ever tasted! SwadeshiStore is my go-to for anything authentic. Fast delivery and great packaging too.",
    avatar: "😄",
    name: "Karthik Rajan",
    loc: "Chennai, Tamil Nadu",
  },
  {
    stars: 5,
    text: "I gifted my mother a Banarasi saree for Diwali — she was in tears! The craftsmanship is beautiful. SwadeshiStore makes it so easy to celebrate India.",
    avatar: "🙂",
    name: "Pooja Gupta",
    loc: "Delhi, NCR",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-16" style={{ background: "#FFF8EE" }}>
      <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "#E8520A" }}
          >
            Customer Love
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: "#0D1B2A",
            }}
          >
            What Our{" "}
            <em style={{ color: "#E8520A", fontStyle: "italic" }}>
              Customers Say
            </em>
          </h2>
        </div>
      </div>

      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            className="bg-white rounded-2xl p-6 border"
            style={{ borderColor: "#EDE0CE" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="text-base mb-3" style={{ color: "#C8960C" }}>
              ★★★★★
            </div>
            <p
              className="text-sm leading-relaxed mb-4 italic"
              style={{ color: "#7A6A5A" }}
            >
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ background: "#FFF0E8" }}
              >
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "#0D1B2A" }}>
                  {t.name}
                </div>
                <div className="text-xs" style={{ color: "#7A6A5A" }}>
                  {t.loc}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
