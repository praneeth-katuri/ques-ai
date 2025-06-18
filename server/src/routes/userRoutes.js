const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.use(authMiddleware);

router.post("/project", userController.addProject);

router.get("/projects", userController.getProjects);

router.get("/:projectId/podcasts", userController.getPodcasts);

router.post("/:projectId/podcasts", userController.addPodcast);

router.delete("/:projectId/podcasts/:podcastId", userController.deletePodcast);

module.exports = router;
