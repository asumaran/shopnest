export const FREE_SHIPPING_THRESHOLD = 50;

interface ShippingTier {
  minItems: number;
  maxItems: number;
  cost: number;
}

const SHIPPING_TIERS: ShippingTier[] = [
  { minItems: 1, maxItems: 3, cost: 4.99 },
  { minItems: 5, maxItems: 10, cost: 7.99 },
  { minItems: 11, maxItems: Infinity, cost: 11.99 },
];

export function getShippingCost(subtotal: number, itemCount: number): number {
  if (subtotal > FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  const tier = SHIPPING_TIERS.find(
    (t) => itemCount >= t.minItems && itemCount <= t.maxItems
  );

  return tier ? tier.cost : 0;
}
