import api from "@/api";
import { IUser } from "@/types/IUser";

export const login = async (
  username: string,
  password: string,
  login: (token: string, user: IUser) => void
): Promise<IUser> => {
  try {
    const response = await api.post<{
      token: string;
      user: IUser;
      refreshToken: string;
    }>("/auth/login", {
      username,
      password,
    });
    const { token, user, refreshToken } = response.data;

    // Store token and user in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("refreshToken", refreshToken);

    // Set the user and token in the context
    login(token, user);

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = (): IUser | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
