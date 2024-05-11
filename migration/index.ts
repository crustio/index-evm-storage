import { createConnection } from "mysql2/promise";
import { syncModels } from "../model";
import { CONFIGS } from "../config";

export const dbMigration = async () => {
  await createDb();
  await syncModels();
};

async function createDb() {
  try {
    const { host, port, user, password, database } = CONFIGS.database;
    const connection = await createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
    await connection.end();
  } catch (error) {
    console.info("database:", CONFIGS.database);
    throw error;
  }
}
