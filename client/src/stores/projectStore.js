import { create } from "zustand";

export const useProjectStore = create((set, get) => ({
  projects: [],
  selectedProject: null,
  currentPodcasts: [],

  updatePodcastCount: (projectId, delta) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? { ...project, podcastCount: (project.podcastCount || 0) + delta }
          : project
      ),
    })),

  updateProjectTimestamp: (projectId) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project._id === projectId
          ? { ...project, updatedAt: new Date().toISOString() }
          : project
      ),
    })),

  getProjectNameById: (id) =>
    get().projects.find((project) => project._id === id)?.title ||
    "Unnamed Project",

  setProjects: (value) => set({ projects: value }),

  addProject: (value) =>
    set((state) => ({ projects: [...state.projects, value] })),

  updatePodcastInStore: (podcastId, updatedData) =>
    set((state) => ({
      currentPodcasts: state.currentPodcasts.map((p) =>
        p._id === podcastId ? { ...p, ...updatedData } : p
      ),
    })),

  setSelectedProject: (project) =>
    set({ selectedProject: project, currentPodcasts: [] }),

  setCurrentPodcasts: (podcasts) => set({ currentPodcasts: [...podcasts] }),

  addToCurrentPodcasts: (podcast) =>
    set((state) => ({
      currentPodcasts: [podcast, ...state.currentPodcasts],
    })),

  deletePodcast: (id) =>
    set((state) => ({
      currentPodcasts: state.currentPodcasts.filter(
        (podcast) => podcast._id !== id
      ),
    })),
}));
