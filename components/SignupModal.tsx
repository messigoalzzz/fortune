"use client";

import { useState } from "react";
import { toast } from "sonner";
import { register, sendRegisterCode } from "@/lib/api";
import Modal, {
  inputClassName,
  MessageTip,
  extractErrorMessage,
  type MessageState,
} from "@/components/Modal";

type SignupModalProps = {
  onClose: () => void;
  onSwitchToLogin?: () => void;
};

export default function SignupModal({ onClose, onSwitchToLogin }: SignupModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [upwd, setUpwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);

  const handleSendCode = async () => {
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email first." });
      return;
    }

    setSending(true);
    setMessage(null);
    try {
      const response = await sendRegisterCode(email.trim());
      if (response.data.code === 1) {
        setMessage({ type: "success", text: "Verification code sent." });
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
    if (!uname.trim() || !email.trim() || !code.trim() || !upwd.trim()) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (!agreed) {
      setMessage({ type: "error", text: "Please agree to the terms." });
      return;
    }

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
        toast.success("Account created. Please log in.");
        onClose();
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
      title="Create account"
      titleId="signup-modal-title"
      onClose={onClose}
      maxWidth="max-w-[440px]"
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className={inputClassName}
          value={uname}
          onChange={(event) => setUname(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          className={inputClassName}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Verification code"
            className={`${inputClassName} flex-1`}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button
            type="button"
            className="h-[54px] shrink-0 rounded-[6px] bg-[#0a86d8] px-4 text-[16px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSendCode}
            disabled={sending || !email.trim()}
          >
            {sending ? "Sending..." : "Send code"}
          </button>
        </div>
        <input
          type="password"
          placeholder="Password"
          className={inputClassName}
          value={upwd}
          onChange={(event) => setUpwd(event.target.value)}
        />
      </div>

      <div className="mt-6 flex items-start gap-4">
        <label className="mt-1 flex h-[44px] w-[44px] cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            aria-label="Agree to terms and conditions"
          />
          <span
            className={`h-[28px] w-[28px] rounded-full border-2 border-[#3b3b3b] ${
              agreed ? "hidden" : "block"
            }`}
          />
          <svg
            className={`h-[28px] w-[28px] text-[#0a86d8] ${
              agreed ? "block" : "hidden"
            }`}
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
        <p className="text-[16px] leading-6 text-[#343637]">
          I confirm that I am of legal gambling age (18+) in my jurisdiction
          and I agree to the <span className="text-[#0a86d8]">Terms &amp; Conditions</span>.
        </p>
      </div>

      <button
        type="button"
        className="mx-auto mt-6 block w-[78%] rounded-md bg-[#0a86d8] py-2 text-[18px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create account"}
      </button>

      <MessageTip message={message} />

      <p className="mt-10 text-center text-[16px] text-[#343637]">
        Already have an account?{" "}
        <button
          type="button"
          className="text-[#0a86d8] hover:underline"
          onClick={onSwitchToLogin}
        >
          Log in.
        </button>
      </p>
    </Modal>
  );
}
