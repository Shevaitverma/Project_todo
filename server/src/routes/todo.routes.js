import { Router } from "express";
import {verifyJwt} from "../middlewares/auth.middleware.js"
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const router = Router()

router.route("/todos").post(verifyJwt, createTodo);
router.route("/todos").get(verifyJwt, getTodos);
router.route("/todos/:id").get(verifyJwt, getTodo);
router.route("/todos/:id").put(verifyJwt, updateTodo);
router.route("/todos/:id").delete(verifyJwt, deleteTodo);

export default router;