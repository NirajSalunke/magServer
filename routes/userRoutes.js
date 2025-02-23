import { Router } from "express";
import { getRole, singup } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup",singup);
userRouter.post("/get-role",getRole);
export default userRouter;