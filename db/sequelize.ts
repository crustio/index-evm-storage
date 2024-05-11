import { Sequelize } from "sequelize";
import { CONFIGS } from "../config";
export const sequelize = new Sequelize({
  database: CONFIGS.database.database,
  username: CONFIGS.database.user,
  password: CONFIGS.database.password,
  host: CONFIGS.database.host,
  port: CONFIGS.database.port,
  pool: {
    max: 10,
    min: 0,
  },
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: true,
  },
  sync: {
    alter: true,
  },
  logging: Bun.env.NODE_ENV == "development", // 生产环境关闭日志
});
