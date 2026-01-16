import express, { type Express } from "express";

import authRouter from "@/modules/auth/auth.routes.js";
// import userRouter from "@/modules/user/user.routes.js";
import postRouter from "@/modules/post/post.routes.js";
// import commentRouter from "@/modules/comment/comment.routes.js";

const indexRouter: Express = express();

indexRouter.use("/auth", authRouter);
// indexRouter.use('/users', userRouter);
indexRouter.use('/posts', postRouter);
// indexRouter.use('/comments', commentRouter);

export default indexRouter;
