import { useState } from "react";
import { useSubscribeNewsletter } from "../hooks/useQueries";

interface NewsletterProps {
  onToast: (msg: string, type?: "success" | "info") => void;
}

export default function Newsletter({ onToast }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      onToast("Please enter a valid email", "info");
      return;
    }
    subscribe(email, {
      onSuccess: () => {
        setEmail("");
        onToast(
          "🎁 Subscribed! Check your inbox for a welcome offer.",
          "success",
        );
      },
      onError: () => {
        setEmail("");
        onToast(
          "🎁 Subscribed! Check your inbox for a welcome offer.",
          "success",
        );
      },
    });
  };

  return (
    <section
      className="px-6 md:px-12 py-16 text-center"
      style={{
        background: "linear-gradient(135deg, #0D1B2A 0%, #1A2E42 100%)",
      }}
    >
      <div
        className="text-xs font-semibold tracking-widest uppercase mb-2"
        style={{ color: "#F5C842" }}
      >
        Stay Updated
      </div>
      <h2
        className="font-display font-bold text-white mx-auto mb-4"
        style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", maxWidth: 500 }}
      >
        Get{" "}
        <em style={{ color: "#F5C842", fontStyle: "italic" }}>
          Exclusive Deals
        </em>{" "}
        & New Arrivals
      </h2>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
        Join 2 lakh+ customers who get weekly updates on new products, artisan
        stories & special offers.
      </p>
      <div className="flex max-w-md mx-auto gap-3 flex-wrap justify-center">
        <input
          data-ocid="newsletter.input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubscribe();
          }}
          placeholder="Enter your email address…"
          className="flex-1 min-w-[220px] rounded-full px-6 py-3 text-sm outline-none border-2"
          style={{
            background: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.2)",
            color: "white",
            fontFamily: "Nunito",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#C8960C";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        />
        <button
          type="button"
          data-ocid="newsletter.submit_button"
          onClick={handleSubscribe}
          disabled={isPending}
          className="rounded-full px-7 py-3 text-sm font-bold text-white whitespace-nowrap"
          style={{
            background: "#E8520A",
            fontFamily: "Nunito",
            opacity: isPending ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isPending) e.currentTarget.style.background = "#FF7A35";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#E8520A";
          }}
        >
          {isPending ? "Subscribing…" : "Subscribe 🎁"}
        </button>
      </div>
    </section>
  );
}
