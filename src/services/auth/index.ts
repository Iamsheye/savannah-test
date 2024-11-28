import api from "../api";
import { LoginBody, LoginRes } from "./types";

export const loginUser = async (body: LoginBody) => {
  const response = await api.post<LoginRes>("/login", body);
  return response.data;
};
