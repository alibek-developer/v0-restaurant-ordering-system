"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { MapPin, Search, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RESTAURANT_LOCATION } from "@/lib/types"
import { calculateDistance } from "@/lib/utils"

interface LocationPickerProps {
  onLocationSelect: (address: string, distance: number) => void
}

// Simulated locations in Tashkent for demo
const DEMO_LOCATIONS = [
  { name: "Yunusobod tumani, 12-uy", lat: 41.3401, lng: 69.2868 },
  { name: "Mirzo Ulug'bek tumani, 45-uy", lat: 41.3224, lng: 69.2955 },
  { name: "Chilonzor tumani, 7-mavze", lat: 41.2862, lng: 69.1871 },
  { name: "Sergeli tumani, 10-uy", lat: 41.2278, lng: 69.2194 },
  { name: "Shayxontohur tumani, 23-uy", lat: 41.3275, lng: 69.2186 },
  { name: "Olmazor tumani, 8-uy", lat: 41.3451, lng: 69.1998 },
  { name: "Yakkasaroy tumani, 15-uy", lat: 41.2934, lng: 69.2756 },
  { name: "Mirobod tumani, 3-uy", lat: 41.3112, lng: 69.2734 },
]

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const filteredLocations = DEMO_LOCATIONS.filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLocationSelect = useCallback(
    (location: { name: string; lat: number; lng: number }) => {
      setSelectedLocation({ lat: location.lat, lng: location.lng })
      setSearchQuery(location.name)
      setShowSuggestions(false)
      const distance = calculateDistance(location.lat, location.lng)
      onLocationSelect(location.name, distance)
    },
    [onLocationSelect],
  )

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mapRef.current) return

      const rect = mapRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Convert click position to lat/lng (simplified for demo)
      // Map bounds approximately cover Tashkent area
      const latRange = { min: 41.2, max: 41.4 }
      const lngRange = { min: 69.1, max: 69.4 }

      const lat = latRange.max - (y / rect.height) * (latRange.max - latRange.min)
      const lng = lngRange.min + (x / rect.width) * (lngRange.max - lngRange.min)

      setSelectedLocation({ lat, lng })
      const distance = calculateDistance(lat, lng)
      const address = `Tanlangan joy (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      setSearchQuery(address)
      onLocationSelect(address, distance)
    },
    [onLocationSelect],
  )

  const handleUseCurrentLocation = () => {
    // Demo: use a random location near Tashkent center
    const randomLocation = DEMO_LOCATIONS[Math.floor(Math.random() * DEMO_LOCATIONS.length)]
    handleLocationSelect(randomLocation)
  }

  // Convert lat/lng to pixel position on map
  const getMarkerPosition = (lat: number, lng: number) => {
    const latRange = { min: 41.2, max: 41.4 }
    const lngRange = { min: 69.1, max: 69.4 }

    const x = ((lng - lngRange.min) / (lngRange.max - lngRange.min)) * 100
    const y = ((latRange.max - lat) / (latRange.max - latRange.min)) * 100

    return { x: `${x}%`, y: `${y}%` }
  }

  const restaurantPos = getMarkerPosition(RESTAURANT_LOCATION.lat, RESTAURANT_LOCATION.lng)

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Manzilni qidiring..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10"
        />
        {showSuggestions && searchQuery && filteredLocations.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <button
                key={index}
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-muted/50 flex items-center gap-2 text-sm"
                onClick={() => handleLocationSelect(location)}
              >
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                {location.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Use Current Location Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full bg-transparent"
        onClick={handleUseCurrentLocation}
      >
        <Navigation className="h-4 w-4 mr-2" />
        Joriy joylashuvni aniqlash (demo)
      </Button>

      {/* Map */}
      <div
        ref={mapRef}
        className="relative w-full h-48 bg-muted rounded-lg overflow-hidden cursor-crosshair border border-border"
        onClick={handleMapClick}
      >
        {/* Map background image */}
        <div className="absolute inset-0 bg-[url('/tashkent-map-simple.jpg')] bg-cover bg-center opacity-60" />

        {/* Grid overlay for visual reference */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-border/20" />
          ))}
        </div>

        {/* Restaurant marker */}
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: restaurantPos.x, top: restaurantPos.y }}
        >
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-md" />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap bg-background/80 px-1 rounded text-foreground">
            Restoran
          </span>
        </div>

        {/* Selected location marker */}
        {selectedLocation && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full z-20"
            style={{
              left: getMarkerPosition(selectedLocation.lat, selectedLocation.lng).x,
              top: getMarkerPosition(selectedLocation.lat, selectedLocation.lng).y,
            }}
          >
            <MapPin className="h-8 w-8 text-accent drop-shadow-md" fill="currentColor" />
          </div>
        )}

        {/* Click hint */}
        <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Xaritada bosing yoki qidiring
        </div>
      </div>
    </div>
  )
}
