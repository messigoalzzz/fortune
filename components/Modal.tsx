"use client";

import axios from "axios";
import { useEffect, type ReactNode } from "react";

type ModalProps = {
  title: string;
  titleId: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
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
}: ModalProps) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      // 不在遮罩层上绑定 onClose，防止误触关闭
    >
      <div
        className={`w-full ${maxWidth} overflow-hidden rounded-md border border-black/10 bg-[#e9eaed] shadow-[0_18px_40px_rgba(0,0,0,0.45)]`}
      >
        {/* 标题栏 */}
        <div className="relative border-b border-black/10 bg-[#dadbdc] px-3 py-3">
          <h2
            id={titleId}
            className="text-[32px] leading-10 font-semibold tracking-[0.5px] text-[#0a86d8]"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label={`Close ${title} dialog`}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[#3a3a3a]"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6l-12 12" />
            </svg>
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="px-4 pb-8 pt-6" data-modal-content>
          {children}
        </div>
      </div>
    </div>
  );
}

/** 复用的输入框样式 */
export const inputClassName =
  "h-[54px] w-full rounded-[6px] border border-[#cfcfcf] bg-[#e1e1e1] px-4 text-center text-[18px] text-[#7a7a7a] shadow-inner placeholder:text-[#7a7a7a] focus:outline-none";

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
          className={`peer h-[54px] w-full rounded-[6px] border bg-[#e1e1e1] px-4 text-center text-[18px] shadow-inner transition-all focus:outline-none ${
            hasValue ? "pt-4 text-[#3a3a3a]" : "text-[#3a3a3a] placeholder:text-[#7a7a7a]"
          } ${
            error
              ? "border-[#c14949] focus:border-[#c14949]"
              : "border-[#cfcfcf] focus:border-[#0a86d8]"
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
