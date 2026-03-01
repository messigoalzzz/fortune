"use client";

import axios from "axios";
import { useEffect, type ReactNode } from "react";

type ModalProps = {
  title: string;
  titleId: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  variant?: "default" | "dark";
};

export type MessageState = {
  type: "error" | "success";
  text: string;
};

/** 通用弹窗外壳：遮罩层 + 容器 + 标题栏/关闭按钮 + 背景滚动锁定 */
export default function Modal({
  title,
  titleId,
  onClose,
  children,
  maxWidth = "max-w-[420px]",
  variant = "default",
}: ModalProps) {
  const darkMode = variant === "dark";

  // 打开时锁定背景滚动，关闭时恢复
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // 计算滚动条宽度，用 padding-right 补偿，防止页面抖动
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 阻止移动端触摸滚动穿透
    const preventTouchMove = (e: TouchEvent) => {
      // 如果触摸点在弹窗内部的可滚动区域则放行，否则阻止
      const target = e.target as HTMLElement;
      if (target.closest("[data-modal-content]")) return;
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouchMove, { passive: false });

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overscroll-none px-4 ${
        darkMode ? "bg-black/70" : "bg-black/60"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      // 不在遮罩层上绑定 onClose，防止误触关闭
    >
      <div
        className={`w-full ${maxWidth} overflow-hidden ${
          darkMode
            ? "rounded-[22px] border border-[#222d4b] bg-[linear-gradient(112deg,#0c1227_0%,#141e3c_48%,#0b1125_100%)] shadow-[0_28px_60px_rgba(0,0,0,0.6)]"
            : "rounded-md border border-black/10 bg-[#e9eaed] shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        }`}
      >
        {/* 标题栏 */}
        <div
          className={`relative ${
            darkMode
              ? "p-6"
              : "border-b border-black/10 bg-[#dadbdc] px-3 py-3"
          }`}
        >
          <h2
            id={titleId}
            className={`font-semibold ${
              darkMode
                ? "text-[#f3f6ff] text-[24px] leading-7"
                : "text-[24px] leading-7 text-[#0a86d8]"
            }`}
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label={`Close ${title} dialog`}
            className={`absolute flex size-7 items-center justify-center ${
              darkMode
                ? "right-5 top-5 text-[#f3f6ff]"
                : "right-5 top-5 text-[#3a3a3a]"
            }`}
            onClick={onClose}
          >
       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9496 3.63614C15.3401 3.24566 15.9732 3.24575 16.3637 3.63614C16.7542 4.02666 16.7542 4.65968 16.3637 5.0502L11.4135 9.99942L16.3637 14.9496C16.7542 15.3401 16.7542 15.9732 16.3637 16.3637C15.9732 16.7542 15.3401 16.7542 14.9496 16.3637L9.99943 11.4135L5.05021 16.3637C4.65969 16.7542 4.02667 16.7542 3.63615 16.3637C3.24576 15.9731 3.24567 15.3401 3.63615 14.9496L8.58537 9.99942L3.63615 5.0502C3.24564 4.65968 3.24563 4.02666 3.63615 3.63614C4.02667 3.24564 4.65969 3.24564 5.05021 3.63614L9.99943 8.58536L14.9496 3.63614Z" fill="white"/>
        </svg>

          </button>
        </div>

        {/* 弹窗内容 */}
        <div
          className={
            darkMode
              ? "p-6 pt-0"
              : "p-6 pt-0"
          } 
          data-modal-content
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** 复用的输入框样式 */
export const inputClassName =
  "h-[54px] w-full rounded-[6px] border-none px-4 text-center text-[18px] text-[#7a7a7a] placeholder:text-[#7a7a7a] focus:outline-none focus:ring-0";

/** 带浮动 label 和错误提示的表单字段 */
export function FormField({
  label,
  error,
  type = "text",
  value,
  onChange,
  onBlur,
  className,
}: {
  label: string;
  error?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}) {
  const hasValue = value.length > 0;

  return (
    <div className={className}>
      <div className="group relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={label}
          style={{ background: "linear-gradient(90deg, #e9eaed, #dadbdc 50%, #e9eaed)" }}
          className={`peer h-[54px] w-full rounded-[6px] border-none px-4 text-center text-[18px] outline-none ring-0 transition-[padding,color] duration-200 ${
            hasValue ? "pt-4 text-[#3a3a3a]" : "text-[#3a3a3a] placeholder:text-[#7a7a7a]"
          } focus:pt-4 focus:placeholder:text-transparent`}
        />
        <span
          className={`pointer-events-none absolute left-0 right-0 top-1 text-center text-[12px] transition-opacity duration-200 ${
            error ? "text-[#c14949]" : "text-[#0a86d8]"
          } ${
            hasValue
              ? "opacity-100"
              : "opacity-0 peer-focus:opacity-100"
          }`}
        >
          {label}
        </span>
      </div>
      {error && (
        <p className="mt-1 text-center text-[14px] text-[#c14949]">{error}</p>
      )}
    </div>
  );
}

/** 消息提示组件 */
export function MessageTip({ message }: { message: MessageState | null }) {
  if (!message) return null;
  return (
    <p
      className={`mt-4 text-center text-[14px] ${
        message.type === "error" ? "text-[#c14949]" : "text-[#0a86d8]"
      }`}
      aria-live="polite"
    >
      {message.text}
    </p>
  );
}

/** 统一的 axios 错误处理，返回用户可读的错误消息 */
export function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.msg || error.message || fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}
