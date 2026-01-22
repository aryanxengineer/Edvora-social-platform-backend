import express, { type Express } from "express";

import authRouter from "@/modules/auth/auth.routes.js";
import postRouter from "@/modules/post/post.routes.js";

const indexRouter: Express = express();

indexRouter.use("/auth", authRouter);
indexRouter.use("/posts", postRouter);

export default indexRouter;
