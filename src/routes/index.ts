import express, { type Express } from "express";

import authRouter from "@modules/auth/auth.routes.js";
import postRouter from "@modules/post/post.routes.js";
import userRouter from "@modules/user/user.routes.js";
import followRouter from "@modules/follow/follow.routes.js";
import profileRouter from "@modules/profile/profile.routes.js";

const indexRouter: Express = express();

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/posts", postRouter);
indexRouter.use("/follows", followRouter);
indexRouter.use("/profiles", profileRouter);

export default indexRouter;
