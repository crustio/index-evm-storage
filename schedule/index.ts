import { fetchAllEvent } from "./syncEvents";

export async function startSchedules() {
  await fetchAllEvent();
}
