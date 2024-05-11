import { type ModelStatic } from "sequelize";
import { parseEventLogs, type Abi, type AbiEvent, type Address } from "viem";
import { sequelize } from "../db/sequelize";
import { pc } from "../lib/client";
import { bigintMin, loopRun } from "../lib/utils";
import { getIndexConfigValue, setIndexCofnigValue } from "../model/index_config";
import { CONFIGS } from "../config";
import { abiEvmStorage } from "../abis";
import { models } from "../model";
import _ from "lodash";

type EVENT_CONFIG = { address: Address; abi: Abi; name: string; model: ModelStatic<any>; start?: bigint };
const event_configs: EVENT_CONFIG[] = [
  {
    address: CONFIGS.EVM_STORAGE_ADDRESS,
    abi: abiEvmStorage,
    name: "Order",
    model: models.EventOrder,
    start: 35785n,
  },
];

async function fetchEvent(ec: EVENT_CONFIG) {
  // console.info('ec:', ec)
  const indexCurrentName = `event_${ec.name}_current_${ec.address}`;
  const start = await getIndexConfigValue(indexCurrentName, ec.start || 1n);
  const chunk = await getIndexConfigValue(`event_block_chunk`, 10000n);
  if (start <= 0n) {
    return;
  }
  const blockNumber = await pc.getBlockNumber({ cacheTime: 5000 });
  const end = bigintMin([start + chunk, blockNumber]);
  if (end <= start) {
    return;
  }
  const eventAbi = _.find(ec.abi, (item: { type: string; name: string }) => item.type == "event" && item.name == ec.name);
  console.info(indexCurrentName, start, end);
  const logs = await pc.getLogs({
    address: ec.address,
    event: eventAbi as AbiEvent,
    fromBlock: start + 1n,
    toBlock: end,
  });
  const events = parseEventLogs({ abi: ec.abi, logs });
  const models = events.map((e) => ({
    block: e.blockNumber,
    address: e.address,
    tx: e.transactionHash,
    ...(e as any).args,
  }));
  await sequelize.transaction(async (transaction) => {
    if (models.length > 0) {
      await ec.model.bulkCreate(models, { transaction });
    }
    await setIndexCofnigValue(indexCurrentName, end, { transaction });
  });
}

export async function fetchAllEvent() {
  const map = new Map<ModelStatic<any>, EVENT_CONFIG[]>();
  event_configs.forEach((e) => {
    if (!map.has(e.model)) {
      map.set(e.model, [e]);
    } else {
      map.get(e.model)?.push(e);
    }
  });
  map.forEach((eventConfigs, model) => {
    loopRun(
      `fetchEvent_${model.name}`,
      async () => {
        for (const e of eventConfigs) {
          await fetchEvent(e);
        }
      },
      2000
    );
  });
}
