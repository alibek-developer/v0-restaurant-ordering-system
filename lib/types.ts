export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  available_on_mobile: boolean
  available_on_website: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  mode: "dine-in" | "delivery"
  table_number?: string
  delivery_address?: string
  delivery_distance?: number
  items: CartItem[]
  subtotal: number
  delivery_fee: number
  total: number
  status: "new" | "preparing" | "ready" | "delivered"
  source: "website" | "mobile" | "call-center"
  payment_method: "cash" | "card" | "click" | "payme"
}

export const CATEGORIES = [
  { id: "appetizers", name: "Salatlar", icon: "🥗" },
  { id: "main", name: "Asosiy taomlar", icon: "🍽️" },
  { id: "soups", name: "Sho'rvalar", icon: "🍲" },
  { id: "grilled", name: "Kaboblar", icon: "🍢" },
  { id: "drinks", name: "Ichimliklar", icon: "🥤" },
  { id: "desserts", name: "Shirinliklar", icon: "🍰" },
] as const

export const RESTAURANT_LOCATION = {
  lat: 41.311081,
  lng: 69.240562,
  address: "Toshkent markazi",
}

export const FREE_DELIVERY_DISTANCE_KM = 3
export const FREE_DELIVERY_MIN_TOTAL = 300000
export const DELIVERY_FEE_PER_KM = 5000
