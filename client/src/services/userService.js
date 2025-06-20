import api from "@/services/api";
import { useProjectStore } from "../stores/projectStore";
import { useAuthStore } from "@/stores/authStore";

export const addProject = async (project) => {
  const { data } = await api.post("/user/project", project);
  useProjectStore.getState().addProject(data);
};

export const getProjects = async () => {
  const { data } = await api.get("/user/projects");
  useProjectStore.getState().setProjects(data);
};

export const getPodcasts = async (projectId) => {
  const res = await api.get(`/user/${projectId}/podcasts`);
  const podcasts = res.data?.podcasts || [];
  useProjectStore.getState().setCurrentPodcasts(podcasts);
};

export const addPodcast = async (podcast, projectId) => {
  const res = await api.post(`/user/${projectId}/podcasts`, podcast);
  useProjectStore.getState().addToCurrentPodcasts(res.data?.podcast);
};

export const updatePodcast = async (podcastId, projectId, data) => {
  const res = await api.patch(`/user/${projectId}/podcasts/${podcastId}`, data);
  useProjectStore.getState().updatePodcastInStore(podcastId, res.data);
};

export const deletePodcast = async (projectId, podcastId) => {
  await api.delete(`/user/${projectId}/podcasts/${podcastId}`);
  useProjectStore.getState().deletePodcast(podcastId);
};

export const updateProfile = async (data) => {
  const res = await api.patch("/user/edit", data);
  useAuthStore.getState().setUser(res.data);
};
