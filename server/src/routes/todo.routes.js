import { Router } from "express";
import {verifyJwt} from "../middlewares/auth.middleware.js"
import { createTodo, getTodo, getTodos } from "../controllers/todo.controller.js";

const router = Router()

router.route("/todos").post(verifyJwt, createTodo);
router.route("/todos").get(verifyJwt, getTodos);
router.route("/todos/:id").put(verifyJwt, getTodo)

export default router;