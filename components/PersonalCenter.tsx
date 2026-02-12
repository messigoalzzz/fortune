"use client";

import { useEffect, useMemo, useState } from "react";
import {
  applyWithdraw,
  createOrder,
  fetchOrderDetail,
  fetchOrderList,
  fetchUserInfo,
  type OrderListItem,
} from "@/lib/api";
import { extractErrorMessage, type MessageState } from "@/components/Modal";

type TabKey = "overview" | "deposit" | "withdraw" | "history" | "referral";

type HistoryItem = {
  id: string;
  type: string;
  method?: string;
  amount?: string;
  status?: string;
  time?: string;
  orderId?: string;
  raw?: OrderListItem;
};

type ReferralItem = {
  id: string;
  name: string;
  joinedAt: string;
  reward: string;
  status: "Active" | "Pending";
};

type PaymentInfoItem = {
  payment_address?: string;
  token_symbol?: string;
  blockchain?: string;
  token_name?: string;
  receive_amount?: string;
  receive_currency?: string;
  exchange_rate?: string;
  asset_logo?: string;
  logo_url?: string;
};

const HISTORY_ITEMS: HistoryItem[] = [
  {
    id: "TX-10231",
    type: "Deposit",
    method: "USDT (TRC20)",
    amount: "+520.50",
    status: "Completed",
    time: "2026-02-08 13:12",
    orderId: "TX-10231",
  },
  {
    id: "TX-10219",
    type: "Withdraw",
    method: "USDT (TRC20)",
    amount: "-120.00",
    status: "Processing",
    time: "2026-02-07 18:34",
    orderId: "TX-10219",
  },
  {
    id: "TX-10188",
    type: "Deposit",
    method: "Game Coins",
    amount: "+8,000",
    status: "Completed",
    time: "2026-02-06 09:20",
    orderId: "TX-10188",
  },
  {
    id: "TX-10170",
    type: "Bonus",
    method: "Referral Reward",
    amount: "+25.00",
    status: "Completed",
    time: "2026-02-04 22:08",
    orderId: "TX-10170",
  },
];

const REFERRAL_ITEMS: ReferralItem[] = [
  {
    id: "RF-9001",
    name: "Rina***",
    joinedAt: "2026-02-07",
    reward: "12.50 USDT",
    status: "Active",
  },
  {
    id: "RF-8987",
    name: "Ken***",
    joinedAt: "2026-02-05",
    reward: "8.00 USDT",
    status: "Active",
  },
  {
    id: "RF-8971",
    name: "Mila***",
    joinedAt: "2026-02-03",
    reward: "Pending",
    status: "Pending",
  },
];

const TAB_ITEMS: { id: TabKey; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "deposit", label: "Deposit" },
  { id: "withdraw", label: "Withdraw" },
  { id: "history", label: "History" },
  { id: "referral", label: "Referral" },
];

const referralCode = "FX-8Q2M1";
const referralLink = "https://fortunex.example/invite/FX-8Q2M1";
const DEFAULT_DEPOSIT_ADDRESS = "TMMzvF6P8n12Yw3sN6L9H4QxE6dP9a2c3";

const ORDER_ID_KEYS = [
  "orderId",
  "order_id",
  "id",
  "orderNo",
  "order_no",
  "orderSn",
  "order_sn",
  "orderNumber",
  "order_number",
];

const ORDER_TYPE_KEYS = ["type", "orderType", "tradeType", "kind", "category"];
const ORDER_METHOD_KEYS = ["method", "payType", "channel", "network", "coin", "currency"];
const ORDER_AMOUNT_KEYS = [
  "amount",
  "order_amount",
  "orderAmount",
  "money",
  "price",
  "total",
  "pay_amount",
  "payAmount",
  "actualAmount",
  "receive_amount",
  "receiveAmount",
];
const ORDER_STATUS_KEYS = ["status", "state", "payStatus", "orderStatus", "statusName"];
const ORDER_TIME_KEYS = [
  "created_time",
  "createdTime",
  "createdAt",
  "createTime",
  "created_at",
  "ctime",
  "updated_time",
  "updatedTime",
  "updatedAt",
  "updateTime",
  "transact_time",
  "transactTime",
  "time",
  "expire_time",
];
const ORDER_TOTAL_KEYS = ["total", "totalCount", "total_count"];
const REDIRECT_URL_KEYS = [
  "checkout_url",
  "payUrl",
  "pay_url",
  "url",
  "redirectUrl",
  "redirect_url",
  "paymentUrl",
  "payLink",
];
const PAYMENT_ADDRESS_KEYS = ["address", "payAddress", "walletAddress", "pay_address"];

const resolveString = (value: unknown) => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : "";
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return null;
};

const formatGameCoins = (value: number) =>
  value.toLocaleString(undefined, { maximumFractionDigits: 2 });

const formatUsdt = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const parseJsonArray = (value: unknown): Record<string, unknown>[] | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed as Record<string, unknown>[];
    }
  } catch {
    return null;
  }
  return null;
};

const formatStatusLabel = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return "-";
  const map: Record<string, string> = {
    new: "New",
    paid: "Paid",
    success: "Success",
    completed: "Completed",
    cancel: "Cancelled",
    canceled: "Cancelled",
    expired: "Expired",
    fail: "Failed",
    failed: "Failed",
    pending: "Pending",
    processing: "Processing",
  };
  if (map[normalized]) return map[normalized];
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

const normalizeTimestamp = (value: unknown): number | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (Number.isNaN(parsed)) return null;
    value = parsed;
  }
  if (typeof value !== "number" || !Number.isFinite(value)) return null;

  let seconds = value;
  if (seconds >= 1e13) {
    return seconds;
  }
  if (seconds >= 1e12) {
    return seconds;
  }
  if (seconds >= 1e10) {
    seconds = Math.floor(seconds / 10);
  }
  if (seconds >= 1e9) {
    return seconds * 1000;
  }
  return null;
};

const formatTimeValue = (value: unknown) => {
  const ts = normalizeTimestamp(value);
  if (!ts) return "-";
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

const pickValue = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      const value = resolveString(record[key]);
      if (value) return value;
    }
  }
  return "";
};

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

const extractOrderList = (data: unknown): OrderListItem[] => {
  if (Array.isArray(data)) {
    return data as OrderListItem[];
  }
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const list = record.list ?? record.rows ?? record.data ?? record.items;
    if (Array.isArray(list)) {
      return list as OrderListItem[];
    }
  }
  return [];
};

const extractTotalCount = (data: unknown): number | null => {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    for (const key of ORDER_TOTAL_KEYS) {
      if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
      const raw = record[key];
      if (typeof raw === "number" && Number.isFinite(raw)) return raw;
      if (typeof raw === "string" && raw.trim()) {
        const parsed = Number(raw);
        if (!Number.isNaN(parsed)) return parsed;
      }
    }
  }
  return null;
};

const normalizeOrderItem = (order: OrderListItem, index: number): HistoryItem => {
  const record = order as Record<string, unknown>;
  const orderId = pickValue(record, ORDER_ID_KEYS) || `ORDER-${index + 1}`;
  const type =
    pickValue(record, ORDER_TYPE_KEYS) ||
    (resolveString(record.order_currency) ? "Deposit" : "Order");
  const currency =
    resolveString(record.order_currency) ||
    resolveString(record.pay_currency) ||
    resolveString(record.receive_currency);
  const amountValue = pickValue(record, ORDER_AMOUNT_KEYS);
  const amount = amountValue ? `${amountValue}${currency ? ` ${currency}` : ""}` : "-";
  const method =
    resolveString(record.order_id) ||
    resolveString(record.payment_address) ||
    resolveString(record.cregis_id) ||
    currency ||
    pickValue(record, ORDER_METHOD_KEYS) ||
    orderId;
  const statusRaw = pickValue(record, ORDER_STATUS_KEYS);
  const status = statusRaw ? formatStatusLabel(statusRaw) : "-";
  let time = "-";
  for (const key of ORDER_TIME_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
    const value = record[key];
    const formatted = formatTimeValue(value);
    if (formatted !== "-") {
      time = formatted;
      break;
    }
  }
  return {
    id: orderId,
    orderId,
    type,
    method,
    amount,
    status,
    time,
    raw: order,
  };
};

const extractRedirectUrl = (data: unknown): string | null => {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  for (const key of REDIRECT_URL_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
    const value = resolveString(record[key]);
    if (value && isHttpUrl(value)) return value;
  }
  return null;
};

const extractPaymentAddress = (data: unknown): string | null => {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  for (const key of PAYMENT_ADDRESS_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
    const value = resolveString(record[key]);
    if (value && !isHttpUrl(value)) return value;
  }
  return null;
};

const selectPaymentInfoAddress = (
  info: unknown,
  network: string,
): string | null => {
  if (!Array.isArray(info)) return null;
  const normalized = network.trim().toLowerCase();
  if (!normalized) return null;
  for (const item of info) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const tokenName = resolveString(record.token_name ?? record.tokenName).toLowerCase();
    const blockchain = resolveString(record.blockchain).toLowerCase();
    if (tokenName.includes(normalized) || blockchain.includes(normalized)) {
      const address = resolveString(record.payment_address ?? record.paymentAddress);
      if (address) return address;
    }
  }
  const first = info.find((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const record = entry as Record<string, unknown>;
    return Boolean(resolveString(record.payment_address ?? record.paymentAddress));
  }) as Record<string, unknown> | undefined;
  if (first) {
    const address = resolveString(first.payment_address ?? first.paymentAddress);
    if (address) return address;
  }
  return null;
};

const getStatusColor = (status?: string) => {
  if (!status) return "text-[#9aa0a6]";
  const normalized = status.toLowerCase();
  if (
    normalized.includes("success") ||
    normalized.includes("complete") ||
    normalized.includes("paid") ||
    normalized === "1"
  ) {
    return "text-[#4ade80]";
  }
  if (
    normalized.includes("new") ||
    normalized.includes("process") ||
    normalized.includes("pending") ||
    normalized.includes("wait")
  ) {
    return "text-[#f5c245]";
  }
  if (
    normalized.includes("fail") ||
    normalized.includes("error") ||
    normalized.includes("cancel") ||
    normalized.includes("expire") ||
    normalized === "0"
  ) {
    return "text-[#f87171]";
  }
  return "text-[#9aa0a6]";
};

function TabIcon({ kind, className }: { kind: TabKey; className?: string }) {
  switch (kind) {
    case "overview":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "deposit":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v10" />
          <path d="m7 8 5 5 5-5" />
          <path d="M4 17h16v4H4z" />
        </svg>
      );
    case "withdraw":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21V11" />
          <path d="m7 16 5-5 5 5" />
          <path d="M4 3h16v4H4z" />
        </svg>
      );
    case "history":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9" />
          <path d="M3 4v5h5" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "referral":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 11a4 4 0 1 0-8 0" />
          <circle cx="8" cy="7" r="3" />
          <circle cx="16" cy="7" r="3" />
          <path d="M4 21a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PersonalCenter() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("Guest");
  const [userId, setUserId] = useState("-");
  const [gameCoinsBalance, setGameCoinsBalance] = useState(0);
  const [copied, setCopied] = useState<null | "deposit" | "payment" | "referral">(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositNetwork, setDepositNetwork] = useState("TRC20");
  const [depositAddress, setDepositAddress] = useState(DEFAULT_DEPOSIT_ADDRESS);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoItem[] | null>(null);
  const [depositMessage, setDepositMessage] = useState<MessageState | null>(null);
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawNetwork, setWithdrawNetwork] = useState("TRC20");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState<MessageState | null>(null);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(HISTORY_ITEMS);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersMessage, setOrdersMessage] = useState<MessageState | null>(null);
  const [orderPage, setOrderPage] = useState(1);
  const [orderLimit] = useState(10);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderListItem | null>(null);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const uname = localStorage.getItem("uname");
    const uid = localStorage.getItem("uid");
    setToken(storedToken);
    if (uname) setUserName(uname);
    if (uid) setUserId(uid);

    if (!storedToken) return;

    let active = true;
    fetchUserInfo(storedToken)
      .then((response) => {
        if (!active) return;
        const payload = response.data;
        if (payload.code !== 1 || !payload.data) return;
        const displayName = payload.data.unick || payload.data.uname || uname || "Guest";
        setUserName(displayName);
        setUserId(String(payload.data.uid ?? uid ?? "-"));
        const gameCoinValue = payload.data.uchip ?? payload.data.balance;
        const parsedGameCoinBalance = toNumber(gameCoinValue);
        if (parsedGameCoinBalance !== null) {
          setGameCoinsBalance(parsedGameCoinBalance);
        }
        if (displayName) {
          localStorage.setItem("uname", displayName);
        }
        if (payload.data.uid !== undefined) {
          localStorage.setItem("uid", String(payload.data.uid));
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const userInitial = useMemo(() => {
    const initial = userName.trim().charAt(0).toUpperCase();
    return initial || "G";
  }, [userName]);
  const usdtBalance = useMemo(() => gameCoinsBalance / 100, [gameCoinsBalance]);
  const formattedGameCoinsBalance = useMemo(
    () => formatGameCoins(gameCoinsBalance),
    [gameCoinsBalance],
  );
  const formattedUsdtBalance = useMemo(() => formatUsdt(usdtBalance), [usdtBalance]);

  const handleCopy = (value: string, key: "deposit" | "payment" | "referral") => {
    if (!navigator?.clipboard) {
      return;
    }
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(key);
        window.setTimeout(() => setCopied(null), 1500);
      })
      .catch(() => undefined);
  };

  useEffect(() => {
    if (!paymentInfo || paymentInfo.length === 0) return;
    const address = selectPaymentInfoAddress(paymentInfo, depositNetwork);
    if (address) {
      setDepositAddress(address);
    }
  }, [depositNetwork, paymentInfo]);

  useEffect(() => {
    if (activeTab !== "history") return;
    if (!token) {
      setOrdersMessage({ type: "error", text: "Please log in to view orders." });
      setHistoryItems([]);
      setOrderTotal(null);
      setOrderDetail(null);
      setSelectedOrderId(null);
      setOrdersLoading(false);
      return;
    }

    let active = true;
    setOrdersLoading(true);
    setOrdersMessage(null);
    setOrderDetail(null);
    setSelectedOrderId(null);

    fetchOrderList(token, { page: orderPage, limit: orderLimit })
      .then((response) => {
        if (!active) return;
        const payload = response.data;
        if (payload.code !== 1) {
          setOrdersMessage({
            type: "error",
            text: payload.msg || "Failed to load orders.",
          });
          setHistoryItems([]);
          setOrderTotal(null);
          return;
        }
        const list = extractOrderList(payload.data);
        setHistoryItems(list.map(normalizeOrderItem));
        setOrderTotal(extractTotalCount(payload.data));
      })
      .catch((error: unknown) => {
        if (!active) return;
        setOrdersMessage({
          type: "error",
          text: extractErrorMessage(error, "Failed to load orders."),
        });
        setHistoryItems([]);
        setOrderTotal(null);
      })
      .finally(() => {
        if (active) setOrdersLoading(false);
      });

    return () => {
      active = false;
    };
  }, [activeTab, token, orderPage, orderLimit]);

  useEffect(() => {
    if (activeTab === "deposit") {
      setDepositMessage(null);
    }
    if (activeTab === "withdraw") {
      setWithdrawMessage(null);
    }
  }, [activeTab]);

  const handleCreateOrder = async () => {
    setDepositMessage(null);
    setPaymentUrl(null);
    setPaymentOrderId(null);
    setPaymentInfo(null);
    setDepositAddress(DEFAULT_DEPOSIT_ADDRESS);
    if (!token) {
      setDepositMessage({ type: "error", text: "Please log in first." });
      return;
    }
    const amountValue = depositAmount.trim();
    const amountNumber = Number(amountValue);
    if (!amountValue || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setDepositMessage({ type: "error", text: "Enter a valid amount." });
      return;
    }

    setDepositLoading(true);
    try {
      const response = await createOrder(token, { amount: amountValue });
      const payload = response.data;
      if (payload.code !== 1) {
        setDepositMessage({
          type: "error",
          text: payload.msg || "Create order failed.",
        });
        return;
      }

      const data = payload.data ?? {};
      const record = data as Record<string, unknown>;
      const redirectUrl = extractRedirectUrl(data);
      const orderId = pickValue(record, ORDER_ID_KEYS);
      const paymentInfo = Array.isArray(record.payment_info)
        ? (record.payment_info as PaymentInfoItem[])
        : null;
      const addressFromInfo = paymentInfo
        ? selectPaymentInfoAddress(paymentInfo, depositNetwork)
        : null;
      const fallbackAddress = extractPaymentAddress(data);

      if (paymentInfo) setPaymentInfo(paymentInfo);
      if (addressFromInfo) {
        setDepositAddress(addressFromInfo);
      } else if (fallbackAddress) {
        setDepositAddress(fallbackAddress);
      }
      if (orderId) setPaymentOrderId(orderId);
      if (redirectUrl) {
        setPaymentUrl(redirectUrl);
        setDepositMessage({
          type: "success",
          text: "Redirecting to payment...",
        });
        window.location.href = redirectUrl;
        return;
      }

      setPaymentUrl(null);
      setDepositMessage({
        type: "success",
        text: "Order created. Please proceed with payment.",
      });
    } catch (error: unknown) {
      setDepositMessage({
        type: "error",
        text: extractErrorMessage(error, "Create order failed."),
      });
    } finally {
      setDepositLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setWithdrawMessage(null);
    if (!token) {
      setWithdrawMessage({ type: "error", text: "Please log in first." });
      return;
    }
    const amountValue = withdrawAmount.trim();
    const addressValue = withdrawAddress.trim();
    const amountNumber = Number(amountValue);
    if (!amountValue || Number.isNaN(amountNumber) || amountNumber <= 0) {
      setWithdrawMessage({ type: "error", text: "Enter a valid amount." });
      return;
    }
    if (!addressValue) {
      setWithdrawMessage({ type: "error", text: "Enter a wallet address." });
      return;
    }

    setWithdrawLoading(true);
    try {
      const response = await applyWithdraw(token, {
        amount: amountValue,
        address: addressValue,
      });
      const payload = response.data;
      if (payload.code !== 1) {
        setWithdrawMessage({
          type: "error",
          text: payload.msg || "Withdrawal failed.",
        });
        return;
      }
      setWithdrawMessage({
        type: "success",
        text: payload.msg || "Withdrawal request submitted.",
      });
      setWithdrawAmount("");
      setWithdrawAddress("");
      if (activeTab === "history") {
        setOrderPage(1);
      }
    } catch (error: unknown) {
      setWithdrawMessage({
        type: "error",
        text: extractErrorMessage(error, "Withdrawal failed."),
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  const handleViewOrderDetail = async (orderId?: string) => {
    if (!orderId) return;
    if (!token) {
      setOrdersMessage({ type: "error", text: "Please log in to view order details." });
      return;
    }
    setSelectedOrderId(orderId);
    setOrderDetailLoading(true);
    setOrdersMessage(null);
    try {
      const response = await fetchOrderDetail(token, { orderId });
      const payload = response.data;
      if (payload.code !== 1 || !payload.data) {
        setOrdersMessage({
          type: "error",
          text: payload.msg || "Failed to load order detail.",
        });
        return;
      }
      const detail = { ...(payload.data as Record<string, unknown>) };
      const parsedPaymentInfo = parseJsonArray(detail.payment_info);
      if (parsedPaymentInfo) {
        detail.payment_info = parsedPaymentInfo;
      }
      setOrderDetail(detail);
    } catch (error: unknown) {
      setOrdersMessage({
        type: "error",
        text: extractErrorMessage(error, "Failed to load order detail."),
      });
    } finally {
      setOrderDetailLoading(false);
    }
  };

  const totalPages =
    orderTotal !== null ? Math.max(1, Math.ceil(orderTotal / orderLimit)) : null;
  const canPrevPage = orderPage > 1;
  const canNextPage =
    totalPages !== null ? orderPage < totalPages : historyItems.length === orderLimit;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,#f5c24533,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#3b82f633,transparent_70%)]" />
      </div>
      <div className="container-custom relative py-10 md:py-16">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#f5f6f7]">
            Personal Center
          </h1>
          <p className="mt-2 text-sm md:text-base text-[#9aa0a6]">
            Manage your wallet, withdrawals, history, and referral rewards in one
            place.
          </p>
        </div>

        <div className="rounded-2xl border border-[#232736] bg-[#0f121a]/90 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-4 md:px-6 md:py-5 border-b border-[#1f2430]">
            <div
              role="tablist"
              aria-label="Personal center tabs"
              className="flex flex-wrap gap-2 md:gap-3"
            >
              {TAB_ITEMS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm md:text-base font-semibold transition-all border ${
                      isActive
                        ? "text-[#f5c245] border-[#3a3f52] bg-[linear-gradient(135deg,#1f2432,#151926)] shadow-[0_0_20px_rgba(245,194,69,0.2)]"
                        : "text-[#8d9096] border-transparent hover:text-[#f5f6f7] hover:border-[#2b2f3b]"
                    }`}
                  >
                    <TabIcon kind={tab.id} className="h-4 w-4 md:h-5 md:w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-4 py-6 md:px-8 md:py-8">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_2fr] gap-6">
                  <div className="rounded-2xl border border-[#232736] bg-[#151925] p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f5c245,#b67a12)] text-xl font-bold text-[#161616]">
                        {userInitial}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                          Welcome back
                        </p>
                        <h2 className="text-2xl font-semibold text-[#f5f6f7]">
                          {userName}
                        </h2>
                        <p className="text-xs text-[#6f757e]">ID: {userId}</p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        { label: "VIP Level", value: "VIP 2" },
                        { label: "Security", value: "Verified" },
                        { label: "Status", value: "Active" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-[#1f2430] bg-[#0f121a] px-3 py-3"
                        >
                          <p className="text-xs text-[#7c828b]">{item.label}</p>
                          <p className="mt-1 text-sm font-semibold text-[#f5f6f7]">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        className="flex-1 rounded-full bg-[#183025] px-4 py-3 text-sm font-semibold text-[#4ade80] shadow-[0_8px_24px_rgba(74,222,128,0.2)] transition hover:-translate-y-0.5"
                        onClick={() => setActiveTab("deposit")}
                      >
                        Deposit
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-full bg-[#2f1b1d] px-4 py-3 text-sm font-semibold text-[#f87171] shadow-[0_8px_24px_rgba(248,113,113,0.2)] transition hover:-translate-y-0.5"
                        onClick={() => setActiveTab("withdraw")}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#232736] bg-[#11141f] p-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a2434] text-[#f5c245]">
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12h6" />
                            <path d="M12 9v6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-[#8d9096]">Game Coins</p>
                          <p className="text-3xl font-semibold text-[#f5c245]">
                            {formattedGameCoinsBalance}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block h-16 w-px bg-[#232736]" />
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a2434] text-[#4ade80]">
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M7 12h10" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-[#8d9096]">USDT</p>
                          <p className="text-3xl font-semibold text-[#4ade80]">
                            {formattedUsdtBalance}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="rounded-full bg-[#183025] px-4 py-3 text-sm font-semibold text-[#4ade80] shadow-[0_8px_24px_rgba(74,222,128,0.2)] transition hover:-translate-y-0.5"
                        onClick={() => setActiveTab("deposit")}
                      >
                        Deposit
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-[#2f1b1d] px-4 py-3 text-sm font-semibold text-[#f87171] shadow-[0_8px_24px_rgba(248,113,113,0.2)] transition hover:-translate-y-0.5"
                        onClick={() => setActiveTab("withdraw")}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Last login",
                      value: "2026-02-08 21:16",
                    },
                    {
                      label: "Total deposits",
                      value: "18,320.50 USDT",
                    },
                    {
                      label: "Referral earnings",
                      value: "126.80 USDT",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-[#1f2430] bg-[#10131b] px-4 py-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[#f5f6f7]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "deposit" && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 animate-fade-in">
                <div className="rounded-2xl border border-[#232736] bg-[#121622] p-6">
                  <h3 className="text-xl font-semibold text-[#f5f6f7]">
                    Deposit USDT
                  </h3>
                  <p className="mt-1 text-sm text-[#8d9096]">
                    Enter an amount and you will be redirected to the payment page.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-sm text-[#8d9096]">Amount</p>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="100"
                        value={depositAmount}
                        onChange={(event) => setDepositAmount(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3 text-sm text-[#f5f6f7] placeholder:text-[#5e636c] outline-none focus:border-[#f5c245]"
                      />
                    </div>

                    {paymentOrderId && (
                      <div className="rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3 text-xs text-[#9aa0a6]">
                        <span className="font-semibold text-[#f5f6f7]">Order ID:</span>{" "}
                        {paymentOrderId}
                      </div>
                    )}

                    {paymentUrl && (
                      <div>
                        <p className="text-sm text-[#8d9096]">Payment URL</p>
                        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3">
                          <span className="text-xs sm:text-sm font-mono text-[#d4d7dd] break-all">
                            {paymentUrl}
                          </span>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="rounded-full border border-[#2f3443] px-3 py-2 text-xs font-semibold text-[#cbd5f5] hover:border-[#f5c245] hover:text-[#f5c245]"
                              onClick={() => handleCopy(paymentUrl, "payment")}
                            >
                              {copied === "payment" ? "Copied" : "Copy"}
                            </button>
                            <button
                              type="button"
                              className="rounded-full border border-[#2f3443] px-3 py-2 text-xs font-semibold text-[#cbd5f5] hover:border-[#f5c245] hover:text-[#f5c245]"
                              onClick={() => window.open(paymentUrl, "_blank", "noopener,noreferrer")}
                            >
                              Open
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-4 text-sm text-[#9aa0a6]">
                      <p className="font-semibold text-[#f5f6f7]">Important</p>
                      <ul className="mt-2 space-y-2">
                        <li>Minimum deposit: 10 USDT.</li>
                        <li>Click Create Order to open the payment page.</li>
                        <li>Only send USDT via the selected network.</li>
                        <li>Funds will be credited after 1 confirmation.</li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={handleCreateOrder}
                      disabled={depositLoading}
                      className="w-full rounded-full bg-[#183025] px-4 py-3 text-sm font-semibold text-[#4ade80] shadow-[0_8px_24px_rgba(74,222,128,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {depositLoading ? "Creating order..." : "Create Order"}
                    </button>

                    {depositMessage && (
                      <p
                        className={`text-sm ${
                          depositMessage.type === "error"
                            ? "text-[#f87171]"
                            : "text-[#4ade80]"
                        }`}
                      >
                        {depositMessage.text}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#232736] bg-[#121622] p-6">
                  <h3 className="text-xl font-semibold text-[#f5f6f7]">
                    Deposit Tips
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-[#9aa0a6]">
                    <p>Keep the transaction hash for quick verification.</p>
                    <p>Deposits are usually credited within 5 minutes.</p>
                    <p>
                      Need help? Contact support with your wallet and TX hash.
                    </p>
                  </div>
                  <div className="mt-6 rounded-xl border border-[#1f2430] bg-[#0c0f16] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                      Current bonus
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[#f5c245]">
                      +5% on USDT deposits today
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "withdraw" && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 animate-fade-in">
                <div className="rounded-2xl border border-[#232736] bg-[#121622] p-6">
                  <h3 className="text-xl font-semibold text-[#f5f6f7]">
                    Withdraw USDT
                  </h3>
                  <p className="mt-1 text-sm text-[#8d9096]">
                    Fast withdrawals are available 24/7.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-sm text-[#8d9096]">Available Balance</p>
                      <p className="mt-1 text-2xl font-semibold text-[#4ade80]">
                        {formattedUsdtBalance} USDT
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-[#8d9096]">Amount</p>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="100"
                          value={withdrawAmount}
                          onChange={(event) => setWithdrawAmount(event.target.value)}
                          className="mt-2 w-full rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3 text-sm text-[#f5f6f7] placeholder:text-[#5e636c] outline-none focus:border-[#f5c245]"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-[#8d9096]">Network</p>
                        <select
                          value={withdrawNetwork}
                          onChange={(event) => setWithdrawNetwork(event.target.value)}
                          className="mt-2 w-full rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3 text-sm text-[#f5f6f7] outline-none focus:border-[#f5c245]"
                        >
                          <option>TRC20</option>
                          <option>ERC20</option>
                          <option>BEP20</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-[#8d9096]">Wallet Address</p>
                      <input
                        type="text"
                        placeholder="Enter destination address"
                        value={withdrawAddress}
                        onChange={(event) => setWithdrawAddress(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3 text-sm text-[#f5f6f7] placeholder:text-[#5e636c] outline-none focus:border-[#f5c245]"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#7c828b]">
                      <span>Fee: 1.00 USDT</span>
                      <span>Minimum: 10 USDT</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleWithdraw}
                      disabled={withdrawLoading}
                      className="w-full rounded-full bg-[#2f1b1d] px-4 py-3 text-sm font-semibold text-[#f87171] shadow-[0_8px_24px_rgba(248,113,113,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {withdrawLoading ? "Submitting..." : "Submit Withdrawal"}
                    </button>

                    {withdrawMessage && (
                      <p
                        className={`text-sm ${
                          withdrawMessage.type === "error"
                            ? "text-[#f87171]"
                            : "text-[#4ade80]"
                        }`}
                      >
                        {withdrawMessage.text}
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#232736] bg-[#121622] p-6">
                  <h3 className="text-xl font-semibold text-[#f5f6f7]">
                    Withdrawal Notes
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-[#9aa0a6]">
                    <p>Verify the address to avoid irreversible loss.</p>
                    <p>Processing time: 5-30 minutes.</p>
                    <p>Daily limit: 10,000 USDT.</p>
                  </div>
                  <div className="mt-6 rounded-xl border border-[#1f2430] bg-[#0c0f16] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                      Security
                    </p>
                    <p className="mt-2 text-sm text-[#f5f6f7]">
                      Enable 2FA for faster approvals.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-[#8d9096]">Order history</p>
                    {orderTotal !== null && (
                      <p className="text-xs text-[#6f757e]">
                        Total {orderTotal}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderPage((prev) => Math.max(1, prev - 1))}
                      disabled={!canPrevPage || ordersLoading}
                      className="rounded-full border border-[#2b2f3b] px-3 py-1 text-xs font-semibold text-[#cbd5f5] hover:border-[#f5c245] hover:text-[#f5c245] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="text-xs text-[#6f757e]">
                      Page {orderPage}
                      {totalPages ? ` / ${totalPages}` : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOrderPage((prev) => prev + 1)}
                      disabled={!canNextPage || ordersLoading}
                      className="rounded-full border border-[#2b2f3b] px-3 py-1 text-xs font-semibold text-[#cbd5f5] hover:border-[#f5c245] hover:text-[#f5c245] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {ordersMessage && (
                  <p
                    className={`text-sm ${
                      ordersMessage.type === "error"
                        ? "text-[#f87171]"
                        : "text-[#4ade80]"
                    }`}
                  >
                    {ordersMessage.text}
                  </p>
                )}

                {ordersLoading && (
                  <p className="text-sm text-[#8d9096]">Loading orders...</p>
                )}

                {!ordersLoading && historyItems.length === 0 && !ordersMessage && (
                  <p className="text-sm text-[#8d9096]">No orders yet.</p>
                )}

                {historyItems.length > 0 && (
                  <>
                    <div className="hidden md:grid grid-cols-5 gap-4 px-4 text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                      <span>Type</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span>Time</span>
                      <span>Action</span>
                    </div>
                    {historyItems.map((item) => {
                      const statusColor = getStatusColor(item.status);
                      const isSelected = selectedOrderId === item.orderId;
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl border border-[#1f2430] bg-[#10131b] px-4 py-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-start">
                            <div>
                              <p className="text-sm font-semibold text-[#f5f6f7]">
                                {item.type}
                              </p>
                              {item.method && (
                                <p className="text-xs text-[#7c828b]">
                                  {item.method}
                                </p>
                              )}
                            </div>
                            <div className="text-sm font-semibold text-[#f5f6f7]">
                              {item.amount || "-"}
                            </div>
                            <div className={`text-sm font-semibold ${statusColor}`}>
                              {item.status || "-"}
                            </div>
                            <div className="text-sm text-[#9aa0a6]">
                              {item.time || "-"}
                            </div>
                            <div>
                              {item.orderId ? (
                                <button
                                  type="button"
                                  onClick={() => handleViewOrderDetail(item.orderId)}
                                  className={`text-xs font-semibold ${
                                    isSelected
                                      ? "text-[#f5c245]"
                                      : "text-[#cbd5f5] hover:text-[#f5c245]"
                                  }`}
                                >
                                  {isSelected ? "Viewing" : "View detail"}
                                </button>
                              ) : (
                                <span className="text-xs text-[#6f757e]">-</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {orderDetailLoading && (
                  <p className="text-sm text-[#8d9096]">Loading order detail...</p>
                )}

                {orderDetail && (
                  <div className="rounded-xl border border-[#1f2430] bg-[#0c0f16] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                      Order Detail
                    </p>
                    <pre className="mt-3 max-h-72 overflow-auto text-xs text-[#d4d7dd]">
                      {JSON.stringify(orderDetail, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === "referral" && (
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 animate-fade-in">
                <div className="rounded-2xl border border-[#232736] bg-[#121622] p-6">
                  <h3 className="text-xl font-semibold text-[#f5f6f7]">
                    Referral Program
                  </h3>
                  <p className="mt-1 text-sm text-[#8d9096]">
                    Share your link and earn lifetime rewards.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                        Referral Code
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[#f5c245]">
                        {referralCode}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-[#8d9096]">Referral Link</p>
                      <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-[#232736] bg-[#0c0f16] px-4 py-3">
                        <span className="text-xs sm:text-sm font-mono text-[#d4d7dd] break-all">
                          {referralLink}
                        </span>
                        <button
                          type="button"
                          className="rounded-full border border-[#2f3443] px-4 py-2 text-xs font-semibold text-[#cbd5f5] hover:border-[#f5c245] hover:text-[#f5c245]"
                          onClick={() => handleCopy(referralLink, "referral")}
                        >
                          {copied === "referral" ? "Copied" : "Copy link"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Invited", value: "32" },
                      { label: "Active", value: "18" },
                      { label: "Rewards", value: "126.80 USDT" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-[#1f2430] bg-[#0c0f16] px-4 py-4"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-[#6f757e]">
                          {item.label}
                        </p>
                        <p className="mt-2 text-base font-semibold text-[#f5f6f7]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#232736] bg-[#121622] p-6">
                  <h3 className="text-xl font-semibold text-[#f5f6f7]">
                    Recent Referrals
                  </h3>
                  <div className="mt-4 space-y-3">
                    {REFERRAL_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#1f2430] bg-[#0c0f16] px-4 py-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-[#f5f6f7]">
                            {item.name}
                          </p>
                          <span
                            className={`text-xs font-semibold ${
                              item.status === "Active"
                                ? "text-[#4ade80]"
                                : "text-[#f5c245]"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#7c828b]">
                          Joined {item.joinedAt}
                        </p>
                        <p className="mt-2 text-sm text-[#f5c245]">
                          Reward: {item.reward}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
