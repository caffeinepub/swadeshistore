import { motion } from "motion/react";

export default function BannerStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12 py-8">
      <motion.div
        className="rounded-3xl p-10 relative overflow-hidden min-h-[180px] flex flex-col justify-end"
        style={{ background: "linear-gradient(135deg, #E8520A, #C8960C)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute top-[-10px] right-[-10px] pointer-events-none select-none leading-none"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "7rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.08)",
          }}
        >
          🏺
        </div>
        <div
          className="text-xs tracking-widest uppercase mb-1"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          New Collection
        </div>
        <div
          className="font-display font-bold text-white leading-tight mb-4"
          style={{ fontSize: "1.7rem" }}
        >
          Rajasthan
          <br />
          Handicraft Festival
        </div>
        <button
          type="button"
          className="inline-block rounded-full px-6 py-2 text-sm font-bold transition-transform"
          style={{
            background: "white",
            color: "#E8520A",
            fontFamily: "Nunito",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Shop the Collection
        </button>
      </motion.div>

      <motion.div
        className="rounded-3xl p-10 relative overflow-hidden min-h-[180px] flex flex-col justify-end"
        style={{ background: "linear-gradient(135deg, #0D1B2A, #1A2E42)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div
          className="absolute top-[-10px] right-[-10px] pointer-events-none select-none leading-none"
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "7rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.08)",
          }}
        >
          🌿
        </div>
        <div
          className="text-xs tracking-widest uppercase mb-1"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Going Green
        </div>
        <div
          className="font-display font-bold text-white leading-tight mb-4"
          style={{ fontSize: "1.7rem" }}
        >
          Organic &amp;
          <br />
          Ayurvedic Range
        </div>
        <button
          type="button"
          className="inline-block rounded-full px-6 py-2 text-sm font-bold transition-transform"
          style={{
            background: "white",
            color: "#0D1B2A",
            fontFamily: "Nunito",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Explore Now
        </button>
      </motion.div>
    </div>
  );
}
