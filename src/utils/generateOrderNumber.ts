export function generateOrderNumber(): string {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  return `ORD-${unixTimestamp}`;
}
