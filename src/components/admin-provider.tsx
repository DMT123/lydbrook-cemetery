"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AdminAuth {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminAuth>({
  isAuthenticated: false,
  isLoading: true,
  username: null,
  login: async () => {},
  logout: async () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    setToken(stored);
    setIsLoading(false);
  }, []);

  const session = useQuery(
    api.admin.verifySession,
    token ? { token } : "skip",
  );

  const loginAction = useAction(api.adminActions.login);
  const logoutMutation = useMutation(api.admin.logout);

  const login = useCallback(
    async (username: string, password: string) => {
      const result = await loginAction({ username, password });
      localStorage.setItem("admin_token", result.token);
      setToken(result.token);
    },
    [loginAction],
  );

  const logout = useCallback(async () => {
    if (token) {
      await logoutMutation({ token });
    }
    localStorage.removeItem("admin_token");
    setToken(null);
  }, [token, logoutMutation]);

  const isAuthenticated = !isLoading && !!token && !!session;

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isLoading: isLoading || (!!token && session === undefined),
        username: session?.username ?? null,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
