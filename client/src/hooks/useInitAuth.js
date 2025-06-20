import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { initializeInterceptors, refresh } from "@/services/loginService";

export function useInitAuth() {
  useEffect(() => {
    const { setIsLoading } = useAuthStore.getState();

    // Set up Axios interceptors
    initializeInterceptors();

    // Try to refresh if session exists
    if (localStorage.getItem("hasSession")) {
      refresh();
    } else {
      setIsLoading(false);
    }
  }, []);
}
