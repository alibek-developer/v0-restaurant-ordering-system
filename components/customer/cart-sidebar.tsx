"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Savatcha</SheetTitle>
          <SheetDescription>Savatchada hech narsa yo'q</SheetDescription>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <ShoppingBag className="h-16 w-16" />
          <p>Savatchaga taom qo'shing</p>
          <Link href="/menu">
            <Button>Menyuga o'tish</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Savatcha</SheetTitle>
        <SheetDescription>{items.length} ta taom</SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-primary font-semibold text-sm">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-transparent"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted-foreground">Jami:</span>
          <span className="text-xl font-bold text-primary">{formatPrice(getTotal())}</span>
        </div>
        <Link href="/checkout" className="block">
          <Button className="w-full" size="lg">
            Buyurtma berish
          </Button>
        </Link>
      </div>
    </div>
  )
}
