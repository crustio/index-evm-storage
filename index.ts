import { apiServer } from "./api";
import { dbMigration } from "./migration";
import { startSchedules } from "./schedule";

async function main() {
  await dbMigration();
  await startSchedules();
  await apiServer();
}
main().catch(console.error);
