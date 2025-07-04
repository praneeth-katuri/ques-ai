import api from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { setupInterceptors } from "@/services/api/axiosInterceptor";
import { useProjectStore } from "@/stores/projectStore";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  const { user, accessToken, projects } = res.data;

  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("hasSession", "true");

  const { setAccessToken, setUser, setIsAuthenticated } =
    useAuthStore.getState();

  const { setProjects } = useProjectStore.getState();

  setAccessToken(accessToken);
  setUser(user);
  setProjects(projects);
  setIsAuthenticated(true);
};

export const signup = async (name, email, password, confirmPassword) => {
  return await api.post("/auth/register", {
    name,
    email,
    password,
    confirmPassword,
  });
};

export const logout = async () => {
  const { setAccessToken, setUser, setIsAuthenticated } =
    useAuthStore.getState();

  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.warn("Logout failed:", err.message);
  } finally {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("hasSession");

    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }
};

export const refresh = async () => {
  const { setAccessToken, setUser, setIsAuthenticated, setIsLoading } =
    useAuthStore.getState();

  const { setProjects } = useProjectStore.getState();

  try {
    const res = await api.get("/auth/refresh");

    const { user, accessToken, projects } = res.data;

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setAccessToken(accessToken);
    setUser(user);
    setProjects(projects);
    setIsAuthenticated(true);
  } catch (err) {
    console.warn("Refresh failed:", err.message);
    localStorage.removeItem("hasSession");

    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  } finally {
    setIsLoading(false);
  }
};

export const initializeInterceptors = () => {
  const { setAccessToken } = useAuthStore.getState();
  const logoutFn = logout;
  setupInterceptors(setAccessToken, logoutFn);
};
