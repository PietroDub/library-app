import { Router } from "express";
import UserController from "../Controllers/UserController.js";

const userRoutes = Router();

userRoutes.post("/create", UserController.CreateUser);
userRoutes.get("/all", UserController.GetAllUsers);
userRoutes.get("/:id", UserController.GetUserById);
userRoutes.put("/:id", UserController.UpdateUser);
userRoutes.delete("/:id", UserController.DeleteUser);
userRoutes.post("/login", UserController.LoginUser);
export default userRoutes;