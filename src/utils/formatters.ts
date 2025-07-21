/**
 * Formats a number as a price with commas as thousands separators
 * @param price - The price number to format
 * @returns Formatted price string with commas
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString();
};

/**
 * Formats a price with currency symbol
 * @param price - The price number to format
 * @param currency - Currency symbol (default: 'Ks')
 * @returns Formatted price string with commas and currency
 */
export const formatPriceWithCurrency = (price: number, currency: string = 'Ks'): string => {
  return `${formatPrice(price)} ${currency}`;
};
