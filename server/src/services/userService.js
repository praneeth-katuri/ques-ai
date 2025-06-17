const Podcast = require("../models/Podcast");
const Project = require("../models/Project");

const addProject = async (title, userId) => {
  const projectExists = await Project.findOne({ title, userId });

  if (projectExists) {
    const error = new Error("project already exists");
    error.status = 409;
    throw error;
  }

  return await Project.create({ title, userId });
};

const getProjects = async (userId) => {
  return await Project.find({ userId });
};

const getPodcasts = async (projectId, userId) => {
  const projectExists = await Project.findOne({ _id: projectId, userId });

  if (!projectExists) {
    const error = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  return await Podcast.find({ projectId }).sort({ createdAt: -1 });
};

const addPodcast = async (projectId, title, description, userId) => {
  const projectExists = await Project.findOne({ _id: projectId, userId });

  if (!projectExists) {
    const error = new Error("Project not found");
    error.status = 404;
    throw error;
  }
  const [podcast] = await Promise.all([
    Podcast.create({ projectId, title, description }),
    Project.updateOne({ _id: projectId }, { updatedAt: new Date() }),
  ]);
  return podcast;
};

const deletePodcast = async (projectId, podcastId, userId) => {
  const projectExists = await Project.findOne({ _id: projectId, userId });

  if (!projectExists) {
    const error = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  const podcast = await Podcast.findOne({ _id: podcastId, projectId });
  if (!podcast) {
    const error = new Error("Podcast not found in this project");
    error.status = 404;
    throw error;
  }

  await promise.all([
    podcast.deleteOne(),
    Project.updateOne({ _id: projectId }, { updatedAt: new Date() }),
  ]);
};

module.exports = {
  addProject,
  getProjects,
  getPodcasts,
  addPodcast,
  deletePodcast,
};
