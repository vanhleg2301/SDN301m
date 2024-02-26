import express from "express";
import { imageController } from "../controllers/index.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.getAllImages);

imageRouter.post("/", imageController.createImage);

imageRouter.get("/:id", (req, res) => {
  res.send("get by id");
});

imageRouter.put("/:id", (req, res) => {
  res.send("update");
});

imageRouter.delete("/:id", (req, res) => {
  res.send("delete");
});

export default imageRouter;
