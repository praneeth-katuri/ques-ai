import { Routes, Route } from "react-router-dom";
import Projects from "../pages/Projects";
import MainLayout from "../layouts/MainLayout";
import Podcasts from "../pages/Podcasts";
import EditPodcasts from "../pages/EditPodcast";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import { LoginForm, RegisterForm } from "@/components/auth/AuthForms";
import NotFound from "@/pages/NotFound";
import AccountSettings from "@/components/auth/AccountSettings";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Route>
    <Route path="projects" element={<Projects />} />

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
);

export default AppRoutes;
