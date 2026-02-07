"use client";

import { useState } from "react";
import { toast } from "sonner";
import { login } from "@/lib/api";
import Modal, {
  inputClassName,
  MessageTip,
  extractErrorMessage,
  type MessageState,
} from "@/components/Modal";

type LoginModalProps = {
  onClose: () => void;
  onSwitchToSignup?: () => void;
};

export default function LoginModal({ onClose, onSwitchToSignup }: LoginModalProps) {
  const [uname, setUname] = useState("");
  const [upwd, setUpwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState | null>(null);

  const handleLogin = async () => {
    if (!uname.trim() || !upwd.trim()) {
      setMessage({ type: "error", text: "Please enter username and password." });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const response = await login({ uname: uname.trim(), upwd: upwd.trim() });
      if (response.data.code === 1 && response.data.data) {
        localStorage.setItem("token", response.data.data.token);
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
        <input
          type="text"
          placeholder="Username or Email"
          className={inputClassName}
          value={uname}
          onChange={(event) => setUname(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={inputClassName}
          value={upwd}
          onChange={(event) => setUpwd(event.target.value)}
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

      {/* <button
        type="button"
        className="mx-auto mt-4 block text-[16px] font-medium text-[#0a86d8]"
      >
        Forgot password?
      </button> */}

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
