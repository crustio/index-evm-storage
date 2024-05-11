import express from "express";
import { models } from "../model";
import { CommonResponse } from "../lib/common";
export const apiRouter = express.Router();

apiRouter.get("/hasOrder", async (req, res) => {
  const account = req.query.account;
  const order = await models.EventOrder.findOne({ where: { customer: account } });
  return CommonResponse.success(!!order).send(res);
});
