import type { ModelStatic } from "sequelize";
import { EventOrder } from "./EventOrder";
import { IndexConfig } from "./index_config";

export const models: { [k: string]: ModelStatic<any> } = {
  IndexConfig,
  EventOrder,
};

export async function syncModels() {
  for (const model of Object.values(models)) {
    await model.sync({ alter: true });
  }
}
