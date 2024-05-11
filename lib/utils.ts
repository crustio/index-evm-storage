export const DECIMAL = 10n ** 18n;
export function getEnv(value: string, defaultValue: any = ""): string {
  return process.env[value] || `${defaultValue}`;
}
export async function loopRun(
  name: string,
  fn: () => Promise<void>,
  wait = 2000
) {
  while (true) {
    try {
      await fn();
    } catch (error) {
      console.error(`${name}_Error`, error);
    }
    await new Promise((resovle) => setTimeout(resovle, wait));
  }
}

export function eqAddress(a1: string, a2: string) {
  if (!a1 || !a2) return false;
  return a1.toLowerCase() == a2.toLowerCase();
}

export function sleep(time: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function timestamp(): number {
  return Math.floor(new Date().getTime() / 1000);
}

export function bigintMin(nums: bigint[]) {
  if (nums.length == 0) return 0n;
  let min = nums[0];
  nums.forEach((num) => {
    min = num < min ? num : min;
  });
  return min;
}
