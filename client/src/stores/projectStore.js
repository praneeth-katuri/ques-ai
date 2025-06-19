import { create } from "zustand";

export const useProjectStore = create((set) => ({
  projects: [],
  selectedProject: null,
  currentPodcasts: [],

  setProjects: (value) => set({ projects: value }),
  addProject: (value) =>
    set((state) => ({ projects: [...state.projects, value] })),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setCurrentPodcasts: (podcasts) => set({ currentPodcasts: podcasts }),
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
