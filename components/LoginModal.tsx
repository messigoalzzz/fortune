"use client";

import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/api";
import Modal, {
  FormField,
  MessageTip,
  extractErrorMessage,
  type MessageState,
} from "@/components/Modal";

type LoginModalProps = {
  onClose: () => void;
  onSwitchToSignup?: () => void;
};

type FieldErrors = {
  uname?: string;
  upwd?: string;
};

export default function LoginModal({ onClose, onSwitchToSignup }: LoginModalProps) {
  const [uname, setUname] = useState("");
  const [upwd, setUpwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!uname.trim()) next.uname = "This is required";
    if (!upwd.trim()) next.upwd = "This is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setMessage(null);
    try {
      const response = await login({ uname: uname.trim(), upwd: upwd.trim() });
      if (response.data.code === 1 && response.data.data) {
        localStorage.setItem("token", response.data.data.token);
        if (response.data.data.jwt) {
          localStorage.setItem("jwt", response.data.data.jwt);
        }
        localStorage.setItem("uid", String(response.data.data.uid));
        localStorage.setItem("uname", response.data.data.uname);
        toast.success("Login successful!");
        onClose();
        return;
      } else {
        setMessage({
          type: "error",
          text: response.data.msg || "Login failed.",
        });
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text: extractErrorMessage(error, "Login failed. Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Log in" titleId="login-modal-title" onClose={onClose}>
      <div className="space-y-4">
        <FormField
          label="Username or Email"
          type="text"
          value={uname}
          onChange={(v) => {
            setUname(v);
            if (errors.uname) setErrors((prev) => ({ ...prev, uname: undefined }));
          }}
          onBlur={() => {
            if (!uname.trim()) setErrors((prev) => ({ ...prev, uname: "This is required" }));
          }}
          error={errors.uname}
        />
        <FormField
          label="Password"
          type="password"
          value={upwd}
          onChange={(v) => {
            setUpwd(v);
            if (errors.upwd) setErrors((prev) => ({ ...prev, upwd: undefined }));
          }}
          onBlur={() => {
            if (!upwd.trim()) setErrors((prev) => ({ ...prev, upwd: "This is required" }));
          }}
          error={errors.upwd}
        />
      </div>

      <p className="mt-6 text-center text-[16px] leading-6 text-[#343637]">
        By logging in, you confirm that you're of legal gambling age (18+) and
        agree to the <span className="text-[#0a86d8]">Terms &amp; Conditions</span>.
      </p>

      <MessageTip message={message} />

      <button
        type="button"
        className="mx-auto mt-6 block w-[75%] rounded-md bg-[#0a86d8] py-2 text-[18px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="mt-10 text-center text-[16px] text-[#343637]">
        Not a member?{" "}
        <button
          type="button"
          className="text-[#0a86d8] hover:underline"
          onClick={onSwitchToSignup}
        >
          Create account.
        </button>
      </p>
    </Modal>
  );
}
