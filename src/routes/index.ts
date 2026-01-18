import express, { type Express } from "express";

import authRouter from "@/modules/auth/auth.routes.js";

const indexRouter: Express = express();

indexRouter.use("/auth", authRouter);

export default indexRouter;
