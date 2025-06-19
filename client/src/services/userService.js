import api from "@/services/api";
import { useProjectStore } from "../stores/projectStore";

export const addProject = async (project) => {
  await api.post("/user/project", project);
  useProjectStore.getState().addProject(project);
};

export const getProjects = async () => {
  const { data } = await api.get("/user/projects");
  useProjectStore.getState().setProjects(data);
};

export const getPodcasts = async (projectId) => {
  const { data } = await api.get(`/user/${projectId}/podcasts`);
  useProjectStore.getState().setCurrentPodcasts(data);
};

export const addPodcast = async (podcast, projectId) => {
  await api.post(`/user/${projectId}/podcasts`, podcast);
  useProjectStore.getState().addToCurrentPodcasts(podcast);
};

export const deletePodcast = async (projectId, podcastId) => {
  await api.delete(`/user/${projectId}/podcasts/${podcastId}`);
  useProjectStore.getState().deletePodcast(podcastId);
};
