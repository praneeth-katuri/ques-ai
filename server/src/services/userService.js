const Podcast = require("../models/Podcast");
const Project = require("../models/Project");
const User = require("../models/User");

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

  const podcasts = await Podcast.find({ projectId }).sort({ createdAt: -1 });
  return podcasts;
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

const updatePodcast = async (userId, projectId, podcastId, updateData) => {
  const projectExists = await Project.findOne({ _id: projectId, userId });

  if (!projectExists) {
    const error = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  const podcast = await Podcast.findOneAndUpdate(
    {
      _id: podcastId,
      projectId,
    },
    updateData,
    { new: true }
  );

  if (!podcast) {
    const error = new Error("Podcast not found");
    error.status = 404;
    throw error;
  }

  return podcast;
};

const deletePodcast = async (projectId, podcastId, userId) => {
  console.log("prjectID", projectId);
  console.log("podcastId", podcastId);
  console.log("userId", userId);
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

  await Promise.all([
    podcast.deleteOne(),
    Project.updateOne({ _id: projectId }, { updatedAt: new Date() }),
  ]);
};

const updateProfile = async (userId, name) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { name },
    { new: true, runValidators: true, context: "query" }
  );

  if (!user) {
    const error = new Error("User not found or unauthorized");
    error.status = 401;
    throw error;
  }

  return user;
};

module.exports = {
  addProject,
  getProjects,
  getPodcasts,
  addPodcast,
  updatePodcast,
  deletePodcast,
  updateProfile,
};
