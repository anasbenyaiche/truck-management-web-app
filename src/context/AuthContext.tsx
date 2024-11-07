import { IUser } from "@/types/IUser";
import  { createContext, useState, useEffect, ReactNode } from "react";


type Props = {
    children: ReactNode
}

export interface IAuthContext  {
    isAuthenticated : boolean;
    user:IUser| null
    login: (token: string, user: IUser) => void
    logout: () => void
}

const initialValue = {
    isAuthenticated: false,
    user: null ,
    login: () => {},
    logout: () => {},
  }

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthContextProvider = ({ children }:Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    // Optional: Implement logic to check token validity on app load (e.g., API call)
    // Update setIsAuthenticated based on the validity check
  }, []);

  const login = (token:string, user: IUser) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
