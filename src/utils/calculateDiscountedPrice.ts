/**
 * Calculates the final price after applying a percentage discount.
 *
 * @param price - Original product price
 * @param discountPercent - Discount percentage (0–100)
 * @returns Discounted price rounded to 2 decimal places
 */
export const calculateDiscountedPrice = (
  price: number,
  discountPercent: number
): number => {
  if (discountPercent <= 0) return +price.toFixed(2)

  const discountedPrice = price * (1 - discountPercent / 100)

  return +discountedPrice.toFixed(2)
}
