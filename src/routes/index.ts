import express, { type Express } from "express";

import authRouter from "@modules/auth/auth.routes.js";
import postRouter from "@modules/post/post.routes.js";
import userRouter from "@modules/user/user.routes.js";
import likeRouter from "@modules/like/like.routes.js";
import followRouter from "@modules/follow/follow.routes.js";
import profileRouter from "@modules/profile/profile.routes.js";
import commentRouter from "@modules/comment/comment.routes.js";

const indexRouter: Express = express();

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/posts", postRouter);
indexRouter.use("/follow", followRouter);
indexRouter.use("/profiles", profileRouter);
indexRouter.use("/likes", likeRouter);
indexRouter.use("/comments", commentRouter);

export default indexRouter;
