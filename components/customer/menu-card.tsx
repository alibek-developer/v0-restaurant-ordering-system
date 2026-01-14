"use client"

import Image from "next/image"
import { Plus, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { MenuItem } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image_url || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-foreground">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">{formatPrice(item.price)}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={added ? "bg-accent hover:bg-accent text-accent-foreground" : ""}
          >
            {added ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Qo'shildi
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Qo'shish
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
