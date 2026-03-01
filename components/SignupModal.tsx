"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { register, sendRegisterCode } from "@/lib/api";
import Modal, {
  MessageTip,
  extractErrorMessage,
  type MessageState,
} from "@/components/Modal";

type SignupModalProps = {
  onClose: () => void;
  onSwitchToLogin?: () => void;
  onRegisterSuccess?: () => void;
};

type FieldErrors = {
  uname?: string;
  email?: string;
  code?: string;
  upwd?: string;
  agreed?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupModal({
  onClose,
  onSwitchToLogin,
  onRegisterSuccess,
}: SignupModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [upwd, setUpwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [message, setMessage] = useState<MessageState | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const startCountdown = useCallback(() => {
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const clearError = (field: keyof FieldErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateSendCode = (): boolean => {
    const next: FieldErrors = {};
    if (!email.trim()) {
      next.email = "This is required";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Invalid email address";
    }
    setErrors((prev) => ({ ...prev, ...next }));
    return !next.email;
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!uname.trim()) next.uname = "This is required";
    if (!email.trim()) {
      next.email = "This is required";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Invalid email address";
    }
    if (!code.trim()) next.code = "This is required";
    if (!upwd.trim()) {
      next.upwd = "This is required";
    } else if (upwd.trim().length < 6) {
      next.upwd = "At least 6 characters";
    }
    if (!agreed) next.agreed = "Please agree to the terms";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSendCode = async () => {
    if (!validateSendCode()) return;

    setSending(true);
    setMessage(null);
    try {
      const response = await sendRegisterCode(email.trim());
      if (response.data.code === 1) {
        setMessage({ type: "success", text: "Verification code sent." });
        startCountdown();
      } else {
        setMessage({
          type: "error",
          text: response.data.msg || "Failed to send code.",
        });
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: extractErrorMessage(error, "Failed to send code. Please try again."),
      });
    } finally {
      setSending(false);
    }
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    setMessage(null);
    try {
      const response = await register({
        uname: uname.trim(),
        email: email.trim(),
        upwd: upwd.trim(),
        code: code.trim(),
      });
      if (response.data.code === 1) {
        const data = response.data.data;
        if (data?.token) {
          localStorage.setItem("token", data.token);
          const displayName = data.uname || data.unick || uname.trim();
          if (displayName) {
            localStorage.setItem("uname", displayName);
          }
          if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
          }
          toast.success("Account created. You are now logged in.");
        } else {
          toast.success("Account created. Please log in.");
        }
        if (onRegisterSuccess) {
          onRegisterSuccess();
        } else {
          onClose();
        }
        return;
      } else {
        setMessage({
          type: "error",
          text: response.data.msg || "Registration failed.",
        });
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: extractErrorMessage(error, "Registration failed. Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Creat account"
      titleId="signup-modal-title"
      onClose={onClose}
      maxWidth="max-w-[345px]"
      variant="dark"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="signup-uname"
            className="mb-2 block text-[16px] font-medium leading-6 text-[#eef3ff]"
          >
            Username
          </label>
          <input
            id="signup-uname"
            type="text"
            value={uname}
            onChange={(event) => {
              setUname(event.target.value);
              clearError("uname");
            }}
            onBlur={() => {
              if (!uname.trim()) setErrors((prev) => ({ ...prev, uname: "This is required" }));
            }}
            className="h-10 w-full rounded-[10px] border border-transparent bg-[#0C0F16] px-3 text-base text-[#eef3ff] outline-none transition focus:border-[#292D39]"
            autoComplete="username"
          />
          {errors.uname && <p className="mt-1 text-xs text-[#ff8181]">{errors.uname}</p>}
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-[16px] font-medium leading-6 text-[#eef3ff]"
          >
            E-mail Address
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            onBlur={() => {
              if (!email.trim()) {
                setErrors((prev) => ({ ...prev, email: "This is required" }));
              } else if (!EMAIL_RE.test(email.trim())) {
                setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
              }
            }}
            className="h-10 w-full rounded-[10px] border border-transparent bg-[#0C0F16] px-3 text-base text-[#eef3ff] outline-none transition focus:border-[#292D39]"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-[#ff8181]">{errors.email}</p>}
        </div>

        <div>
          <label
            htmlFor="signup-code"
            className="mb-2 block text-[16px] font-medium leading-6 text-[#eef3ff]"
          >
            Verification code
          </label>
          <div className="relative">
            <input
              id="signup-code"
              type="text"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                clearError("code");
              }}
              onBlur={() => {
                if (!code.trim()) setErrors((prev) => ({ ...prev, code: "This is required" }));
              }}
              className="h-10 w-full rounded-[10px] border border-transparent bg-[#0C0F16] px-3 pr-20 text-base text-[#eef3ff] outline-none transition focus:border-[#292D39]"
              autoComplete="one-time-code"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px] font-medium text-[#00ff5a] transition hover:text-[#3cff82] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSendCode}
              disabled={sending || countdown > 0 || !email.trim()}
            >
              {sending ? "sending..." : countdown > 0 ? `${countdown}s` : "send"}
            </button>
          </div>
          {errors.code && <p className="mt-1 text-xs text-[#ff8181]">{errors.code}</p>}
        </div>

        <div>
          <label
            htmlFor="signup-upwd"
            className="mb-2 block text-base font-medium text-[#eef3ff]"
          >
            Password
          </label>
          <input
            id="signup-upwd"
            type="password"
            value={upwd}
            onChange={(event) => {
              setUpwd(event.target.value);
              clearError("upwd");
            }}
            onBlur={() => {
              if (!upwd.trim()) {
                setErrors((prev) => ({ ...prev, upwd: "This is required" }));
              } else if (upwd.trim().length < 6) {
                setErrors((prev) => ({ ...prev, upwd: "At least 6 characters" }));
              }
            }}
            className="h-10 w-full rounded-[10px] border border-transparent bg-[#0C0F16] px-3 text-base text-[#eef3ff] outline-none transition focus:border-[#292D39]"
            autoComplete="new-password"
          />
          {errors.upwd && <p className="mt-1 text-xs text-[#ff8181]">{errors.upwd}</p>}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <label className="mt-1 flex h-[44px] w-[44px] cursor-pointer items-start justify-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={agreed}
            onChange={(event) => {
              setAgreed(event.target.checked);
              clearError("agreed");
            }}
            aria-label="Agree to terms and conditions"
          />
          <span
            className={`h-[28px] w-[28px] rounded-full border-2 ${
              errors.agreed ? "border-[#c14949]" : "border-[#3b3b3b]"
            } ${agreed ? "hidden" : "block"}`}
          />
          <svg
            className={`h-[28px] w-[28px] text-[#0a86d8] ${agreed ? "block" : "hidden"}`}
            fill="currentColor"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className={agreed ? "block" : "hidden"}>
              <path d="M91.107,14.962L49.611,48.456L30.635,34.716l-7.643,8.093L46.421,69.59l4.129,4.719l4.304-4.571L98.84,23.026L91.107,14.962z" />
              <path d="M89.114,39.189c0.903,3.448,1.388,7.066,1.388,10.798c0,23.472-19.028,42.5-42.5,42.5c-23.473,0-42.5-19.028-42.5-42.5s19.027-42.5,42.5-42.5c11.854,0,22.57,4.858,30.279,12.687l3.105-2.507c-8.459-8.734-20.294-14.18-33.385-14.18c-25.64,0-46.5,20.86-46.5,46.5c0,25.641,20.86,46.5,46.5,46.5c25.641,0,46.5-20.859,46.5-46.5c0-4.939-0.781-9.698-2.215-14.168L89.114,39.189z" />
            </g>
          </svg>
        </label>
        <div>
          <p className="text-xs leading-4 text-left text-[#eef3ff]">
            I confirm that I am of legal gambling age (18+) in my jurisdiction and I agree to the{" "}
            <span className="text-[#169af0]">Terms &amp; Conditions.</span>
          </p>
          {errors.agreed && <p className="mt-1 text-xs text-[#ff8181]">{errors.agreed}</p>}
        </div>
      </div>

      <button
        type="button"
        className="mx-auto mt-6 block w-[78%] rounded-[10px] bg-[#169af0] py-1.5 text-[18px] font-medium text-white transition hover:bg-[#1187d4] disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create account"}
      </button>

      <MessageTip message={message} />

      <p className="mt-10 text-center text-base text-[#eef3ff]">
        Already have an account ?{" "}
        <button
          type="button"
          className="text-[#169af0] hover:underline"
          onClick={onSwitchToLogin}
        >
          Log in.
        </button>
      </p>
    </Modal>
  );
}
