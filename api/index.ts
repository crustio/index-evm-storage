import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { CONFIGS } from "../config";
import { CommonResponse } from "../lib/common";
import { apiRouter } from "./router";

export async function apiServer() {
  const port = CONFIGS.server.port;
  const app = express();
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/ping", (req, res) => {
    CommonResponse.success().send(res);
  });
  app.use("/api", apiRouter);
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(`Server stack: ${err.stack} \n msg: ${err.message}`);
  });
  console.info(`Server start on: ${port}`);
  app.listen(CONFIGS.server.port);
}
