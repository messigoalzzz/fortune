import axios from "axios";

// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
// const apiBaseUrl = "https://game.cac.homes";
const api = axios.create({
  // baseURL: apiBaseUrl,
  timeout: 15000,
});

export type ApiResponse<T = unknown> = {
  code: number;
  msg: string;
  data?: T;
};

export type LoginResponse = {
  token: string;
  expiretime: number;
  uid: number;
  uname: string;
  status: number;
};

export type RegisterResponse = {
  token: string;
  expiretime: number;
  jwt?: string;
  uname?: string;
  unick?: string;
  status?: number;
  uchip?: number | string;
  balance?: number | string;
};

export type UserInfoResponse = {
  uid: number;
  uname: string;
  unick?: string;
  uchip?: number | string;
  balance?: number | string;
};

export type GameListItem = {
  gameId: number;
  name?: string;
  namee?: string;
  coverUrl: string;
};

export type CreateOrderResponse = {
  orderId?: string;
  orderNo?: string;
  order_id?: string;
  payUrl?: string;
  url?: string;
  redirectUrl?: string;
  checkout_url?: string;
  address?: string;
  amount?: number | string;
  payment_info?: Array<{
    payment_address?: string;
    token_symbol?: string;
    blockchain?: string;
    token_name?: string;
    receive_amount?: string;
    receive_currency?: string;
    exchange_rate?: string;
    asset_logo?: string;
    logo_url?: string;
  }>;
  [key: string]: unknown;
};

export type ApplyWithdrawPayload = {
  amount: number | string;
  address: string;
};

export type OrderListItem = Record<string, unknown>;

export type OrderListResponse = {
  list?: OrderListItem[];
  rows?: OrderListItem[];
  data?: OrderListItem[];
  total?: number;
  totalCount?: number;
  total_count?: number;
};

export const login = (payload: { uname: string; upwd: string }) =>
  api.post<ApiResponse<LoginResponse>>("/api/user/login", payload);

export const register = (payload: {
  uname: string;
  email: string;
  upwd: string;
  code: string;
}) => api.post<ApiResponse<RegisterResponse>>("/api/user/register", payload);

export const sendRegisterCode = (email: string) =>
  api.post<ApiResponse>("/api/ems/send", { email, event: "register" });

export const fetchUserInfo = (token: string) =>
  api.get<ApiResponse<UserInfoResponse>>("/api/user/info", {
    headers: { token },
  });

export const fetchGameList = () =>
  api.get<ApiResponse<GameListItem[]>>("/api/game/list");

export const createOrder = (token: string, payload: { amount: number | string }) =>
  api.post<ApiResponse<CreateOrderResponse>>("/api/create/order", payload, {
    headers: { token },
  });

export const applyWithdraw = (token: string, payload: ApplyWithdrawPayload) =>
  api.post<ApiResponse>("/api/apply/withdraw", payload, {
    headers: { token },
  });

export const fetchOrderList = (
  token: string,
  params: { page: number; limit: number },
) =>
  api.get<ApiResponse<OrderListItem[] | OrderListResponse>>("/api/order/list", {
    headers: { token },
    params,
  });

export const fetchOrderDetail = (
  token: string,
  params: { orderId: string },
) =>
  api.get<ApiResponse<OrderListItem>>("/api/order/detail", {
    headers: { token },
    params,
  });

export default api;
