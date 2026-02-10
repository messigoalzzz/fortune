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

export type UserInfoResponse = {
  uid: number;
  uname: string;
};

export type GameListItem = {
  gameId: number;
  name?: string;
  namee?: string;
  coverUrl: string;
};

export const login = (payload: { uname: string; upwd: string }) =>
  api.post<ApiResponse<LoginResponse>>("/api/user/login", payload);

export const register = (payload: {
  uname: string;
  email: string;
  upwd: string;
  code: string;
}) => api.post<ApiResponse>("/api/user/register", payload);

export const sendRegisterCode = (email: string) =>
  api.post<ApiResponse>("/api/ems/send", { email, event: "register" });

export const fetchUserInfo = (token: string) =>
  api.get<ApiResponse<UserInfoResponse>>("/api/user/info", {
    headers: { token },
  });

export const fetchGameList = () =>
  api.get<ApiResponse<GameListItem[]>>("/api/game/list");

export default api;
