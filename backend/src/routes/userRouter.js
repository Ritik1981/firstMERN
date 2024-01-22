import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.route('/register').post(
    // upload.single("image"),
    registerUser
)
userRouter.route('/login').post(
    // upload.single("image"),
    loginUser
)

export default userRouter;