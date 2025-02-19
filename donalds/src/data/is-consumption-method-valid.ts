export function isConsumptionMethodValid(consumptionMethod: string) {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}
