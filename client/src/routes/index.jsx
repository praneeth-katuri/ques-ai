import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "@/components/ui/Spinner";

// Lazy-loaded pages and layouts
const Projects = lazy(() => import("../pages/Projects"));
const Podcasts = lazy(() => import("../pages/Podcasts"));
const EditPodcasts = lazy(() => import("../pages/EditPodcast"));
const NotFound = lazy(() => import("../pages/NotFound"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const AccountSettings = lazy(() => import("@/components/auth/AccountSettings"));
const LoginForm = lazy(() =>
  import("@/components/auth/AuthForms").then((mod) => ({
    default: mod.LoginForm,
  }))
);
const RegisterForm = lazy(() =>
  import("@/components/auth/AuthForms").then((mod) => ({
    default: mod.RegisterForm,
  }))
);

const AppRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route index element={<RegisterForm />} />
      </Route>

      <Route
        path="projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/:projectId"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Podcasts />} />
        <Route path=":podcastId" element={<EditPodcasts />} />
        <Route path="user/edit" element={<AccountSettings />} />
        <Route path="404/*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
