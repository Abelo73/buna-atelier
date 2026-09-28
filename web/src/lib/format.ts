import { menuConfig } from '../data/menu'

export function formatPrice(price?: number) {
  if (!menuConfig.showPrices || price === undefined) return 'Price on request'
  return `${price.toLocaleString('en-US')} ${menuConfig.currency}`
}
