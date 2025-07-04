import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";
import { useAuthStore } from "./stores/authStore";
import { useInitAuth } from "./hooks/useInitAuth";
import Spinner from "./components/ui/Spinner";
import { Analytics } from "@vercel/analytics/react";
const App = () => {
  const isLoading = useAuthStore((s) => s.isLoading);
  useInitAuth();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Toaster />
      <AppRoutes />
      <Analytics />
    </>
  );
};

export default App;
