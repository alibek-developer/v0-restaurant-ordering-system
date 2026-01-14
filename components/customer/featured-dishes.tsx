"use client"

import { useMenuStore } from "@/lib/store"
import { MenuCard } from "./menu-card"

export function FeaturedDishes() {
  const items = useMenuStore((state) => state.items)
  const featuredItems = items.filter((item) => item.available_on_website).slice(0, 6)

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Mashhur taomlar</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Eng ko'p buyurtma qilinadigan an'anaviy o'zbek taomlari
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
