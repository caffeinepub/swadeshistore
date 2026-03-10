import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "info";
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, type, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3200);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div
      data-ocid="app.toast"
      className="fixed bottom-8 right-8 flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-medium text-white max-w-xs z-[9999] transition-all duration-300"
      style={{
        background: "#0D1B2A",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        borderLeft: `4px solid ${type === "success" ? "#0E7A0D" : "#E8520A"}`,
        transform: visible ? "translateY(0)" : "translateY(120px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {message}
    </div>
  );
}
