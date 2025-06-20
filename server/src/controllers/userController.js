const userService = require("../services/userService");

const addProject = async (req, res, next) => {
  try {
    const title = req.body.title;
    const userId = req.userId;

    const project = await userService.addProject(title, userId);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const projects = await userService.getProjects(req.userId);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

const getPodcasts = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.userId;

    const podcasts = await userService.getPodcasts(projectId, userId);
    res.status(200).json({ podcasts });
  } catch (err) {
    next(err);
  }
};

const addPodcast = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;
    const userId = req.userId;

    const podcast = await userService.addPodcast(
      projectId,
      title,
      description,
      userId
    );
    res.status(201).json({ podcast });
  } catch (err) {
    next(err);
  }
};

const updatePodcast = async (req, res, next) => {
  try {
    const { projectId, podcastId } = req.params;
    const userId = req.userId;
    const updateData = req.body;

    const updatedPodcast = await userService.updatePodcast(
      userId,
      projectId,
      podcastId,
      updateData
    );
    res.status(200).json(updatedPodcast);
  } catch (err) {
    next(err);
  }
};

const deletePodcast = async (req, res, next) => {
  try {
    const { projectId, podcastId } = req.params;
    const userId = req.userId;

    await userService.deletePodcast(projectId, podcastId, userId);
    res.status(200).json({ message: "Podcast deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    const user = await userService.updateProfile(userId, name);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
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
