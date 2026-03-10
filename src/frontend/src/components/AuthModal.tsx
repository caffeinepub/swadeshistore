import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onToast: (msg: string, type?: "success" | "info") => void;
}

export default function AuthModal({ open, onClose, onToast }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginData, setLoginData] = useState({ contact: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleLogin = () => {
    onClose();
    onToast("👋 Welcome back!", "success");
  };
  const handleRegister = () => {
    onClose();
    onToast("🎉 Account created! Welcome to SwadeshiStore!", "success");
  };
  const setInputBorder = (el: HTMLInputElement, color: string) => {
    el.style.borderColor = color;
  };
  const setButtonBg = (el: HTMLButtonElement, color: string) => {
    el.style.background = color;
  };

  return (
    <div
      data-ocid="auth.modal"
      className="fixed inset-0 z-[3000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden pop-in">
        {/* Header */}
        <div
          className="relative px-8 py-8 text-center"
          style={{ background: "linear-gradient(135deg, #E8520A, #C8960C)" }}
        >
          <button
            type="button"
            data-ocid="auth.close_button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <X size={18} />
          </button>
          <h2 className="font-display text-3xl font-bold text-white mb-1">
            Welcome 🙏
          </h2>
          <p className="text-sm text-white/80">
            Join SwadeshiStore — Support Indian Makers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: "1px solid #EDE0CE" }}>
          <button
            type="button"
            data-ocid="auth.login_tab"
            onClick={() => setTab("login")}
            className="flex-1 py-3.5 text-sm font-semibold transition-all border-b-2"
            style={{
              color: tab === "login" ? "#E8520A" : "#7A6A5A",
              borderBottomColor: tab === "login" ? "#E8520A" : "transparent",
              fontFamily: "Nunito",
            }}
          >
            Login
          </button>
          <button
            type="button"
            data-ocid="auth.register_tab"
            onClick={() => setTab("register")}
            className="flex-1 py-3.5 text-sm font-semibold transition-all border-b-2"
            style={{
              color: tab === "register" ? "#E8520A" : "#7A6A5A",
              borderBottomColor: tab === "register" ? "#E8520A" : "transparent",
              fontFamily: "Nunito",
            }}
          >
            Register
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {tab === "login" ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="login-contact"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#7A6A5A" }}
                >
                  Mobile / Email
                </label>
                <input
                  id="login-contact"
                  type="text"
                  placeholder="Enter mobile or email"
                  value={loginData.contact}
                  onChange={(e) =>
                    setLoginData((p) => ({ ...p, contact: e.target.value }))
                  }
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none border-2"
                  style={{ borderColor: "#EDE0CE", fontFamily: "Nunito" }}
                  onFocus={(e) => {
                    setInputBorder(e.currentTarget, "#E8520A");
                  }}
                  onBlur={(e) => {
                    setInputBorder(e.currentTarget, "#EDE0CE");
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#7A6A5A" }}
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none border-2"
                  style={{ borderColor: "#EDE0CE", fontFamily: "Nunito" }}
                  onFocus={(e) => {
                    setInputBorder(e.currentTarget, "#E8520A");
                  }}
                  onBlur={(e) => {
                    setInputBorder(e.currentTarget, "#EDE0CE");
                  }}
                />
              </div>
              <button
                type="button"
                data-ocid="auth.login_submit"
                onClick={handleLogin}
                className="w-full rounded-xl py-3.5 text-base font-bold text-white mt-1"
                style={{ background: "#E8520A", fontFamily: "Nunito" }}
                onMouseEnter={(e) => {
                  setButtonBg(e.currentTarget, "#FF7A35");
                }}
                onMouseLeave={(e) => {
                  setButtonBg(e.currentTarget, "#E8520A");
                }}
              >
                Login to SwadeshiStore
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {(
                [
                  {
                    label: "Full Name",
                    key: "name",
                    type: "text",
                    ph: "Your full name",
                  },
                  {
                    label: "Mobile Number",
                    key: "phone",
                    type: "tel",
                    ph: "+91 XXXXX XXXXX",
                  },
                  {
                    label: "Email Address",
                    key: "email",
                    type: "email",
                    ph: "you@email.com",
                  },
                  {
                    label: "Password",
                    key: "password",
                    type: "password",
                    ph: "Create a strong password",
                  },
                ] as const
              ).map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={`reg-${field.key}`}
                    className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: "#7A6A5A" }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={`reg-${field.key}`}
                    type={field.type}
                    placeholder={field.ph}
                    value={regData[field.key]}
                    onChange={(e) =>
                      setRegData((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none border-2"
                    style={{ borderColor: "#EDE0CE", fontFamily: "Nunito" }}
                    onFocus={(e) => {
                      setInputBorder(e.currentTarget, "#E8520A");
                    }}
                    onBlur={(e) => {
                      setInputBorder(e.currentTarget, "#EDE0CE");
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                data-ocid="auth.register_submit"
                onClick={handleRegister}
                className="w-full rounded-xl py-3.5 text-base font-bold text-white mt-1"
                style={{ background: "#E8520A", fontFamily: "Nunito" }}
                onMouseEnter={(e) => {
                  setButtonBg(e.currentTarget, "#FF7A35");
                }}
                onMouseLeave={(e) => {
                  setButtonBg(e.currentTarget, "#E8520A");
                }}
              >
                Create Free Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
