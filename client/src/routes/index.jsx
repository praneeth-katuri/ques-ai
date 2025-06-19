import { Routes, Route } from "react-router-dom";
import Projects from "../pages/Projects";
import MainLayout from "../layouts/MainLayout";
import Podcasts from "../pages/Podcasts";
import EditPodcasts from "../pages/EditPodcast";
import EditProfile from "../pages/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Projects />} />
      <Route path=":projectId" element={<Podcasts />} />
      <Route path=":projectId/:podcastId/view" element={<EditPodcasts />} />
      <Route path=":projectId/:podcastId/edit" element={<EditPodcasts />} />
      <Route path="user/edit" element={<EditProfile />} />
    </Route>
  </Routes>
);

export default AppRoutes;
