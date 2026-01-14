import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RESTAURANT_LOCATION, FREE_DELIVERY_DISTANCE_KM, FREE_DELIVERY_MIN_TOTAL, DELIVERY_FEE_PER_KM } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
}

export function calculateDistance(lat: number, lng: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat - RESTAURANT_LOCATION.lat) * Math.PI) / 180
  const dLng = ((lng - RESTAURANT_LOCATION.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((RESTAURANT_LOCATION.lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function calculateDeliveryFee(distance: number, subtotal: number): number {
  if (distance <= FREE_DELIVERY_DISTANCE_KM || subtotal >= FREE_DELIVERY_MIN_TOTAL) {
    return 0
  }
  return Math.round(distance * DELIVERY_FEE_PER_KM)
}

export function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`
}
