import { DataTypes, type Attributes, type UpdateOptions } from "sequelize";
import { sequelize } from "../db/sequelize";

export const IndexConfig = sequelize.define<any>("IndexConfig", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.CHAR(128), allowNull: false },
  value: { type: DataTypes.BIGINT, allowNull: false },
});

export async function getIndexConfigValueStr(name: string, value = "") {
  const ic = await IndexConfig.findOne({
    attributes: ["value"],
    where: { name },
  });
  return ic && ic.value ? `${ic.value}` : value;
}

export async function getIndexConfigValue(name: string, def = 0n) {
  const ic = await IndexConfig.findOne({
    attributes: ["value"],
    where: { name },
  });
  return ic && ic.value ? BigInt(ic.value) : def;
}

export async function setIndexCofnigValue(
  name: string,
  value: bigint,
  option: Omit<UpdateOptions<Attributes<any>>, "where"> = {}
) {
  const item = await IndexConfig.findOne({
    attributes: ["id"],
    where: { name },
  });
  if (item) {
    await IndexConfig.update({ value }, { ...option, where: { name } });
  } else {
    await IndexConfig.create({ name, value }, { ...option });
  }
}
