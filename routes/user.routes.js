
import { Router } from "express";
import { login, register } from "../controller/user.controller.js";
import upload from "../upload.js";

export const userRouter = Router();

userRouter.post("/register", register )
userRouter.post("/login", login)
userRouter.post('/upload', upload.single('image'), (req, res) => {
    try {
      res.status(200).json({
        message: 'Imagen subida con éxito',
        file: req.file,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  