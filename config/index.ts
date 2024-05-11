import _ from "lodash";
import { getEnv } from "../lib/utils";
import type { Address } from "viem";

export const CONFIGS = {
  database: {
    host: getEnv("MYSQL_HOST", "localhost"),
    port: _.parseInt(getEnv("MYSQL_PORT", 23306)),
    database: getEnv("MYSQL_DATABASE", "evmstorage"),
    user: getEnv("MYSQL_USER", "root"),
    password: getEnv("MYSQL_PASSWORD", "root"),
    schemaTable: "data_migration",
    location: "../sql",
  },
  server: {
    port: getEnv("PORT", 3000),
  },
  chainId: 366666,
  EVM_STORAGE_ADDRESS: getEnv("EVM_STORAGE_ADDRESS", "0xA40179e57280585D88899b2032E7eCF13B3B6c72") as Address,
};
