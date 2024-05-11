import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

export const EventOrder = sequelize.define<any>(
  "EventOrder",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    block: { type: DataTypes.BIGINT(), allowNull: false },
    address: { type: DataTypes.CHAR(42), allowNull: false },
    tx: { type: DataTypes.CHAR(66), allowNull: false },
    customer: { type: DataTypes.CHAR(42), allowNull: false },
    merchant: { type: DataTypes.CHAR(42), allowNull: false },
    cid: { type: DataTypes.CHAR(128), allowNull: false },
    size: { type: DataTypes.CHAR(64), allowNull: false },
    price: { type: DataTypes.CHAR(64), allowNull: false },
    isPermanent: { type: DataTypes.BOOLEAN(), allowNull: false },
  },
  { indexes: [{ fields: ["address", "customer", "merchant"], using: "BTREE" }] }
);
