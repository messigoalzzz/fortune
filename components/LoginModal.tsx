"use client";

import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/api";
import Modal, {
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
  agreed?: string;
};

export default function LoginModal({ onClose, onSwitchToSignup }: LoginModalProps) {
  const [uname, setUname] = useState("");
  const [upwd, setUpwd] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!uname.trim()) next.uname = "This is required";
    if (!upwd.trim()) next.upwd = "This is required";
    if (!agreed) next.agreed = "Please confirm Terms & Conditions";
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
    <Modal
      title="Log in"
      titleId="login-modal-title"
      onClose={onClose}
      maxWidth="max-w-[345px]"
      variant="dark"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="login-uname"
            className="mb-2 block text-[16px] font-medium leading-6 text-[#eef3ff]"
          >
            Username or E-mail
          </label>
          <input
            id="login-uname"
            type="text"
            value={uname}
            onChange={(event) => {
              setUname(event.target.value);
              if (errors.uname) setErrors((prev) => ({ ...prev, uname: undefined }));
            }}
            onBlur={() => {
              if (!uname.trim()) {
                setErrors((prev) => ({ ...prev, uname: "This is required" }));
              }
            }}
            className="h-10 w-full rounded-[10px] border border-transparent bg-[#0C0F16] px-5 text-base text-[#eef3ff] outline-none transition focus:border-[#292D39]"
            autoComplete="username"
          />
          {errors.uname && <p className="mt-1 text-xs text-[#ff8181]">{errors.uname}</p>}
        </div>

        <div>
          <label
            htmlFor="login-upwd"
            className="mb-2 block text-base font-medium text-[#eef3ff]"
          >
            Password
          </label>
          <input
            id="login-upwd"
            type="password"
            value={upwd}
            onChange={(event) => {
              setUpwd(event.target.value);
              if (errors.upwd) setErrors((prev) => ({ ...prev, upwd: undefined }));
            }}
            onBlur={() => {
              if (!upwd.trim()) {
                setErrors((prev) => ({ ...prev, upwd: "This is required" }));
              }
            }}
            className="h-10 w-full rounded-[10px] border border-transparent bg-[#0C0F16] px-5 text-base text-[#eef3ff] outline-none transition focus:border-[#292D39]"
            autoComplete="current-password"
          />
          {errors.upwd && <p className="mt-1 text-xs text-[#ff8181]">{errors.upwd}</p>}
        </div>
      </div>

         <div className="mt-3">
          <p className="text-xs text-left text-[#eef3ff]">
            By logging in, you confirm that you're of legal gambling age (18+) and agree to
            the <span className="text-[#169af0]"> Terms &amp; Conditions.</span>
          </p>
          {errors.agreed && <p className="mt-1 text-xs text-[#ff8181]">{errors.agreed}</p>}
        </div>

      <MessageTip message={message} />

      <button
        type="button"
        className="mx-auto mt-8 block w-full rounded-[10px] bg-[#169af0] py-1.5 text-base font-medium text-white transition hover:bg-[#1187d4] disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="mt-10 text-center text-base text-[#eef3ff]">
        Not a member?{" "}
        <button
          type="button"
          className="text-[#169af0] hover:underline"
          onClick={onSwitchToSignup}
        >
          Creat account
        </button>
      </p>
    </Modal>
  );
}
